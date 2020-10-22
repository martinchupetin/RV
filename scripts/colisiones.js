if (typeof AFRAME === 'undefined') {
  throw new Error('El componente intento registrarse antrs de que AFRAME estuviera disponible.');
}

// Configuration for the MutationObserver used to refresh the whitelist.
// Listens for addition/removal of elements and attributes within the scene.
const OBSERVER_CONFIG = {
  childList: true,
  attributes: true,
  subtree: true
};

/**
 * Implementacion de deteccion de colisiones del tipo AABB para entidades con mesh.

 *
 * @property {string} objects - Selector de entidades para detectar su colision.
 */
AFRAME.registerComponent('colision', {
  schema: {
    collideNonVisible: {default: false},
    debug: {default: false},
    enabled: {default: true},
    interval: {default: 80},
    objects: {default: ''}
  },

  init: function () {
    this.centerDifferenceVec3 = new THREE.Vector3();
    this.clearedIntersectedEls = [];
    this.closestIntersectedEl = null;
    this.boundingBox = new THREE.Box3();
    this.boxCenter = new THREE.Vector3();
    this.boxHelper = new THREE.BoxHelper();
    this.boxMax = new THREE.Vector3();
    this.boxMin = new THREE.Vector3();
    this.hitClosestClearEventDetail = {};
    this.hitClosestEventDetail = {};
    this.intersectedEls = [];
    this.objectEls = [];
    this.newIntersectedEls = [];
    this.prevCheckTime = undefined;
    this.previousIntersectedEls = [];

    this.setDirty = this.setDirty.bind(this);
    this.observer = new MutationObserver(this.setDirty);
    this.dirty = true;

    this.hitStartEventDetail = {intersectedEls: this.newIntersectedEls};
      console.log(this);
  },

  play: function () {
    this.observer.observe(this.el.sceneEl, OBSERVER_CONFIG);
    this.el.sceneEl.addEventListener('object3dset', this.setDirty);
    this.el.sceneEl.addEventListener('object3dremove', this.setDirty);
  },

  remove: function () {
    this.observer.disconnect();
    this.el.sceneEl.removeEventListener('object3dset', this.setDirty);
    this.el.sceneEl.removeEventListener('object3dremove', this.setDirty);
  },

  tick: function (time) {
    const boundingBox = this.boundingBox;
    const centerDifferenceVec3 = this.centerDifferenceVec3;
    const clearedIntersectedEls = this.clearedIntersectedEls;
    const el = this.el;
    const intersectedEls = this.intersectedEls;
    const newIntersectedEls = this.newIntersectedEls;
    const objectEls = this.objectEls;
    const prevCheckTime = this.prevCheckTime;
    const previousIntersectedEls = this.previousIntersectedEls;

    let closestCenterDifference;
    let newClosestEl;
    let i;

    if (!this.data.enabled) { return; }

    // solo chequear intersecciones si el intervalo de tiempo ya paso
    if (prevCheckTime && (time - prevCheckTime < this.data.interval)) { return; }
    // Actualizar el tiempo de verificacion.
    this.prevCheckTime = time;

    if (this.dirty) { this.refreshObjects(); }

    // Actualizar el cuadro delimitador(AABB) para tener en cuenta las rotaciones y los cambios de posición.
    boundingBox.setFromObject(el.object3D);
    this.boxMin.copy(boundingBox.min);
    this.boxMax.copy(boundingBox.max);
    boundingBox.getCenter(this.boxCenter);

    if (this.data.debug) {
      this.boxHelper.setFromObject(el.object3D);
      if (!this.boxHelper.parent) { el.sceneEl.object3D.add(this.boxHelper); }
    }

    copyArray(previousIntersectedEls, intersectedEls);

    // Poblar el arreglo de intersecciones.
    intersectedEls.length = 0;
    for (i = 0; i < objectEls.length; i++) {
      if (objectEls[i] === this.el) { continue; }

      // No colisionar con un obj. no visible si se define en el html
      if (!this.data.collideNonVisible && !objectEls[i].getAttribute('visible')) {
        // Eliminar el asistente de cuadro si ya existe(cuando el debug esta activado) y si no existe agregarlo
        if (this.data.debug) {
          const boxHelper = objectEls[i].object3D.boxHelper;
          if (boxHelper) {
            el.sceneEl.object3D.remove(boxHelper);
            objectEls[i].object3D.boxHelper = null;
          }
        }
        continue;
      }

      // Chequeo para las intersecciones
      if (this.isIntersecting(objectEls[i])) { intersectedEls.push(objectEls[i]); }
    }

    // conseguir de nuevo las intersecciones con entidades.
    newIntersectedEls.length = 0;
    for (i = 0; i < intersectedEls.length; i++) {
      if (previousIntersectedEls.indexOf(intersectedEls[i]) === -1) {
        newIntersectedEls.push(intersectedEls[i]);
      }
    }

    // emitir eventos en entidades que ya no se intersectan
    clearedIntersectedEls.length = 0;
    for (i = 0; i < previousIntersectedEls.length; i++) {
      if (intersectedEls.indexOf(previousIntersectedEls[i]) !== -1) { continue; }
      if (!previousIntersectedEls[i].hasAttribute('colision')) {
        previousIntersectedEls[i].emit('hitend');
      }
      clearedIntersectedEls.push(previousIntersectedEls[i]);
    }

    // Emitir eventos en entidades intersectadas. hacer esto antes de limpiar los eventos
    for (i = 0; i < newIntersectedEls.length; i++) {
      if (newIntersectedEls[i] === this.el) { continue; }
      if (newIntersectedEls[i].hasAttribute('colision')) { continue; }
      newIntersectedEls[i].emit('hitstart');
    }

    // Calcular la interseccion con la entidad mas cercana, basandome en el centro 
    for (i = 0; i < intersectedEls.length; i++) {
      if (intersectedEls[i] === this.el) { continue; }
      centerDifferenceVec3
        .copy(intersectedEls[i].object3D.boundingBoxCenter)
        .sub(this.boxCenter);
      if (closestCenterDifference === undefined ||
          centerDifferenceVec3.length() < closestCenterDifference) {
        closestCenterDifference = centerDifferenceVec3.length();
        newClosestEl = intersectedEls[i];
      }
    }

    //Emitir eventos para la entidad mas cercana y la entidad proxxima mas vieja 
      
    if (!intersectedEls.length && this.closestIntersectedEl) {
      // sin intersecciones, borro la entidad mas cercana.
      this.hitClosestClearEventDetail.el = this.closestIntersectedEl;
      this.closestIntersectedEl.emit('hitclosestclear');
      this.closestIntersectedEl = null;
      el.emit('hitclosestclear', this.hitClosestClearEventDetail);
    } else if (newClosestEl !== this.closestIntersectedEl) {
      // Borrar la entidad anteorior mas cercana.
      if (this.closestIntersectedEl) {
        this.hitClosestClearEventDetail.el = this.closestIntersectedEl;
        this.closestIntersectedEl.emit('hitclosestclear', this.hitClosestClearEventDetail);
      }
      if (newClosestEl) {
        // Emitir evento par ala entidad mas cercada.
        newClosestEl.emit('hitclosest');
        this.closestIntersectedEl = newClosestEl;
        this.hitClosestEventDetail.el = newClosestEl;
        el.emit('hitclosest', this.hitClosestEventDetail);
      }
    }

    if (clearedIntersectedEls.length) {
      el.emit('hitend');
    }

    if (newIntersectedEls.length) {
      el.emit('hitstart', this.hitStartEventDetail);
    }
  },


  isIntersecting: (function () {
    const boundingBox = new THREE.Box3();

    return function (el) {
      let box;

      // Dinamico, recalculo cada uno.
      if (el.dataset.aabbColliderDynamic) {
        // Box.
        boundingBox.setFromObject(el.object3D);
        box = boundingBox;
        // Center.
        el.object3D.boundingBoxCenter = el.object3D.boundingBoxCenter || new THREE.Vector3();
        box.getCenter(el.object3D.boundingBoxCenter);
      }

      // Estatico, reuso box y center.
      if (!el.dataset.aabbColliderDynamic) {
        if (!el.object3D.aabbBox) {
          // Box.
          el.object3D.aabbBox = new THREE.Box3().setFromObject(el.object3D);
          // Center.
          el.object3D.boundingBoxCenter = new THREE.Vector3();
          el.object3D.aabbBox.getCenter(el.object3D.boundingBoxCenter);
        }
        box = el.object3D.aabbBox;
      }

      if (this.data.debug) {
        if (!el.object3D.boxHelper) {
          el.object3D.boxHelper = new THREE.BoxHelper(
            el.object3D, new THREE.Color(Math.random(), Math.random(), Math.random()));
          el.sceneEl.object3D.add(el.object3D.boxHelper);
        }
        el.object3D.boxHelper.setFromObject(el.object3D);
      }

      const boxMin = box.min;
      const boxMax = box.max;
      return (this.boxMin.x <= boxMax.x && this.boxMax.x >= boxMin.x) &&
             (this.boxMin.y <= boxMax.y && this.boxMax.y >= boxMin.y) &&
             (this.boxMin.z <= boxMax.z && this.boxMax.z >= boxMin.z);
    };
  })(),

  /**
   * Marco la lista de objetos como basura para actualizarla antes del proximo raycast.
   */
  setDirty: function () {
    this.dirty = true;
  },

  /**
   * Actualizar la lista de objetos para probar la interseccion.
   */
  refreshObjects: function () {
    const data = this.data;
    // Si no hay objetos definido, pruebo la interseccion con cualquier cosa.
    this.objectEls = data.objects
      ? this.el.sceneEl.querySelectorAll(data.objects)
      : this.el.sceneEl.children;
    this.dirty = false;
  }
});

function copyArray (dest, source) {
  dest.length = 0;
  for (let i = 0; i < source.length; i++) { dest[i] = source[i]; }
}