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
             var corteza_oceanica = document.getElementById('corteza_oceanica');
             corteza_oceanica.setAttribute('animation',
                                           "property:position;                        from:-80 -10 -35;to:-25 -10 -35;loop:false;                         dir:alternate;                         easing:easeInOutCubic;                     dur:10000;");
             var litosfera_izq = document.getElementById('litosfera_izq');
             litosfera_izq.setAttribute('animation',
                                           "property:position;                        from:-80 -10 -35;to:-25 -10 -35;loop:false;                         dir:alternate;                         easing:easeInOutCubic;                     dur:10000;");

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
            var pto_cc = el_cc.getAttribute('corteza_continental').p2_ctrl_y;
            //modificarCorteza_Continental(p1_ctrly_cc,35,0.5,80,"p1_ctrl_y");
            modificarCorteza_Continental(pto_cc,35,0.5,80,"p2_ctrl_y");
            
         
        });
        this.el.addEventListener("hitend",function(e){
            console.log(e);    
        });
        this.el.addEventListener("hitclosest",function(e){
            
        });


    }
   
});  
function modificarCorteza_Oceanica(final){
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
function modificarCorteza_Continental(pto,tope,inc,velocidad,atributo){
    var el = document.getElementById('corteza_continental');  
    intervalo_cc = setInterval(move,velocidad);
    function move(){        
        if (pto==tope){
            clearInterval(intervalo_cc);
        }
        else{            
            pto=pto+inc;         
            console.log(pto);
            el.setAttribute('corteza_continental',{p2_ctrl_y:pto});    
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
