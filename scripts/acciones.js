 AFRAME.registerComponent('seleccion-opcion',{
            init: function(){
                    var newcolor="yellow";
                    this.el.addEventListener("mouseenter",function(e){
                       // console.log(e.detail.intersection.point);
                        this.setAttribute('material','color',newcolor);
                        
                    });
                    this.el.addEventListener("mouseleave",function(e){
                        this.setAttribute('material','color',"#333");                       
                    });

            }                         
        });
AFRAME.registerComponent('inicio',{
    init: function(){
         this.el.addEventListener("click",function(e){                
            var camara = document.querySelector('#camara'); 
            camara.setAttribute('wasd-controls','acceleration',200);
            /*var menu = document.querySelector('#menu'); 
            menu.setAttribute('visible',false);*/
         });
    }
});    
AFRAME.registerComponent('obj-colisionable',{
    init: function(){
        this.el.addEventListener("hitstart",function(e){
            var el = document.getElementById('co'); 
           // console.log(el);
            el.setAttribute('corteza_oceanica',{depth:"51"});
            
              
        });
        this.el.addEventListener("hitend",function(e){
            console.log(this);    
        });

    }
});    
/*AFRAME.regis
/*AFRAME.registerComponent('volver',{
    init: function(){
         this.el.addEventListener("click",function(e){                
     		console.log("emntraaa");
            window.location.href='ppal.html';
         });
    }
});*/    
/*AFRAME.registerComponent('planeta',{
    init: function(){
         this.el.addEventListener("click",function(e){            
			console.log("emntraaa");
            window.location.href='nuestro_planeta.html';
            
         });
    }
});*/   
