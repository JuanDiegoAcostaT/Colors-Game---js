const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar') 
const ULTIMO_NIVEL = 10;
var tiempo = 0;
var l = document.getElementById("number");


          
          




class Juego {
  constructor() {
    
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
    this.temporizador = setInterval(this.temporizador, 1000); //LO COLOQUE EN UNA VARIABLE PARA QUE SE PUEDA CAMBAIR EL INTERVALO ABAJO EN CLEARINTERVAL
    


   
  }

 

  inicializar() {
      
    //   this.temporizador();
      this.inicializar = this.inicializar.bind(this)
      this.elegirColor = this.elegirColor.bind(this);
      this.siguienteNivel = this.siguienteNivel.bind(this);  //BIND ES PARA ATAR LA FUNCION Y QUE NO SE TRNASFORME EL THIS EN WINDOW
      this.toggleBtnEmpezar();
      // btnEmpezar.classList.add('hide') //DE ESTA MANERA SE LE AGREGAN CLASES AL BOTON QUE LA CALSE ESTA EN EL CSS Y PASA CUANDO SE LE DA CLICK
     this.nivel = 1 ;
     this.colors = {
         celeste : celeste,  //SE PUEDE PONER SOLO CELESTE PORQUE LLEVA EL MISMO VALOR DE LA VARIBALE PERO EN ESTE CASO NO LO HAGO
         violeta : violeta,  //SE PUEDE PONER SOLO CELESTE PORQUE LLEVA EL MISMO VALOR DE LA VARIBALE PERO EN ESTE CASO NO LO HAGO
         naranja : naranja, //SE PUEDE PONER SOLO CELESTE PORQUE LLEVA EL MISMO VALOR DE LA VARIBALE PERO EN ESTE CASO NO LO HAGO
         verde : verde, //SE PUEDE PONER SOLO CELESTE PORQUE LLEVA EL MISMO VALOR DE LA VARIBALE PERO EN ESTE CASO NO LO HAGO
     }
  }

  
  temporizador(){
    l.innerHTML = tiempo;
    tiempo++;   
  }
    
  pararTemporazidor(){
     clearInterval(this.temporizador)
        tiempo = 0;
    }
           
  
  

  toggleBtnEmpezar(){
      if (btnEmpezar.classList.contains('hide')) {
          btnEmpezar.classList.remove('hide')
      }
  else {
      btnEmpezar.classList.add('hide');
  }
}

  generarSecuencia() {
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel(){
      this.subNivel = 0;  //ESTE ES UN NUEVO VALOR DEL OBJETO , aASI SE HACE CASUALMENTE
      this.iluminarSecuencia()
      this.agregarClick()
  }


  transformarNumeroAColor (numero){
      switch(numero) {
          case 0 :
              return 'celeste'
          case 1 :
              return 'violeta'
          case 2 :
              return 'naranja'
          case 3 :
              return 'verde'
      }
  }
  transformarColorANumero (color){
      switch(color) {
          case 'celeste' :
              return 0
          case 'violeta' :
              return 1
          case 'naranja' :
              return 2
          case 'verde' :
              return 3
      }
  }

  iluminarSecuencia(){
      for ( let i = 0; i < this.nivel; i ++ ) {
          const color = this.transformarNumeroAColor(this.secuencia[i]);
          setTimeout(() => this.iluminarColor(color), 1000 * i)

      }
  }

  iluminarColor(color){
      this.colors[color].classList.add('light')
      setTimeout(() => this.apagarColor(color), 350)
  }
  apagarColor(color){
      this.colors[color].classList.remove('light')    
      }
      agregarClick(){
          this.colors.celeste.addEventListener('click', this.elegirColor)  
          this.colors.violeta.addEventListener('click', this.elegirColor)
          this.colors.naranja.addEventListener('click', this.elegirColor)
          this.colors.verde.addEventListener('click', this.elegirColor)
      }
      eliminarClick(){
          this.colors.celeste.removeEventListener('click', this.elegirColor)
          this.colors.violeta.removeEventListener('click', this.elegirColor)
          this.colors.naranja.removeEventListener('click', this.elegirColor)
          this.colors.verde.removeEventListener('click', this.elegirColor)
      }
//EV ES PARA CUANDO SE LLAMA UN EVENTO EN LA FUNCION
      elegirColor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformarColorANumero(nombreColor);
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subNivel]) {
              this.subNivel++
              if(this.subNivel === this.nivel){
                  this.nivel++
                  this.eliminarEventosClick
                  if(this.nivel === ULTIMO_NIVEL + 1){
                      this.ganoJuego()
                      this.pararTemporazidor();
                  } else{
                     setTimeout( this.siguienteNivel, 1500)
                  }
              } 
          }
          else {
              this.perdioJuego()
              this.pararTemporazidor();
          }
      }

      ganoJuego(){
          swal('Juan Diego S.A.S','Ganaste El Juego!!' , 'succes')
          .then (()=> {
              this.inicializar();
              this.pararTemporazidor();
          })
      }
      perdioJuego(){
          swal('Juan Diego S.A.S','Perdiste :(' , 'error')
          .then(()=> {
              this.eliminarClick()
              this.inicializar();   
              this.pararTemporazidor();

          })
      }

      }

    
function empezarJuego() {
   window.juego = new Juego()

   }
