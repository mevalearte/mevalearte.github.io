import DinoGame from './game/DinoGame.js'
import { attachMentalHealthQuiz } from './quiz.js'

const game = new DinoGame(600, 150)
attachMentalHealthQuiz(game)
window.dinoGame = game

const isInteractiveTarget = (target) =>
  target && typeof target.closest === 'function' && target.closest('dialog, a, button')

// Soporte táctil para móvil (tap = saltar, deslizar abajo o 2 dedos = agacharse)
let touchStartY = null
let isTouchDucking = false
let lastTouchTime = 0
const gameStage = document.getElementById('game-stage')

document.addEventListener(
  'touchstart',
  (e) => {
    lastTouchTime = Date.now()
    if (game.state.awaitingQuiz || isInteractiveTarget(e.target)) return

    const insideStage = gameStage && gameStage.contains(e.target)
    if (!insideStage && !game.state.isRunning) return

    if (insideStage) {
      e.preventDefault()
    }

    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY
      isTouchDucking = false
      game.onInput('jump')
    } else if (e.touches.length === 2) {
      isTouchDucking = true
      game.onInput('duck')
    }
  },
  { passive: false }
)

document.addEventListener(
  'touchmove',
  (e) => {
    if (game.state.awaitingQuiz || !game.state.isRunning || touchStartY === null) return
    if (e.touches.length === 1) {
      const deltaY = e.touches[0].clientY - touchStartY
      if (deltaY > 28 && !isTouchDucking) {
        isTouchDucking = true
        game.onInput('duck')
      }
    }
  },
  { passive: true }
)

document.addEventListener(
  'touchend',
  (e) => {
    lastTouchTime = Date.now()
    if (game.state.awaitingQuiz) return
    touchStartY = null
    if (isTouchDucking || e.touches.length === 0) {
      isTouchDucking = false
      game.onInput('stop-duck')
    }
  },
  { passive: true }
)

// Soporte de clic con ratón para empezar, reiniciar y saltar durante la partida
document.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return
  if (Date.now() - lastTouchTime < 600) return
  if (game.state.awaitingQuiz || isInteractiveTarget(e.target)) return

  const insideStage = gameStage && gameStage.contains(e.target)
  if (insideStage || game.state.isRunning) {
    if (insideStage) e.preventDefault()
    game.onInput('jump')
  }
})

// Soporte de teclado (siempre activo, incluso en portátiles táctiles)
const keycodes = {
  // up, spacebar
  JUMP: { 38: 1, 32: 1 },
  // down
  DUCK: { 40: 1 },
}

document.addEventListener('keydown', (e) => {
  if (game.state.awaitingQuiz) return
  if (keycodes.JUMP[e.keyCode]) {
    e.preventDefault()
    game.onInput('jump')
  } else if (keycodes.DUCK[e.keyCode]) {
    e.preventDefault()
    game.onInput('duck')
  }
})

document.addEventListener('keyup', (e) => {
  if (game.state.awaitingQuiz) return
  if (keycodes.DUCK[e.keyCode]) {
    game.onInput('stop-duck')
  }
})

// Acción "CARGAR LA ATENCIÓN QUE NECESITA" para iniciar/reanudar el juego
const loadBtn = document.getElementById('load-attention-btn')
if (loadBtn) {
  loadBtn.addEventListener('click', () => {
    if (!game.state.awaitingQuiz && !game.state.isRunning) {
      game.onInput('jump')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

game.start().catch(console.error)
