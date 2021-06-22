const $form = document.querySelector('#form')
const $memotest = document.querySelector('#memotest')
const $cartas = document.querySelectorAll('.cards')

const cartas = [
  { nombre: 'armin', id: '1', src: 'src/imgs/cards/armin.jpg' },
  { nombre: 'eren', id: '2', src: 'src/imgs/cards/eren.jpg' },
  { nombre: 'erwin', id: '3', src: 'src/imgs/cards/erwin.jpg' },
  { nombre: 'historia', id: '4', src: 'src/imgs/cards/historia.jpg' },
  { nombre: 'levi', id: '5', src: 'src/imgs/cards/levi.png' },
  { nombre: 'mikasa', id: '6', src: 'src/imgs/cards/mikasa.jpg' },
  { nombre: 'reiner', id: '7', src: 'src/imgs/cards/reiner.jpg' },
  { nombre: 'sasha', id: '8', src: 'src/imgs/cards/sasha.jpg' }
]

let intentos = 0
let cantidadClicks = []

const resetSound = document.querySelector('#reset');
const resetSoundOption = document.querySelector('#reset-option');
const correctSound = document.querySelector('#correct');
const wrongSound = document.querySelector('#wrong');
const screamErenSound = document.querySelector('#scream-eren');
const screamMikasaSound = document.querySelector('#scream-mikasa');
const cardFlipSound = document.querySelector('#card-flip');

$form.boton.onclick = function () {
  resetSoundOption.play()
  resetSoundOption.volume = 0.6
  ocultarBoton()
  mensajeAutomatico('¡Comencemos! 🔮')
}

function mezclarCartas() {
  const cartasDuplicadas = cartas.concat(cartas)
  const cartasRandom = cartasDuplicadas.sort(function () { return 0.5 - Math.random() })

  for (let i = 0; i < cartasRandom.length; i++) {
    $cartas[i].src = cartasRandom[i].src
    console.log($cartas[i].src);
  }
}

function voltearCartas(e) {
  const carta = e.currentTarget
  if (carta.className === 'cards cards-size') {
    carta.classList.add('card-back')
    cardFlipSound.play()
  } else {
    carta.className == "cards cards-size"
  }

  cantidadClicks.push(carta)
  console.log(cantidadClicks);
  console.log(cantidadClicks[0], 'primer elemento');
  console.log(cantidadClicks[1], 'segundo elemento');
  if (cantidadClicks.length === 2) {
    compararCartas()
  }
}

function compararCartas() {
  const eliminarElemento = cantidadClicks.pop()
  const primerClick = cantidadClicks[0].src
  console.log(primerClick);
  const segundoClick = cantidadClicks[1]
  console.log(segundoClick);
  const primeraCarta = primerClick.querySelector('cards cards-size')[0].src
  const segundaCarta = segundoClick.querySelector('cards cards-size')[0].src

  console.log(primeraCarta);

  if (primerClick !== segundoClick && primeraCarta === segundaCarta) {
    setTimeout(function () {
      primerClick.className = 'cards cards-size'
      segundoClick.className = 'cards cards-size'
    }, 500)
    eliminarElemento
    eliminarElemento
  } else if (primeraCarta !== segundaCarta) {
    setTimeout(function () {
      primeraCarta, segundaCarta = ocultarCartas()
    }, 500)
    eliminarElemento
    eliminarElemento
  } else if (primeraCarta === segundaCarta && primerClick === segundoClick) {
    eliminarElemento
    eliminarElemento
  }
}

function ocultarCartas(e) {
  setTimeout(function () {
    e.target.classList.remove('card-back');
  }, 500)
}

function bloquearCartaClickeada($carta) {
  $carta.onclick = function () {
  }
}

function intentosMaximos(intentos) {
  document.querySelector('#max-intentos').value = intentos
}

function mensajeAutomatico(mensaje) {
  const $p = document.querySelector('#mensaje')
  $p.innerText = mensaje
}

function mensajeCartaErronea() {
  const frases = [
    'Nop, casi 🙄',
    'Ooooooole 😂',
    'Dale, vos podes 🙃',
    'Esa no era, pero está cerca 🤫',
    'Uuuy, casi 🥴',
    'Ooooole 🤭',
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function mensajeCartasIguales() {
  let nombresPersonajes

  cartas.forEach(function (carta, i) {
    nombresPersonajes = cartas[i].nombre
  })
  const frases = [
    `Wow es ${nombresPersonajes}`,
    `Adivinaste, ahí estaba ${nombresPersonajes}🤺!`,
    `Esaaa, se hizo desear ${nombresPersonajes} 🧐`,
    `Bien, encontraste a ${nombresPersonajes} 🥳!`,
    `Ojo con ${nombresPersonajes}`,
    `Bravo es ${nombresPersonajes}`,
  ]
  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function mensajePerdedor() {
  const frases = [
    'Te quedaste sin intentos 😪',
    'Perdiste 😞',
    'Perdiste pero la próxima es tuya, dale 😉',
    'Nooooo 😢',
    'Se acabó el tiempo ⌛',
    'Intentá otra vez 🥺',
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function mensajeGanador() {
  const frases = [
    '',
    '',
    '',
    '',
    '',
    '',
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function mostrarBoton() {
  boton.className = 'btn-barajar';
  boton.value = 'reiniciar'
}

function ocultarBoton() {
  boton.className = 'd-none'
}

$cartas.forEach(function ($carta) { $carta.addEventListener('click', voltearCartas) })