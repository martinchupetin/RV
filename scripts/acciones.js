var intervalo_co;
var intervalo_cc;
var intervalo_li;
var intervalo_at;
var estado_cortezaOceanica;
var estado_atenosfera;
var estado_litosferaIzq;
var estado_oceano;
var pausa=false;
var fin_desplazamiento = 0;

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
AFRAME.registerComponent('comenzar',{
            init: function(){            
                    this.el.addEventListener("click",function(e){
                        var camara = document.querySelector('#camara'); 
                        camara.setAttribute('wasd-controls','acceleration',200);
                    });
                    
            }                         
        });
AFRAME.registerComponent('inicio',{
    init: function(){
         this.el.addEventListener("click",function(e){                
            
             var corteza_oceanica = document.getElementById('corteza_oceanica');
             corteza_oceanica.setAttribute('animation',"property:position;from:-80 -10 -35;to:-25 -10 -35;loop:false;dir:alternate;easing:easeInOutCubic;dur:10000;");
             var litosfera_izq = document.getElementById('litosfera_izq');
             litosfera_izq.setAttribute('animation',"property:position;from:-80 -10 -35;to:-25 -10 -35;loop:false;dir:alternate;easing:easeInOutCubic;dur:10000;");
             var atenosfera = document.getElementById('atenosfera');
             atenosfera.setAttribute('animation',"enabled:true;property:position;from:-80 -10 -35;to:-25 -10 -35;loop:false;dir:alternate;easing:easeInOutCubic;dur:10000;");
             var oceano = document.getElementById('oceano');
             oceano.setAttribute('animation',"property:position;from:-73 1 -10;to:-18 1 -10;loop:false;dir:alternate;easing:easeInOutCubic;dur:10000;");

         });
    }
});    
AFRAME.registerComponent('pausar',{
    init: function(){
         this.el.addEventListener("click",function(e){         
             
             var corteza_oceanica = document.getElementById('corteza_oceanica');
             var litosfera_izq = document.getElementById('litosfera_izq');
             var atenosfera = document.getElementById('atenosfera');
             var oceano = document.getElementById('oceano');
                          
             var btn = document.getElementById('pau_rea');
             var prop ='';
             //recupero posiciones actuales
             estado_cortezaOceanica = corteza_oceanica.getAttribute('position');
             estado_atenosfera = atenosfera.getAttribute('position');
             estado_litosferaIzq = litosfera_izq.getAttribute('position');
             estado_oceano = oceano.getAttribute('position');
             //---------------------------
             var valor = btn.getAttribute('value');
             
             if (valor=="Pausar"){
                btn.setAttribute('value',"Reanudar");    
                prop = "enabled:false;";       
              //   console.log(atenosfera.getAttribute('atenosfera',"estado"));
                pausa = true;
             }
             else{
                 btn.setAttribute('value',"Pausar");
                 prop = "enabled:true;";
                 //vuelvo a setear las posiciones anteriores recuperadas            
                 pause=false;
                 corteza_oceanica.setAttribute('animation',"from",estado_cortezaOceanica);
                 litosfera_izq.setAttribute('animation',"from",estado_litosferaIzq);
                 atenosfera.setAttribute('animation',"from",estado_atenosfera);
                 oceano.setAttribute('animation',"from",estado_oceano);
                
             }          
             
             corteza_oceanica.setAttribute('animation',prop);
             litosfera_izq.setAttribute('animation',prop);
             atenosfera.setAttribute('animation',prop);
             oceano.setAttribute('animation',prop);
         });
    }
}); 
AFRAME.registerComponent('camara_ctrl',{
    init: function(){
         this.el.addEventListener("click",function(e){                
            
             switch(e.target.id){
                   case 'subir':
                        var el = document.getElementById('camara_padre');
                        var pos = el.getAttribute('position');                       
                        pos.y=pos.y+5;                     
                        el.setAttribute('position',pos);
                    
                        break;
                   case 'bajar':
                        var el = document.getElementById('camara_padre');
                        var pos = el.getAttribute('position');                       
                        pos.y=pos.y-5;                     
                        el.setAttribute('position',pos);
                        
                        break;
                 default: console.log('deafult');  
             }

         });
    }
}); 
AFRAME.registerComponent('velocidad_ctrl',{
    init: function(){
         this.el.addEventListener("click",function(e){      
             var el = document.getElementById('camara');
             var acel = el.getAttribute('wasd-controls');  
             switch(e.target.id){
                   case 'aumentar':                        
                        acel.acceleration=acel.acceleration+25;                      
                        el.setAttribute('wasd-controls',acel);
                        break;
                   case 'disminuir':
                        acel.acceleration=acel.acceleration-25;                     
                        el.setAttribute('wasd-controls',acel);                       
                        break;
                 default: console.log('deafult');  
             }             document.getElementById('valor_velocidad').setAttribute('value',acel.acceleration); 
         });
    }
}); 
AFRAME.registerComponent('obj-colisionable',{
    init: function(){       
        //console.log(this.el.getAttribute('id'));
        this.el.addEventListener("hitstart",function(e){
            
            switch(e.target.id){
                   case 'corteza_oceanica':
                        var el_co = document.getElementById('corteza_oceanica');
                        var final_co = el_co.getAttribute('corteza_oceanica').fin;
                        modificarCorteza_Oceanica(final_co,80);  
                        break;
                    case 'litosfera_izq':    
                        var el_li = document.getElementById('litosfera_izq');
                        var fin_li = el_li.getAttribute('litosfera_izq').fin;
                        var fin_int_li = el_li.getAttribute('litosfera_izq').fin_int;
                        var x_int_li = el_li.getAttribute('litosfera_izq').x_int;
                        var y_int_li = el_li.getAttribute('litosfera_izq').y_int;
                        modificarLitosfera_Izq(fin_li,fin_int_li,x_int_li,y_int_li,0,0.25,80);      
                        var el_cc = document.getElementById('corteza_continental');
                        var pto_cc = el_cc.getAttribute('corteza_continental').p1_ctrl_y;
                        modificarCorteza_Continental(pto_cc,40,0.5,70); //modificarCorteza_Continental(p1_ctrly_cc,35,0.5,80,"p1_ctrl_y");
                        
                        var el_at = document.getElementById('atenosfera');
                        var ctrl_x = el_at.getAttribute('atenosfera').p1_ctrl_x;
                        var ctrl_y = el_at.getAttribute('atenosfera').p1_ctrl_y;
                        var x_tope = el_at.getAttribute('atenosfera').x_tope;
                        modificarAtenosfera(ctrl_x,ctrl_y,x_tope,5,0,0.25,80);
                        break;
                    default:
                        console.log('deafult');
            }
                    
            
        });
      
        this.el.addEventListener("hitend",function(e){
            console.log("termino???");    
        });
        this.el.addEventListener("hitclosest",function(e){
            
        });


    }
   
});  
function modificarCorteza_Oceanica(final,velocidad){
    var el = document.getElementById('corteza_oceanica');                   
    intervalo_co = setInterval(move,velocidad);
    function move(){        
        if (final==0 || pausa){
            clearInterval(intervalo_co);
            fin_desplazamiento+=1;
            finDesplazamiento();
        }
        else{            
            final=final-0.25;         
            //console.log(final);
            el.setAttribute('corteza_oceanica',{fin:final});    
        }    
    }                


}
function modificarCorteza_Continental(pto,tope,inc,velocidad){
    var el = document.getElementById('corteza_continental');  
    var x = -23;
    var ptoctrlx = 10;
    intervalo_cc = setInterval(move,velocidad);
    function move(){        
        if (pto==tope || pausa){
            clearInterval(intervalo_cc);
            fin_desplazamiento+=1;
            finDesplazamiento();
        }
        else{            
            pto=pto+inc;
            x = x+0.10; //incremento antiguo 0.50
         //   ptoctrlx = ptoctrlx+1;
            //console.log(pto);
            el.setAttribute('corteza_continental',{p1_ctrl_y:pto,x:x});    
        }    
    }                

}
function modificarLitosfera_Izq(fin,fin_int,x_int,y_int,tope,inc,velocidad){
    var el = document.getElementById('litosfera_izq');
    
    intervalo_li = setInterval(move,velocidad);
    function move(){
        if (fin==tope || pausa){
            clearInterval(intervalo_li);
            fin_desplazamiento+=1;
            finDesplazamiento();
        }
        else{
            fin=fin-inc;
            if (x_int>14){
                    x_int=x_int-inc;    
                }
            if (y_int>0){
                    y_int=y_int-inc;
                }
            if (fin_int>21){
                fin_int=fin_int-inc;
            }
            //console.log(pto);
            el.setAttribute('litosfera_izq',{fin:fin,fin_int:fin_int,x_int:x_int,y_int:y_int});
        }
    }
}
function modificarAtenosfera(p1_ctrl_x,p1_ctrl_y,x_tope,tope_ctrlx,tope_ctrly,inc,velocidad){
    var el = document.getElementById('atenosfera');     
    
    intervalo_at = setInterval(move,velocidad);    
    function move(){
                            
        if (x_tope==14 || pausa){
           // console.log(intervalo_at);
            clearInterval(intervalo_at);
            fin_desplazamiento+=1;
            finDesplazamiento();
          //console.log(intervalo_at);

        }
        else{
            x_tope=x_tope-inc;   

            if (p1_ctrl_x>tope_ctrlx){
                    p1_ctrl_x=p1_ctrl_x-inc;    
                }
            if (p1_ctrl_y>tope_ctrly){
                p1_ctrl_y=p1_ctrl_y-inc;                       

                }
                //console.log(pto);

                el.setAttribute('atenosfera',{p1_ctrl_x:p1_ctrl_x,p1_ctrl_y:p1_ctrl_y,x_tope:x_tope});

        }

    }

}
function finDesplazamiento(){
    switch (fin_desplazamiento){
        case 1:
            break;
        case 2:
            break;
        case 3:
                document.getElementById('leyenda1').setAttribute('visible',true);
            break;
        case 4:
                console.log("fin desplazamiento");
                document.getElementById('leyenda2').setAttribute('visible',true);
                document.getElementById('magma').setAttribute('visible',true);
                document.getElementById('erupcion').setAttribute('visible',true);
            break;
        default:
            
    }

} 
 
/*AFRAME.registerComponent('planeta',{
    init: function(){
         this.el.addEventListener("click",function(e){            
			console.log("emntraaa");
            window.location.href='nuestro_planeta.html';
            
         });
    }
});*/   
