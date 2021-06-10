const $form = document.querySelector('#form')

let secuenciaMaquina = []
let secuenciaUsuario = []
let intentos = 0

const cartas = [
  { id: '1', src: 'src/imgs/cards/armin.jpg' },
  { id: '2', src: 'src/imgs/cards/eren.jpg' },
  { id: '3', src: 'src/imgs/cards/erwin.jpg' },
  { id: '4', src: 'src/imgs/cards/historia.jpg' },
  { id: '5', src: 'src/imgs/cards/levi.png' },
  { id: '6', src: 'src/imgs/cards/mikasa.jpg' },
  { id: '7', src: 'src/imgs/cards/reiner.jpg' },
  { id: '8', src: 'src/imgs/cards/sasha.jpg' }
]

const cartasUsadas = {}

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

const $cards = document.querySelectorAll('.cards')
$cards.forEach(function ($card) {
  $card.onclick = function (e) {
    cartaRandom(e)
    cardFlipSound.play()
    voltearCartas(e)
    // bloquearInputUsuario()
  }
})

function voltearCartas(e) {
  const $card = e.target.classList.add('card-back')
}

function cartaRandom(e) {
  const indice = Math.floor(Math.random() * cartas.length)
  e.target.setAttribute('src', cartas[indice].src)
}

// const indice = Math.floor(Math.random() * cartas.length);
// if (cartas[indice].id in dic && dic[cartas[indice].id] < 2) {
//   ++dic[cartas[indice].id];
//   e.target.setAttribute('src', cartas[indice].src)
// } else {
//   dic[cartas[indice].id] = 1;
// }
// console.log(dic);

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