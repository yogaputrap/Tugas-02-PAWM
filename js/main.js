let startBtn = document.querySelector(".start-btn"),
instructionCard = document.querySelector(".instruction"),
instructionExit = document.querySelectorAll(".instruction button")[0],
startQuizBtn = document.querySelectorAll(".instruction button")[1],
wrapper = document.querySelector(".wrapper"),
nxtBtn = document.querySelector(".btn button"),
resultCard = document.querySelector(".result-card"),
time = document.querySelectorAll(".Timer p")[1],
progressBar = document.querySelector(".inner"),
questionEl = document.querySelector(".question-container"),
answerContainer = document.querySelector(".option-container"),
currentQuestionNum = document.querySelector(".current-question"),
totalQuestion = document.querySelector(".total-question"),
totalScore = document.querySelector(".total-score .value"),
yourScore = document.querySelector(".user-score .value"),
unattempted = document.querySelector(".unattempted .value"),
attempted = document.querySelector(".attempted .value"),
wrong = document.querySelector(".wrong .value"),
replayQuiz = document.querySelectorAll(".score-btn button")[0]
exitQuiz = document.querySelectorAll(".score-btn button")[1];
let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;

replayQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  wrapper.style.transform = "scale(1)"
  wrapper.style.width = "100%"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
  startQuiz();
})
exitQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
    startBtn.style.transform = "scale(1)"
    startBtn.style.width = "100%"
})

startBtn.addEventListener("click",()=>{
  instructionCard.style.transform="scale(1)"
  instructionCard.style.width="100%"
  instructionCard.style.opacity="1"
  startBtn.style.transform="scale(0)"
  startBtn.style.width="0"
})

instructionExit.addEventListener("click",()=>{
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startBtn.style.transform = "scale(1)"
  startBtn.style.width = "100%"
})

startQuizBtn.addEventListener("click",()=>{
  
  wrapper.style.transform="scale(1)"
  wrapper.style.width="100%"
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startQuiz()
})

const questions = [  
  {    question: "Baterai dapat menghasilkan arus listrik karena memiliki dua elektrode yang terdiri atas logam",    options: ["Zn sebagai anode dan batang karbon sebagai katode", "Zn sebagai katode dan batang karbon sebagai anode", "batang karbon sebagai anode dan zn sebagai katode", "batang karbon sebagai katode dan Zn sebagai anode"],
    answer: "0"
  },
  {
    question: "Elektrode di mana reaksi oksidasi terjadi disebut",
    options: ["anode", "katode", "anion", "kation"],
    answer: "0"
  },
  {
    question: "Apakah yang dimaksud dengan sel volta?",
    options: ["Suatu sel elektrokimia yang diberikan sumber arus untuk menghasilkan suatu reaksi kimia", "Suatu sel yang dapat mengalami reaksi reduksi/oksidasi dan menghasilkan arus listrik", "Suatu sel yang dapat menghasilkan arus listrik dan reaksi kimia secara bersama-sama", "Suatu sistem yang tidak terjadi apa-apa tanpa adanya arus listrik"],
    answer: "1"
  },
  {
    question: "Pernyataan berikut yang benar tentang sel volta adalah",
    options: ["sel volta mengubah energi listrik menjadi reaksi kimia", "pada anoda terjadi reaksi reduksi", "elektron mengalir melalui jembatan garam", "katoda merupakan kutub positif"],
    answer: "3"
  },
  {
    question: "Fungsi jembatan garam adalah",
    options: ["Membuat sel volta tidak bekerja", "Memberi efek elektrolit pada sel volta", "Menstabilkan muatan yang terdapat katoda dan anoda", "Menetralkan sel volta"],
    answer: "2"
  },
 
];

function startQuiz() {
    // Display the first question and its options
    displayQuestion(currentQuestion);

    // Set the timer to 30 seconds at the start of the quiz
    time.innerHTML = "30";

    // Start the timer
    timer = setInterval(updateTimer, 1000);

    // Update the progress bar
    updateProgress();
}

function displayQuestion(questionIndex) {
  updateProgress()
    // Get the question and options from the questions array
    let question = questions[questionIndex].question;
    let options = questions[questionIndex].options;

    // Display the question and options in their respective containers
    questionEl.innerHTML = question;

    for (let i = 0; i < options.length; i++) {
        let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`
        
        answerContainer.insertAdjacentHTML("beforeend",option)
    }
}

function checkAnswer(selectedIndex) {
    // Get the selected answer from the user
    attemptQuestion++;
    answerContainer.style.pointerEvents="none"
    clearInterval(timer);
    let selectedAnswer = questions[currentQuestion].options[selectedIndex];

    // Get the correct answer from the questions array
    let correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];

    // Compare the selected answer to the correct answer
    if (selectedAnswer === correctAnswer) {
      score++;
     setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#37BB1169"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "green"
     },100)

        userAnswers[currentQuestion] = selectedIndex;

        // Display the correct answer and highlight it in green
        
    } else {
      wrongQuestion++;
       setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#B6141469"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "red"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor="#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color="#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor="green"
     },100)
    }
}

function nextQuestion() {
  // Check if the user has answered all questions
  answerContainer.style.pointerEvents = "initial";
  time.innerHTML = "30";  // Reset timer ke 30 detik untuk soal berikutnya
  updateProgress();
  clearInterval(timer);  // Hentikan timer yang lama
  timer = setInterval(updateTimer, 1000);  // Mulai timer baru

  answerContainer.innerHTML = "";  // Kosongkan pilihan jawaban

  if (currentQuestion === questions.length - 1) {
      resultCard.style.width = "300px";
      resultCard.style.transform = "scale(1)";
      totalScore.innerHTML = questions.length;
      yourScore.innerHTML = score;
      attempted.innerHTML = attemptQuestion;
      unattempted.innerHTML = unattemptedQuestion;
      wrong.innerHTML = wrongQuestion;
      wrapper.style.width = "0";
      wrapper.style.transform = "scale(0)";
      endQuiz();
  } else {
      // If there are more questions, update the currentQuestion variable and display the next question and its options
      currentQuestion++;
      currentQuestionNum.innerHTML = currentQuestion + 1;
      displayQuestion(currentQuestion);
  }
}

function updateTimer() {
  // Decrement the timer by 1 second
  let remainingTime = parseInt(time.innerHTML) - 1;

  // Update the timer display
  time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

  // Update the progress bar
  
  // If the timer reaches 0, end the quiz
  if (remainingTime === 0) {
      unattemptedQuestion++;
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor = "#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color = "#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor = "green"
      answerContainer.style.pointerEvents="none"
      endQuiz();
  }
}

function updateProgress() {
 progressBar.style.width = (currentQuestion + 1)/questions.length * 100 + "%";
}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);
    
    // Hide the question and option containers
}

nxtBtn.addEventListener("click",nextQuestion);
totalQuestion.innerHTML = questions.length
currentQuestionNum.innerHTML=currentQuestion + 1