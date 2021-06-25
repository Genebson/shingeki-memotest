const $form = document.querySelector('#form')
const $memotest = document.querySelector('#memotest')
const $cartas = document.querySelectorAll('.cards')
const cartaEspalda = 'src/imgs/cards/card-backwards.png'
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
let puntaje = 0
let $elementosVolteados = []

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
    $cartas[i].dataset.id = cartasRandom[i].id
    // $cartas[i].dataset.nombre = cartasRandom[i].nombre
    console.log($cartas[i].dataset.id);
  }
}

function voltearCartas(e) {
  const $carta = e.currentTarget
  const cartaData = cartas.find(carta => carta.id === $carta.dataset.id)

  if ($carta.className === 'cards cards-size') {
    $carta.classList.add('card-back')
    cardFlipSound.play()
    $carta.src = cartaData.src
  } else {
    $carta.className == "cards cards-size"
  }

  $elementosVolteados.push($carta)
  console.log($elementosVolteados);
  if ($elementosVolteados.length === 2) {
    compararCartas(e)
  }
}

function eliminarElementos() {
  $elementosVolteados = []
}

function compararCartas(e) {
  let $primeraId = $elementosVolteados[0].dataset.id
  let $segundaId = $elementosVolteados[1].dataset.id
  console.log($primeraId);
  console.log($segundaId);
  if ($primeraId === $segundaId) {
    setTimeout(function () {
      console.log('entro al if');
      bloquearCartaClickeada()
    }, 500)
    puntaje++
    actualizarPuntaje(puntaje)
    mensajeAutomatico(mensajeCartasIguales())
    compararPersonajes()
    eliminarElementos()
  } else if ($primeraId !== $segundaId) {
    setTimeout(function () {
      console.log('entro al else if');
      $primeraId, $segundaId = ocultarCartas(e)
      console.log('desp de ocultar carta');
      // eliminarElementos()
    }, 500)
    intentos++
  }
}

function compararPersonajes() {
  const segundaCartaId = $elementosVolteados[1].dataset.id
  const segundaCartaData = cartas.find(carta => carta.id === segundaCartaId)
  if (segundaCartaData.nombre === 'eren') {
    screamErenSound.volume = 1
    screamErenSound.play()
  } else if (segundaCartaData.nombre === 'mikasa') {
    screamMikasaSound.volume = 1
    screamMikasaSound.play()
  }
}

function ocultarCartas(e) {
  setTimeout(function () {
    e.target.classList.remove('card-back')
  }, 500)
}

function bloquearCartaClickeada() {
  $elementosVolteados[0].removeEventListener('click', voltearCartas);
  $elementosVolteados[1].removeEventListener('click', voltearCartas);
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
  const segundaCartaId = $elementosVolteados[1].dataset.id
  const segundaCartaData = cartas.find(carta => carta.id === segundaCartaId)

  const frases = [
    `Wow es ${segundaCartaData.nombre}`,
    `Adivinaste, ahí estaba ${segundaCartaData.nombre}🤺!`,
    `Esaaa, se hizo desear ${segundaCartaData.nombre} 🧐`,
    `Bien, encontraste a ${segundaCartaData.nombre} 🥳!`,
    `Encontraste a ${segundaCartaData.nombre} 👈🏻`,
    `Bravo es ${segundaCartaData.nombre}`,
  ]
  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))

  return frases[fraseAleatoria]
}

function intentosMaximos(intentos) {
  document.querySelector('#max-intentos').value = intentos
}

function actualizarPuntaje(puntaje) {
  $form.puntaje.value = puntaje
  // correctSound.play()
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
mezclarCartas()