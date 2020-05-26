function funcion_topnav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  const startButton = document.getElementById('start-btn')
  const nextButton = document.getElementById('next-btn')
  const questionContainerElement = document.getElementById('question-container')
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
  
  let shuffledQuestions, currentQuestionIndex
  let puntos=0
  
  startButton.addEventListener('click', startGame)
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
  
  function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }
  
  function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }
  
  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (selectedButton.dataset.correct){
        puntos = puntos+1
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      alert("Usted ha conseguido "+ puntos+ " puntos")
      puntos = 0  
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
  
  const questions = [
    {
      question: '¿Cuánto es 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: '¿Cuál de estas es una de mis cosas favoritas?',
      answers: [
        { text: 'Queen', correct: true },
        { text: 'David Bowie', correct: true },
        { text: 'El coronavirus', correct: false },
        { text: 'Arjona', correct: false }
      ]
    },
    {
      question: '¿Cuál es mi nombre?',
      answers: [
        { text: 'Santiago Bustos', correct: true },
        { text: 'Banti Sustos', correct: false },
        { text: 'Batman', correct: false },
        { text: 'My name is Jeff', correct: false }
      ]
    },
    {
      question: '¿De qué depende la aceleración? :^)',
      answers: [
        { text: 'Distancia, tiempo y velocidad inicial', correct: false },
        { text: 'Velocidad inicial, velocidad final y tiempo', correct: true },
        { text: 'Ambas son correctas', correct: false }
      ]
    },
    {
        question: '¿OwO?',
        answers: [
          { text: 'uwu', correct: true },
          { text: 'uwu', correct: true },
          { text: 'uwu', correct: true },
          { text: 'uwu', correct: true }
        ]
      }
  ]