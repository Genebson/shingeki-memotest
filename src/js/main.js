const $form = document.querySelector('#form')

let secuenciaMaquina = []
let secuenciaUsuario = []

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
}

// function bababa() {
//   const imagenes = document.querySelectorAll('.card-front')
//   imagenes.forEach(function (imagen) {
//     imagen.src = "/src/imgs/cards/card-backwards.png"
//   })
// }


function bloquearInputUsuario() {
  const $cards = document.querySelectorAll('.cards')

  $cards.forEach(function ($card) {
    $card.onclick = function () {
    }
  })
}

function desbloquearInputUsuario() {
  const $cards = document.querySelectorAll('.cards')

  $cards.forEach(function ($card) {
    $card.onclick = manejarInputUsuario()
  })
}

function mostrarBoton() {
  boton.className = 'btn-barajar';
  boton.value = 'reiniciar'
}

function ocultarBoton() {
  boton.className = 'd-none'
}