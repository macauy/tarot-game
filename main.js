
// variables globales
let player1 = ''
let player2 = ''
let partidas = []
let partida = {
  p1: '',
  p2: '',
  cartas: []
}
let partidaCargada;


// Elementos del DOM
const container1 = document.querySelector('.container1')
const container2 = document.querySelector('.container2')
const container3 = document.querySelector('.container3')
const listaPartidas = document.getElementById('partidas')
const form = document.getElementById('form-players')
const scores = document.getElementById('scores')
const btnPlay   = document.getElementById('btn-play')
const btnReplay = document.getElementById('btn-replay')
const btnGuardar = document.getElementById('btn-guardar')
const carousel = document.getElementById('carousel')
const cardTitle = document.getElementById('card-title')
const cardName = document.getElementById('card-name')
const namePlayer1 = document.getElementById('result-player1')
const namePlayer2 = document.getElementById('result-player2')
const resultado = document.getElementById('result')
const pantallas = document.querySelectorAll('.container')


// Muestra una pantalla
const mostrarPantalla = (id) => {
  pantallas.forEach((p) => {
    if (p.id == id) 
      p.classList.remove('hidden')
    else
      p.classList.add('hidden')
  })
}


// Inicio
const inicio = () => {
  mostrarPantalla('pantalla1')
  listaPartidas.innerHTML = ''
  partidas = JSON.parse(localStorage.getItem('PARTIDAS')) ?? []
  if (partidas.length>0) {
    scores.style.display = 'block'
    partidas.forEach((p,index) => { 
      listaPartidas.innerHTML += `<li onclick='verPartida(${index})'>${index+1} - ${p.p1} vs ${p.p2}<i class="fa-solid fa-magnifying-glass"></i></li>`
    })
  }
}

// Muestro pantalla inicial
inicio()



// Botón Jugar
const iniciarJuego = () => {
    const p1 = document.getElementById('player1').value
    const p2 = document.getElementById('player2').value
    if (p1 && p2) {
    partida = {p1, p2}
    form.reset()
    partidaCargada = false
    jugar()
    } else {
      const lbl = document.getElementById('lblPlayers')
      lbl.innerHTML = 'Ingrese los nombres de los jugadores'
  }
}

const jugar = () => {
  mostrarPantalla('pantalla2')
  setTimeout(() => {
    mostrarCartas(false)
  }, 3000);
}

const mostrarCartas = (hayPartida) => {
    mostrarPantalla('pantalla3')

    let cartasJuego = []
    let suma = 0 
    carousel.innerHTML = ''

    if (hayPartida) {
      cartasJuego = partida.cartas
      btnReplay.style.display = 'none'
      partidaCargada = true
    } else {  
      btnReplay.style.display = 'inline-block'
      while (cartasJuego.length < 6) {
        let random = Math.floor(Math.random() * cartas.length)
        if (cartasJuego.indexOf(cartas[random])==-1) {
          cartasJuego.push(cartas[random])
          suma += cartas[random].id
        }
      }
      partida.cartas = cartasJuego
      partida.resultado = (suma % 2 === 0)
    }
    
    cartasJuego.forEach((carta,index) => {
      let active = ''
      if (index===0) {
        active = 'active'
      }
      const playerName = (index<3 ? (partida.p1):(partida.p2))
      const playerIndex = (index<3 ? (index+1):(index-2))
      
      carousel.innerHTML += 
      `<div class="carousel-item ${active}" data-id=${carta.id} data-index=${playerIndex} data-name='${playerName}'>
        <img src=${carta.img} class="d-block w-100" alt=${carta.name}>
      </div>`
    })

    // inicializacion
    cambiarTitulos(cartasJuego[0],1,partida.p1)
}

const myCarousel = document.getElementById('carouselExampleIndicators')
myCarousel.addEventListener('slide.bs.carousel', event => {
  const id = event.relatedTarget.getAttribute('data-id')
  const index = event.relatedTarget.getAttribute('data-index')
  const name = event.relatedTarget.getAttribute('data-name')
  cambiarTitulos(cartas[id-1], index, name)
})

const cambiarTitulos = (carta, index, jugador) => {
  cardTitle.innerHTML = `Carta ${index} de ${jugador}`
  cardName.innerHTML  = `${carta.name}`
  // cardDesc.innerHTML  = `Desc: ${carta.desc}`
}


const verResultados = () => {
  mostrarPantalla('pantalla4')
  
  if (partidaCargada) 
    btnGuardar.style.display = 'none'
  else
    btnGuardar.style.display = 'inline-block'
  
  namePlayer1.innerHTML = partida.p1
  namePlayer2.innerHTML = partida.p2

  const row1 = document.getElementById("cartas-player1")
  const row2 = document.getElementById("cartas-player2")
  row1.innerHTML =`
    <img src="${partida.cartas[0].img}" class="img-mini" alt="...">
    <img src="${partida.cartas[1].img}" class="img-mini" alt="...">
    <img src="${partida.cartas[2].img}" class="img-mini" alt="...">
    `
  row2.innerHTML =`
    <img src="${partida.cartas[3].img}" class="img-mini" alt="...">
    <img src="${partida.cartas[4].img}" class="img-mini" alt="...">
    <img src="${partida.cartas[5].img}" class="img-mini" alt="...">
  `
  resultado.innerHTML = partida.resultado ? ("¡Hay match!"):('No hay match :(')  
}

const guardarPartida = () => {
  partidas.push(partida)
  localStorage.setItem('PARTIDAS', JSON.stringify(partidas));
  inicio()
}

const verPartida = (index) => {
  partida = partidas[index]
  mostrarCartas(true)
}

let acc = document.getElementById("accordion");
acc.addEventListener("click", function() {
  this.classList.toggle("scores-accordion-active");
  let panel = this.nextElementSibling;
  panel.classList.toggle("hidden");
});

// ---------------------------
