const QUESTIONS = [
  {
    question:
      'Un amigo lleva semanas aislándose, cancelando planes y apenas contesta mensajes. ¿Cuál es la mejor forma de actuar?',
    options: [
      'Escribirle con cercanía y sin presionar: "He notado que estás más callado últimamente, estoy aquí para escucharte cuando quieras".',
      'Esperar a que se le pase solo y no decirle nada para no incomodar.',
      'Decirle que está exagerando y que salga de fiesta para animarse.',
    ],
    correct: 0,
    explanation:
      'Mostrar disponibilidad sin juzgar ni presionar abre la puerta a que la otra persona pida ayuda cuando se sienta preparada.',
  },
  {
    question:
      'Alguien de confianza te confiesa que siente un vacío enorme y que ya no tiene ganas de seguir adelante. ¿Qué debes hacer?',
    options: [
      'Cambiar de tema rápidamente para distraerle y que piense en cosas positivas.',
      'Escucharle con calma, validar lo que siente sin juzgar y ayudarle a contactar con ayuda profesional o llamar al 024.',
      'Decirle que hay gente mucho peor y que debería agradecer lo que tiene.',
    ],
    correct: 1,
    explanation:
      'Escuchar sin minimizar su dolor y acompañar hacia ayuda profesional (como el 024 en España) es clave. Minimizar o comparar aumenta el aislamiento.',
  },
  {
    question: 'En España, ¿qué es el teléfono 024 y cuándo se debe utilizar?',
    options: [
      'Un número solo para urgencias médicas físicas.',
      'La línea gratuita, anónima y 24h de atención a la conducta suicida del Ministerio de Sanidad, tanto para quien sufre como para sus allegados.',
      'Un servicio de pago que solo funciona en horario de mañana.',
    ],
    correct: 1,
    explanation:
      'El 024 está disponible 24/7, es gratuito y confidencial. También atiende a familiares y amigos que no saben cómo ayudar.',
  },
  {
    question:
      'Tu compañero te dice que lleva días sin dormir por la ansiedad y siente que no puede con todo. ¿Qué respuesta ayuda más?',
    options: [
      '"Eso es estrés de exámenes, a todo el mundo le pasa, no te preocupes."',
      '"Gracias por contármelo. ¿Quieres que hablemos un rato o que busquemos juntos apoyo profesional?"',
      '"Tómate una tila y ponte a trabajar, así se te olvida."',
    ],
    correct: 1,
    explanation:
      'Agradecer la confianza, no quitarle importancia y ofrecer apoyo práctico para buscar ayuda reduce la carga emocional.',
  },
  {
    question:
      '¿Es cierto que preguntar directamente a alguien si está pensando en hacerse daño puede "darle la idea"?',
    options: [
      'Sí, es mejor evitar el tema por completo.',
      'No, preguntar con empatía y calma alivia a la persona porque siente que alguien se preocupa y puede hablar sin tabúes.',
      'Solo si se hace por mensaje de texto.',
    ],
    correct: 1,
    explanation:
      'Es un mito peligroso. Hablar abiertamente y con respeto sobre el malestar emocional reduce el riesgo y facilita aceptar ayuda.',
  },
  {
    question:
      '¿Cuál de estas señales puede indicar que una persona cercana está pasando por un mal momento emocional?',
    options: [
      'Cambios bruscos de humor, aislamiento social, descuido personal, alteraciones del sueño o frases de desesperanza.',
      'Únicamente cuando llora en público.',
      'Ninguna, si una persona sonríe en redes sociales significa que está bien.',
    ],
    correct: 0,
    explanation:
      'Muchas personas ocultan su sufrimiento en público. El aislamiento, el agotamiento o frases como "soy una carga" son señales de alerta.',
  },
  {
    question:
      'Si una amiga tiene un ataque de pánico o ansiedad intensa delante de ti, ¿cómo puedes ayudarla en ese momento?',
    options: [
      'Gritarle "¡Cálmate ya!" y rodearla con mucha gente.',
      'Acompañarla a un lugar tranquilo, hablarle con voz pausada, recordarle que está a salvo y respirar despacio con ella.',
      'Dejarla completamente sola hasta que se le pase.',
    ],
    correct: 1,
    explanation:
      'Mantener la calma, reducir estímulos y guiar una respiración pausada ayuda a que el sistema nervioso recupere el equilibrio.',
  },
  {
    question:
      '¿Qué significa practicar la "escucha activa" con alguien que lo está pasando mal?',
    options: [
      'Darle consejos rápidos e interrumpirle para contarle tus propios problemas.',
      'Prestar atención plena sin mirar el móvil, no juzgar, respetar sus silencios y validar cómo se siente.',
      'Darle la razón en todo aunque esté en peligro.',
    ],
    correct: 1,
    explanation:
      'La escucha activa consiste en estar presente de verdad, sin intentar "arreglar" su vida en cinco minutos ni juzgar sus emociones.',
  },
  {
    question:
      'Si notas que tú mismo llevas semanas desbordado, triste sin motivo aparente o sin ilusión por nada, ¿qué es lo más recomendable?',
    options: [
      'Ocultarlo para no parecer débil ni molestar a nadie.',
      'Pedir ayuda: hablar con alguien de confianza, acudir a tu médico de cabecera o llamar al 024.',
      'Aislarte en tu habitación hasta tener fuerzas.',
    ],
    correct: 1,
    explanation:
      'Pedir ayuda es un acto de autocuidado. La salud mental merece la misma atención médica y social que la salud física.',
  },
  {
    question:
      'Un amigo te pide que no cuentes nada, pero temes seriamente por su seguridad inmediata. ¿Qué debes hacer?',
    options: [
      'Guardar el secreto pase lo que pase, aunque su vida corra peligro.',
      'Priorizar su vida y seguridad: acompañarle y contactar con el 112, 024 o un adulto/profesional responsable explicándole que lo haces porque te importa.',
      'Publicarlo en redes sociales para pedir opinión.',
    ],
    correct: 1,
    explanation:
      'Cuando existe riesgo para la integridad de alguien, su seguridad siempre está por encima de cualquier promesa de silencio.',
  },
  {
    question: '¿Qué frase deberías EVITAR decirle a alguien que atraviesa una depresión?',
    options: [
      '"No estás solo en esto, podemos ir paso a paso."',
      '"Pon de tu parte, si no sales de la cama es porque no quieres."',
      '"Aunque ahora no lo veas, esto se puede tratar con apoyo profesional."',
    ],
    correct: 1,
    explanation:
      'La depresión no es falta de voluntad; culpar a la persona por no poder "animarse" agrava su sentimiento de culpa.',
  },
  {
    question:
      'Como dice el cartel: "Nadie te avisará cuando tu amigo esté mal". ¿Qué pequeño hábito fortalece la red de apoyo?',
    options: [
      'Preguntar de vez en cuando "¿cómo estás de verdad?" y escuchar la respuesta con interés real.',
      'Mandar solo memes y evitar conversaciones profundas.',
      'Asumir que si necesita algo ya llamará.',
    ],
    correct: 0,
    explanation:
      'Activar la empatía cotidiana y preguntar cómo está la otra persona de verdad puede marcar la diferencia.',
  },
]

export function attachMentalHealthQuiz(game) {
  const dialog = document.getElementById('quiz-dialog')
  const questionEl = document.getElementById('quiz-question')
  const optionsEl = document.getElementById('quiz-options')
  const feedbackEl = document.getElementById('quiz-feedback')
  const continueBtn = document.getElementById('quiz-continue-btn')

  let order = []
  let index = 0
  let lastQuestionIdx = -1
  let answered = false
  let wasCorrect = false

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function shuffle() {
    order = shuffleArray(QUESTIONS.map((_, i) => i))
    if (order.length > 1 && order[0] === lastQuestionIdx) {
      const swapWith = 1 + Math.floor(Math.random() * (order.length - 1))
      ;[order[0], order[swapWith]] = [order[swapWith], order[0]]
    }
    index = 0
  }

  function nextQuestion() {
    if (index >= order.length) shuffle()
    const qIdx = order[index++]
    lastQuestionIdx = qIdx
    const q = QUESTIONS[qIdx]
    const optOrder = shuffleArray(q.options.map((_, i) => i))
    return {
      question: q.question,
      options: optOrder.map((origIdx) => q.options[origIdx]),
      correct: optOrder.indexOf(q.correct),
      explanation: q.explanation,
    }
  }

  function handleOptionClick(chosen, item, buttons) {
    if (answered) return
    answered = true
    wasCorrect = chosen === item.correct

    buttons.forEach((btn, i) => {
      btn.disabled = true
      if (i === item.correct) btn.classList.add('is-correct')
      else if (i === chosen && !wasCorrect) btn.classList.add('is-wrong')
    })

    feedbackEl.hidden = false
    feedbackEl.className = 'quiz-feedback ' + (wasCorrect ? 'feedback-ok' : 'feedback-fail')
    feedbackEl.innerHTML =
      `<strong>${wasCorrect ? '¡Correcto! Has salvado a Dino.' : 'Respuesta incorrecta.'}</strong>` +
      `<p>${item.explanation}</p>`

    continueBtn.hidden = false
    continueBtn.textContent = wasCorrect ? 'Seguir la partida' : 'Ver resultado'
    continueBtn.focus()
  }

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault()
  })

  continueBtn.addEventListener('click', () => {
    dialog.close()
    if (wasCorrect) {
      game.reviveAfterQuiz()
    } else {
      game.failQuiz()
    }
  })

  game.onCollision = () => {
    answered = false
    wasCorrect = false
    const item = nextQuestion()

    questionEl.textContent = item.question
    optionsEl.innerHTML = ''
    feedbackEl.hidden = true
    feedbackEl.textContent = ''
    continueBtn.hidden = true

    const buttons = item.options.map((text, i) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'quiz-option-btn'
      btn.textContent = text
      btn.addEventListener('click', () => handleOptionClick(i, item, buttons))
      optionsEl.appendChild(btn)
      return btn
    })

    dialog.showModal()
  }

  shuffle()
}
