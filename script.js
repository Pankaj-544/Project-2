const questiones = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {Text: "Shark", correct: false},
            {Text: "Blue whale", correct: true},
            {Text: "Elephant", correct: false},
            {Text: "Lion", correct: false},
        ]

    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {Text: "Vatican city", correct: true},
            {Text: "Bhutan", correct: false},
            {Text: "Nepal", correct: false},
            {Text: "Shrilanka", correct: false},
        ]

    },
    {
        question: "What is the capital of France?",
        answers: [
            {Text: "Paris", correct: true},
            {Text: "Berlin", correct: false},
            {Text: "Madrid", correct: false},
            {Text: "London", correct: false},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            {Text: "Delhi", correct: true},
            {Text: "Mumbai", correct: false},
            {Text: "Bangalore", correct: false},
            {Text: "Kolkata", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    updateQuestion();
} 
function updateQuestion(){
    resetState();
    let currentQuestion = questiones [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}
function resetState(){
  nextButton.style.display = "none";  
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }

}
    
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorect = selectedBtn.dataset.correct === "true";
    if(isCorect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questiones.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questiones.length){
        updateQuestion();
    } else {
        showScore();
    }
     
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questiones.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});
startQuiz();
