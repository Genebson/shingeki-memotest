const $form = document.querySelector('#form')

let intentos = 0
const primerClick = null

const cartas = [
  { nombre: 'armin', id: '1', src: 'src/imgs/cards/armin.jpg', times: 0 },
  { nombre: 'eren', id: '2', src: 'src/imgs/cards/eren.jpg', times: 0 },
  { nombre: 'erwin', id: '3', src: 'src/imgs/cards/erwin.jpg', times: 0 },
  { nombre: 'historia', id: '4', src: 'src/imgs/cards/historia.jpg', times: 0 },
  { nombre: 'levi', id: '5', src: 'src/imgs/cards/levi.png', times: 0 },
  { nombre: 'mikasa', id: '6', src: 'src/imgs/cards/mikasa.jpg', times: 0 },
  { nombre: 'reiner', id: '7', src: 'src/imgs/cards/reiner.jpg', times: 0 },
  { nombre: 'sasha', id: '8', src: 'src/imgs/cards/sasha.jpg', times: 0 }
]

const resetSound = document.querySelector('#reset');
const resetSoundOption = document.querySelector('#reset-option');
const correctSound = document.querySelector('#correct');
const wrongSound = document.querySelector('#wrong');
const screamErenSound = document.querySelector('#scream-eren');
const screamMikasaSound = document.querySelector('#scream-mikasa');
const cardFlipSound = document.querySelector('#card-flip');

$form.boton.onclick = function () {
  mensajeAutomatico('¡Comencemos! 🔮')
  resetSoundOption.play()
  resetSoundOption.volume = 0.6
  ocultarBoton()
}

const $cartas = document.querySelectorAll('.cards')
$cartas.forEach(function ($carta) {
  $carta.onclick = function (e) {
    cartaRandom(e, $carta)
    cardFlipSound.play()
    voltearCartas(e)
    mensajeAutomatico(mensajeCartasIguales())
  }
})

function voltearCartas(e) {
  e.target.classList.add('card-back')
}

function cartaRandom(e, $carta) {
  const cartasFiltradas = cartas.filter(carta => carta.times < 2)
  const indice = Math.floor(Math.random() * cartasFiltradas.length)
  const index = cartas.indexOf(cartasFiltradas[indice])
  ++cartas[index].times
  console.log(cartas[index].times);
  console.log(cartas[index].nombre);
  e.target.setAttribute('src', cartasFiltradas[indice].src)
  $carta.onclick = null
}

function compararCartas($carta) {

}

function intentosMaximos(intentos) {
  document.querySelector('#max-intentos').value = intentos
}

function bloquearCartaClickeada($carta) {
  $carta.onclick = function () {
  }
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