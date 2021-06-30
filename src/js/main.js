const $form = document.querySelector('#form')
const $memotest = document.querySelector('#memotest')
const $cartas = document.querySelectorAll('.cards')
const cartaDeEspalda = 'src/imgs/cards/card-backwards.png'
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

const correctSound = document.querySelector('#correct');
const wrongSound = document.querySelector('#wrong');
const screamErenSound = document.querySelector('#scream-eren');
const screamMikasaSound = document.querySelector('#scream-mikasa');
const screamErwinSound = document.querySelector('#scream-erwin');
const screamLeviSound = document.querySelector('#scream-levi');
const screamHistoriaSound = document.querySelector('#scream-historia');
const screamSashaSound = document.querySelector('#scream-sasha');
const screamArminSound = document.querySelector('#scream-armin');
const screamReinerSound = document.querySelector('#scream-reiner');
const cardFlipSound = document.querySelector('#card-flip');
const victoriaSound = document.querySelector('#victoria');
const derrotaSound = document.querySelector('#derrota')

function mezclarCartas() {
  const cartasDuplicadas = cartas.concat(cartas)
  const cartasRandom = cartasDuplicadas.sort(function () { return 0.5 - Math.random() })

  for (let i = 0; i < cartasRandom.length; i++) {
    $cartas[i].dataset.id = cartasRandom[i].id
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
  $carta.removeEventListener('click', voltearCartas)
  if ($elementosVolteados.length === 2) {
    compararCartas()
  }
}

function eliminarElementos() {
  $elementosVolteados = []
}

function compararCartas() {
  let $primeraId = $elementosVolteados[0].dataset.id
  let $segundaId = $elementosVolteados[1].dataset.id

  if ($primeraId === $segundaId) {
    setTimeout(function () {
      eliminarElementos()
      puntaje++
      actualizarPuntaje(puntaje)
      correctSound.play()
    }, 500)
    bloquearCartasClickeadas()
    mensajeAutomatico(mensajeCartasIguales())
    compararPersonajes()
  } else if ($primeraId !== $segundaId) {
    setTimeout(function () {
      $primeraId, $segundaId = ocultarCartas()
      intentos++
      intentosMaximos(intentos)
      eliminarElementos()
      wrongSound.play()
    }, 500)
    mensajeAutomatico(mensajeCartaErronea())
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
  } else if (segundaCartaData.nombre === 'armin') {
    screamArminSound.volume = 1
    screamArminSound.play()
  } else if (segundaCartaData.nombre === 'reiner') {
    screamReinerSound.volume = 1
    screamReinerSound.play()
  } else if (segundaCartaData.nombre === 'levi') {
    screamLeviSound.volume = 1
    screamLeviSound.play()
  } else if (segundaCartaData.nombre === 'historia') {
    screamHistoriaSound.volume = 1
    screamHistoriaSound.play()
  } else if (segundaCartaData.nombre === 'sasha') {
    screamSashaSound.volume = 1
    screamSashaSound.play()
  } else if (segundaCartaData.nombre === 'erwin') {
    screamErwinSound.volume = 0.5
    screamErwinSound.play()
  }
}

function ocultarCartas() {
  const $primerElemento = document.querySelector(`[src="${$elementosVolteados[0].getAttribute('src')}"]`)
  const $segundoElemento = document.querySelector(`[src="${$elementosVolteados[1].getAttribute('src')}"]`)

  $primerElemento.classList.remove('card-back')
  $segundoElemento.classList.remove('card-back')
  $primerElemento.setAttribute('src', cartaDeEspalda)
  $segundoElemento.setAttribute('src', cartaDeEspalda)
  $primerElemento.addEventListener('click', voltearCartas)
  $segundoElemento.addEventListener('click', voltearCartas)
}

function bloquearCartasClickeadas() {
  $elementosVolteados[0].removeEventListener('click', voltearCartas)
  $elementosVolteados[1].removeEventListener('click', voltearCartas)
}

function mensajeAutomatico(mensaje) {
  const $p = document.querySelector('#mensaje')
  $p.innerText = mensaje
}

function mensajeCartasIguales() {
  const segundaCartaId = $elementosVolteados[1].dataset.id
  const segundaCartaData = cartas.find(carta => carta.id === segundaCartaId)

  const frases = [
    `Wow es ${segundaCartaData.nombre} ✨`,
    `Adivinaste, ahí estaba ${segundaCartaData.nombre}🤺!`,
    `Esaaa, se hizo desear ${segundaCartaData.nombre} 🧐`,
    `Bien, encontraste a ${segundaCartaData.nombre} 🥳!`,
    `Encontraste a ${segundaCartaData.nombre} 👈🏻`,
    `Bravo es ${segundaCartaData.nombre} 👏🏻`,
  ]
  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))

  return frases[fraseAleatoria]
}

function mensajeCartaErronea() {
  const segundaCartaId = $elementosVolteados[0].dataset.id
  const segundaCartaData = cartas.find(carta => carta.id === segundaCartaId)

  const frases = [
    `Ooole, ahí no está ${segundaCartaData.nombre} 🤭`,
    `No se parece en nada a ${segundaCartaData.nombre} 🤔`,
    `Casi, pero no es ${segundaCartaData.nombre} 🥱`,
    `Seguí intentando, ya va a aparecer ${segundaCartaData.nombre} 😢`,
    `Justo ahí, ${segundaCartaData.nombre} no está 😣`,
    `${segundaCartaData.nombre} 404 not found ❌`,
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria]
}

function intentosMaximos(intentos) {
  document.querySelector('#intentos-valor').value = intentos
  if (intentos === 10) {
    terminarJuego()
  }
}

function actualizarPuntaje(puntaje) {
  $form.puntaje.value = puntaje
  if (puntaje === 8) {
    terminarJuego()
  }
}

function terminarJuego() {
  const $body = document.querySelector('body')
  const $jugadas = document.querySelector('#jugadas')
  const $p = document.querySelector('#mensaje')
  const $githubContainer = document.querySelector('#github')
  if (puntaje === 8) {
    $memotest.style.display = 'none'
    $jugadas.style.display = 'none'
    $githubContainer.style.display = 'none'
    $p.innerText = '¡GANASTE! 🥳'
    $p.style.fontSize = '4em'
    setTimeout(function () {
      $p.style.display = 'none'
    }, 1900)
    $body.style.backgroundImage = "url('./src/imgs/victoria.gif')"
    victoriaSound.play()
    setTimeout(function () {
      location.reload();
    }, 14000)
  } else if (intentos === 10) {
    $memotest.style.display = 'none'
    $jugadas.style.display = 'none'
    $githubContainer.style.display = 'none'
    $p.innerText = '¡PERDISTE! 👎🏻'
    $p.style.fontSize = '4em'
    setTimeout(function () {
      $p.style.display = 'none'
    }, 1900)
    $body.style.backgroundImage = "url('./src/imgs/derrota.gif')"
    derrotaSound.play()
    setTimeout(function () {
      location.reload();
    }, 14000)
  }
}

$cartas.forEach(function ($carta) { $carta.addEventListener('click', voltearCartas) })
mezclarCartas()