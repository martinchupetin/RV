AFRAME.registerComponent('corteza_continental', {
  schema: {
    enabled: {default: true},
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.5},   
    color: {type: 'color', default: "#F0F0F0"},
    opacity: {type: 'number', default: 1},
    x: {type: 'number',default:0},
    y: {type: 'number',default:0},  
    p1_ctrl_x: {type: 'number',default:0},
    p1_ctrl_y: {type: 'number',default:0},
    p2_ctrl_x: {type: 'number',default:0},
    p2_ctrl_y: {type: 'number',default:0},
    fin:{type: 'number',default:0}
  },
  init: function () {
    var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
    this.corteza_continental = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin,this.data.p1_ctrl_x,this.data.p1_ctrl_y,this.data.p2_ctrl_x,this.data.p2_ctrl_y), material );
    this.updateOpacity();
    this.el.setObject3D('mesh', this.corteza_continental)
  },
  update: function(viejaData){
        var nuevaData = this.data;
        var el = this.el;
      //  console.log(viejaData);
    //    console.log(nuevaData);
        
        el.getObject3D('mesh').geometry = this.draw(nuevaData.width,nuevaData.height,nuevaData.depth,nuevaData.x,nuevaData.y,nuevaData.fin,nuevaData.p1_ctrl_x,nuevaData.p1_ctrl_y,nuevaData.p2_ctrl_x,nuevaData.p2_ctrl_y);

        //en caso de que quiera editar el color y rendereizar al momento
        //el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        //console.log("prueba");
        
    },
 /* update: function () {
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
  },*/
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
  draw: function(ancho,alto,prof,x,y,fin,p1_ctrl_x,p1_ctrl_y,p2_ctrl_x,p2_ctrl_y) {
    const shape = new THREE.Shape();
   // const x = -23;
   // const y = 9.2;
    shape.moveTo(x,y);
    
    //shape.quadraticCurveTo( ptctrlx, ptctrly, finx, finy);  
 
    //este es el oficial// shape.bezierCurveTo(10,15,20,11,47,11);
    shape.bezierCurveTo(p1_ctrl_x,p1_ctrl_y,p2_ctrl_x,p2_ctrl_y,47,11);
    shape.lineTo(47,9);
    shape.quadraticCurveTo(21,5,-15.5,7);
    shape.quadraticCurveTo(-22,9,-23,fin)
    

    var extrudeSettings = {
      steps:   10,  
      depth:  prof, 
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
        x: {type: 'number',default:0},
        y: {type: 'number',default:0},
        fin:{type: 'number',default:0},
        fin_int:{type: 'number',default:0},
        x_int:{type: 'number',default:0},
        y_int:{type: 'number',default:0},
        p1_ctrl_x: {type: 'number',default:0},
        p1_ctrl_y: {type: 'number',default:0},
        textura: {}
    },
    init: function(){        
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.litosfera_izq = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin,this.data.fin_int,this.data.x_int,this.data.y_int,this.data.p1_ctrl_x,this.p1_ctrl_y), material );
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
    draw: function(ancho,alto,prof,x,y,fin,fin_int,x_int,y_int,p1_ctrl_x,p1_ctrl_y){
        var width = ancho, height = alto;
        const shape = new THREE.Shape();
     //   const x = -15;
    //    const y = 10;
    //    const fin = 0;
      //    const lim = 23;
         // const lim_interno = 21;
            shape.moveTo(x,y);
            //shape.lineTo(21,y);
            //shape.lineTo(21,7);
        //    shape.lineTo(x,7);                 
     
            shape.quadraticCurveTo(p1_ctrl_x,p1_ctrl_y,fin_int,fin);
            //shape.quadraticCurveTo(p1_ctrl_x,p1_ctrl_y,21,fin);
            shape.lineTo(x_int,y_int);
            //shape.lineTo(lim-7,fin);
            shape.quadraticCurveTo(6,7.5,x,7)
        //    shape.lineTo(21,7);
        //    shape.lineTo(x,7);    
            
        


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
    },
    update: function(viejaData){
        var nuevaData = this.data;
        var el = this.el;
      //  console.log(viejaData);
    //    console.log(nuevaData);
        
        el.getObject3D('mesh').geometry = this.draw(nuevaData.width,nuevaData.height,nuevaData.depth,nuevaData.x,nuevaData.y,nuevaData.fin,nuevaData.fin_int,nuevaData.x_int,nuevaData.y_int,nuevaData.p1_ctrl_x,nuevaData.p1_ctrl_y);

        //en caso de que quiera editar el color y rendereizar al momento
        //el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        //console.log("prueba");
        
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
        y: {type: 'number',default:1},
        fin:{type: 'number',default:0}
    },
    init: function(){
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.litosfera_der = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin), material );
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
    draw: function(ancho,alto,prof,x,y,fin){
        var width = ancho, height = alto;
        const shape = new THREE.Shape();
    //    const x = -15.5;
    //    const y = 7;
    //    const fin = 0;
        shape.moveTo(x,y);
        //shape.quadraticCurveTo( ptctrlx, ptctrly, finx, finy);  
        shape.quadraticCurveTo(20,5,47,9);
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
        y: {type: 'number',default:0},
        fin:{type: 'number',default:0}
    },
    init: function(){
        //const loader=new THREE.TextureLoader();
        //const texture = loader.load('assets/borde_acan.jpg');
        //texture.wrapS = THREE.MirroredRepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.corteza_oceanica = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin), material );
        this.el.setObject3D('mesh', this.corteza_oceanica);
       
    },
    draw: function(ancho,alto,prof,x,y,fin){
        var width = ancho, height = alto;
        const shape = new THREE.Shape();
       // const x = x;//-15;
    //    const y = y;//11;
      //  const fin= 0;
        shape.moveTo(x,y);
      //ok  shape.lineTo(3,11);
        shape.quadraticCurveTo(5,11,23,fin)
        //shape.lineTo(7,10);
    //ok    shape.lineTo(23,fin);
        shape.lineTo(21,fin);
    //ok    shape.lineTo(5,10);
    //ok    shape.lineTo(x,10);
        shape.quadraticCurveTo(5,10,x,10);

        var extrudeSettings = {
            steps: 1,
            depth: prof,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 1
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        return geometry;
    },
    update: function(viejaData){
        var nuevaData = this.data;
        var el = this.el;
      //  console.log(viejaData);
    //    console.log(nuevaData);
        
        el.getObject3D('mesh').geometry = this.draw(nuevaData.width,nuevaData.height,nuevaData.depth,nuevaData.x,nuevaData.y,nuevaData.fin);

        //en caso de que quiera editar el color y rendereizar al momento
        //el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        //console.log("prueba");
        
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
        y: {type: 'number',default:0},
        fin:{type: 'number',default:0},
        x_tope:{type: 'number',default:0},
        p1_ctrl_x: {type: 'number',default:0},
        p1_ctrl_y: {type: 'number',default:0}
    },
    init: function(){
        const loader=new THREE.TextureLoader();
        const texture = loader.load('assets/montana.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set( 2, 3 );
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide, map:texture } );
        this.atenosfera = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin,this.data.x_tope,this.data.p1_ctrl_x,this.p1_ctrl_y), material );
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
    draw: function(ancho,alto,prof,x,y,fin,x_tope,p1_ctrl_x,p1_ctrl_y){
        var width = ancho, height = alto;
        const shape = new THREE.Shape();

        shape.moveTo(x,y);
        shape.quadraticCurveTo(p1_ctrl_x,y,x_tope,p1_ctrl_y);
      //  shape.quadraticCurveTo(5,7,14,fin);
        shape.lineTo(x_tope,fin);
        shape.lineTo(x,fin);
   


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
    },
    update: function(viejaData){
        var nuevaData = this.data;
        var el = this.el;
      //  console.log(viejaData);
    //    console.log(nuevaData);
        
        el.getObject3D('mesh').geometry = this.draw(nuevaData.width,nuevaData.height,nuevaData.depth,nuevaData.x,nuevaData.y,nuevaData.fin,nuevaData.x_tope,nuevaData.p1_ctrl_x,nuevaData.p1_ctrl_y);

        //en caso de que quiera editar el color y rendereizar al momento
        //el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        //console.log("prueba");
        
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
        y: {type: 'number',default:0},
        fin:{type: 'number',default:0}
    },
    init: function(){
        //const loader=new THREE.TextureLoader();
        //const texture = loader.load('assets/borde_acan.jpg');
        //texture.wrapS = THREE.MirroredRepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } );
        this.zona_subduccion = new THREE.Mesh( this.draw(this.data.width,this.data.height,this.data.depth,this.data.x,this.data.y,this.data.fin), material );
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
    draw: function(ancho,alto,prof,x,y,fin){
        var width = ancho, height = alto;
        const shape = new THREE.Shape();
      //  const x = -14;
    //    const y = 5.6;
       // const fin = 0;
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