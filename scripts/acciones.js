var intervalo_co;
var intervalo_cc;
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
            var el_co = document.getElementById('corteza_oceanica');
            var final_co = el_co.getAttribute('corteza_oceanica').fin;
            modificarCorteza_Oceanica(final_co);
            var el_cc = document.getElementById('corteza_continental');
            var ctrly_cc = el_cc.getAttribute('corteza_continental').ctrl_y;
            modificarCorteza_Continental(ctrly_cc);
            //el.setAttribute('corteza_oceanica',{fin:8});
         
        });
        this.el.addEventListener("hitend",function(e){
            console.log(e);    
        });
        this.el.addEventListener("hitclosest",function(e){
            
        });


    }
   
});  
function modificarCorteza_Oceanica(final){
    //var final = 9;
    var el = document.getElementById('corteza_oceanica');                   
    intervalo_co = setInterval(move,80);
    function move(){        
        if (final==0){
            clearInterval(intervalo_co);
        }
        else{            
            final=final-0.25;         
            console.log(final);
            el.setAttribute('corteza_oceanica',{fin:final});    
        }    
    }                


}
function modificarCorteza_Continental(ctrl_y){
    var el = document.getElementById('corteza_continental');                   
    intervalo_cc = setInterval(move,80);
    function move(){        
        if (ctrl_y==35){
            clearInterval(intervalo_cc);
        }
        else{            
            ctrl_y=ctrl_y+0.5;         
            console.log(ctrl_y);
            el.setAttribute('corteza_continental',{ctrl_y:ctrl_y});    
        }    
    }                

}
 
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
