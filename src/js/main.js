const $form = document.querySelector('#form')

let secuenciaMaquina = []
let secuenciaUsuario = []
let intentos = 0

const cardsFront = [
  'src/imgs/cards/armin.jpg',
  'src/imgs/cards/eren.jpg',
  'src/imgs/cards/erwin.jpg',
  'src/imgs/cards/historia.jpg',
  'src/imgs/cards/levi.png',
  'src/imgs/cards/mikasa.jpg',
  'src/imgs/cards/reiner.jpg',
  'src/imgs/cards/sasha.jpg'
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

// $cards.onclick = function () {
//   // $cards.classList.add('card-back')
//   voltearCartas()
//   cardFlipSound.play()
//   cartaRandom()
//   bloquearInputUsuario()
// }

const $cards = document.querySelectorAll('.cards-container')
$cards.forEach(function ($card) {
  $card.onclick = function () {
    cartaRandom()
    cardFlipSound.play()
    voltearCartas()
    // bloquearInputUsuario()
  }
})

function voltearCartas(e) {
  const $imagenes = document.querySelector('.cards-container')

  $imagenes.forEach(function ($imagen) {
    if (e.target.classList.contains('cards'))
      $imagen.classList.add('card-back')
  })
}

function cartaRandom() {
  const $imagenes = document.querySelectorAll('.cards')
  let number = Math.floor(Math.random() * (cardsFront.length))

  $imagenes.forEach(function ($imagen) {
    $imagen.src = cardsFront[number]
  })
}

function compararCartas() {

}

function intentosMaximos(intentos) {
  document.querySelector('#max-intentos').value = intentos
}

function bloquearInputUsuario() {
  const $cards = document.querySelectorAll('.cards')

  $cards.forEach(function ($card) {
    $card.onclick = function () {
      console.log('block');
    }
  })
}

function desbloquearInputUsuario() {
  const $cards = document.querySelectorAll('.cards')

  $cards.forEach(function ($card) {
    $card.onclick = manejarInputUsuario()
  })
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
    '',
    '',
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function mensajeCartaCorrecta() {
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