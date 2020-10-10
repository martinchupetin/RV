AFRAME.registerComponent('corteza_continental', {
  schema: {
    enabled: {default: true},
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.5},
    topLeftRadius: {type: 'number', default: -1},
    topRightRadius: {type: 'number', default: -1},
    bottomLeftRadius: {type: 'number', default: -1},
    bottomRightRadius: {type: 'number', default: -1},
    color: {type: 'color', default: "#F0F0F0"},
    opacity: {type: 'number', default: 1}
  },
  init: function () {
    var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
    this.corteza_continental = new THREE.Mesh( this.draw(), material );
    this.updateOpacity();
    this.el.setObject3D('mesh', this.corteza_continental)
  },
  update: function () {
    if (this.data.enabled) {
        //console.log(this.data);
      if (this.corteza_continental) {
        this.corteza_continental.visible = true;
        this.corteza_continental.geometry = this.draw();
        this.corteza_continental.material.color = new THREE.Color(this.data.color);
        this.updateOpacity();
      }
    } else {
      this.corteza_continental.visible = false;
    }
  },
  updateOpacity: function() {
    if (this.data.opacity < 0) { this.data.opacity = 0; }
    if (this.data.opacity > 1) { this.data.opacity = 1; }
    if (this.data.opacity < 1) {
      this.corteza_continental.material.transparent = true;
    } else {
      this.corteza_continental.material.transparent = false;
    }
    this.corteza_continental.material.opacity = this.data.opacity;
  },
  draw: function() {
    const shape = new THREE.Shape();
    const inicio_x = -23;
    const inicio_y = 9.2;
    shape.moveTo(inicio_x,inicio_y);
    //shape.quadraticCurveTo(0,17,20,12,47,11);
    //shape.lineTo(47,9);
     //shape.lineTo(10,10);
    //shape.quadraticCurveTo( ptctrlx, ptctrly, finx, finy);  
   // shape.quadraticCurveTo(0,6,10,1,47,11);
    shape.bezierCurveTo(10,15,20,11,47,11);
    shape.lineTo(47,9);
    shape.quadraticCurveTo(21,5,-15.5,7);
    shape.quadraticCurveTo(-22,9,-23,9.2)
      // shape.lineTo(-16,11);
      //shape.bezierCurveTo(-15,11);

    var extrudeSettings = {
      steps:   10,  
      depth:  this.data.depth, 
      bevelEnabled: false,//acepta corte bisleado  
      bevelThickness: 0,  //alto de biselado
      bevelSize: 0,  //tamaño o ancho de biselado
      bevelSegments: 10 //cantidad de segmentos de biselado: +segments, mejor curvatura
    };

      return new THREE.ExtrudeGeometry( shape,extrudeSettings );
  },
});

/*AFRAME.registerPrimitive('a-corteza_continental', {
  defaultComponents: {
    corteza_continental: {}
  },
  mappings: {
    enabled: 'corteza_continental.enabled',
    width: 'corteza_continental.width',
    height: 'corteza_continental.height',
    radius: 'corteza_continental.radius',
    color: 'corteza_continental.color',
    opacity: 'corteza_continental.opacity'
  }
});*/
AFRAME.registerComponent('litosfera_izq',{
    schema:{
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},  
        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1},
        textura: {}
    },
    init: function(){        
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.litosfera_izq = new THREE.Mesh( this.draw(), material );
        this.updateOpacity();
        this.el.setObject3D('mesh', this.litosfera_izq)
    },
    updateOpacity: function() {
        if (this.data.opacity < 0) { this.data.opacity = 0; }
        if (this.data.opacity > 1) { this.data.opacity = 1; }
        if (this.data.opacity < 1) {
          this.litosfera_izq.material.transparent = true;
        } else {
          this.litosfera_izq.material.transparent = false;
        }
        this.litosfera_izq.material.opacity = this.data.opacity;
    },
    draw: function(){
        var width = this.data.width, height = this.data.height;
        const shape = new THREE.Shape();
        const x = -15;
        const y = 10;
        const fin = 0;
        shape.moveTo(x,y);
      //  shape.lineTo(x+20,y);
        shape.quadraticCurveTo(5,10,21,fin)
    //    shape.lineTo(21,fin);
        shape.lineTo(14,fin);
        shape.quadraticCurveTo(5,7,x,7)
    //ok    shape.lineTo(1,7);
        //shape.lineTo(x,7);


        var extrudeSettings = {
            steps: 1,
            depth: this.data.depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    }
});
AFRAME.registerComponent('litosfera_der',{
    schema:{
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},  
        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1},
        x: {type: 'number',default:1},
        y: {type: 'number',default:1}
    },
    init: function(){
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.litosfera_der = new THREE.Mesh( this.draw(), material );
        this.updateOpacity();
        this.el.setObject3D('mesh', this.litosfera_der)
    },
    updateOpacity: function() {
        if (this.data.opacity < 0) { this.data.opacity = 0; }
        if (this.data.opacity > 1) { this.data.opacity = 1; }
        if (this.data.opacity < 1) {
          this.litosfera_der.material.transparent = true;
        } else {
          this.litosfera_der.material.transparent = false;
        }
        this.litosfera_der.material.opacity = this.data.opacity;
    },
    draw: function(){
        var width = this.data.width, height = this.data.height;
        const shape = new THREE.Shape();
        const x = -15.5;
        const y = 7;
        const fin = 0;
        shape.moveTo(x,y);
        //shape.quadraticCurveTo( ptctrlx, ptctrly, finx, finy);  
        shape.quadraticCurveTo(20,5,47, 9);
        //shape.lineTo(47,9);
        shape.lineTo(47,7);
        shape.lineTo(37,7);
        shape.quadraticCurveTo(-1,0,-15.5,7);
    //    shape.bezierCurveTo(1,1,-15.5,7);
       // shape.quadraticCurveTo(0, 12);

        //shape.bezierCurveTo(10,7,3,3,10,6);

        var extrudeSettings = {
            steps: 1,
            depth: this.data.depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    }
});
AFRAME.registerComponent('corteza_oceanica',{
    schema:{
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},  
        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1},
        x: {type: 'number',default:0},
        y: {type: 'number',default:0}
    },
    init: function(){
        //const loader=new THREE.TextureLoader();
        //const texture = loader.load('assets/borde_acan.jpg');
        //texture.wrapS = THREE.MirroredRepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.corteza_oceanica = new THREE.Mesh( this.draw(), material );
        this.el.setObject3D('mesh', this.corteza_oceanica)
    },
    draw: function(){
        var width = this.data.width, height = this.data.height;
        const shape = new THREE.Shape();
        const inicio_x = -15;
        const inicio_y = 11;
        const fin= 0;
        shape.moveTo(inicio_x,inicio_y);
      //ok  shape.lineTo(3,11);
        shape.quadraticCurveTo(5,11,23,fin)
        //shape.lineTo(7,10);
    //ok    shape.lineTo(23,fin);
        shape.lineTo(21,fin);
    //ok    shape.lineTo(5,10);
    //ok    shape.lineTo(inicio_x,10);
        shape.quadraticCurveTo(5,10,inicio_x,10);

        var extrudeSettings = {
            steps: 1,
            depth: this.data.depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    }
});
AFRAME.registerComponent('atenosfera',{
    schema:{
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},  
        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1},
        x: {type: 'number',default:0},
        y: {type: 'number',default:0}
    },
    init: function(){
        const loader=new THREE.TextureLoader();
        const texture = loader.load('assets/montana.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set( 2, 3 );
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide, map:texture } );
        this.atenosfera = new THREE.Mesh( this.draw(), material );
        this.updateOpacity();
        this.el.setObject3D('mesh', this.atenosfera)
    },
    updateOpacity: function() {
        if (this.data.opacity < 0) { this.data.opacity = 0; }
        if (this.data.opacity > 1) { this.data.opacity = 1; }
        if (this.data.opacity < 1) {
          this.atenosfera.material.transparent = true;
        } else {
          this.atenosfera.material.transparent = false;
        }
        this.atenosfera.material.opacity = this.data.opacity;
    },
    draw: function(){
        var width = this.data.width, height = this.data.height;
        const shape = new THREE.Shape();
        const x = -15;
        const y = 7;
        const fin = 0;
        shape.moveTo(x,y);
        shape.quadraticCurveTo(5,7,14,fin);
        shape.lineTo(x,fin);
    //ok   shape.lineTo(1,y);
    
    //ok    shape.lineTo(14,fin);
    //ok    shape.lineTo(x,fin);


        var extrudeSettings = {
            steps: 1,
            depth: this.data.depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    }
});
AFRAME.registerComponent('zona_subduccion',{
    schema:{
        enabled: {default: true},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},  
        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1},
        x: {type: 'number',default:0},
        y: {type: 'number',default:0}
    },
    init: function(){
        //const loader=new THREE.TextureLoader();
        //const texture = loader.load('assets/borde_acan.jpg');
        //texture.wrapS = THREE.MirroredRepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.zona_subduccion = new THREE.Mesh( this.draw(), material );
        this.updateOpacity();
        this.el.setObject3D('mesh', this.zona_subduccion)
    },
    updateOpacity: function() {
        if (this.data.opacity < 0) { this.data.opacity = 0; }
        if (this.data.opacity > 1) { this.data.opacity = 1; }
        if (this.data.opacity < 1) {
          this.zona_subduccion.material.transparent = true;
        } else {
          this.zona_subduccion.material.transparent = false;
        }
        this.zona_subduccion.material.opacity = this.data.opacity;
    },
    draw: function(){
        var width = this.data.width, height = this.data.height;
        const shape = new THREE.Shape();
        const x = -14;
        const y = 5.6;
        const fin = 0;
        shape.moveTo(x,y);
        shape.quadraticCurveTo(1,1,35,7);
        shape.lineTo(45,7);       
        shape.lineTo(45,fin);
        shape.lineTo(-3,fin);
        shape.quadraticCurveTo(-12,5,x,5.6);
        


        var extrudeSettings = {
            steps: 1,
            depth: this.data.depth,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    }
});
/*AFRAME.registerPrimitive('a-litosfera_izq', {
  defaultComponents: {
    litosfera_izq: {}
  },
  mappings: {
    enabled: 'litosfera_izq.enabled',
    width: 'litosfera_izq.width',
    height: 'litosfera_izq.height',
    color: 'litosfera_izq.color',
    opacity: 'litosfera_izq.opacity'
  }
});*/