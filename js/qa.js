let score = 0;
let level = 0;
let timer = 5;
let active = 0;
let currentInterval = null;
let currentTimeOut = null;
function press(element, color = true) {
    element.classList.add('top-1', 'left-1');
    if (color) {
        element.classList.add('bg-[#A3FF3A]');
    }
}
function release(element) {
    element.classList.remove('top-1', 'left-1', 'bg-[#A3FF3A]');
}
function setActive(element) {
    if (freezed) {
        return;
    }
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        release(btn);
    })
    press(element.querySelector('.answer-btn'));
    active = element.dataset.answer;
}
let freezed = false;
let currentQuestion = null;


function nextQuestion() {
    let { answers, question } = questions[level];
    const correctAnswer = answers.find(answer => answer.correct);
    answers = shuffle(answers);
    answers = answers.filter(answer => !answer.correct).slice(0, 3).concat(correctAnswer);
    answers = shuffle(answers);
    currentQuestion = {
        question,
        answers
    };
}

function displayQuestion() {
    let questionContainer = document.querySelector('.question');
    let answersContainer = document.querySelectorAll('.answer-container  span');
    questionContainer.textContent = currentQuestion.question;
    answersContainer.forEach((container, index) => {
        const answer = currentQuestion.answers[index];

        container.textContent = answer.text;
        container.parentNode.parentNode.dataset.answer = index;
    });

    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.classList.remove('bg-gray-200', 'bg-red-500', 'bg-green-200');
        btn.previousElementSibling.classList.remove('bg-gray-500', 'bg-red-800', 'bg-green-500');
    });
    startTimer();
}

function shuffle(array) {
    return array = array.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
}

function submit() {
    if (freezed) {
        return;
    }
    clearInterval(currentInterval);
    clearTimeout(currentTimeOut);
    if (active === null) return;
    if (currentQuestion.answers[active].correct) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
    level++;
}

function correctAnswer() {
    score++;
    freezed = true;

    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    const correctAnsIndex = answerBtns.findIndex(btn => btn.parentNode.dataset.answer === currentQuestion.answers.findIndex(answer => answer.correct).toString());
    answerBtns.filter(btn => btn.parentNode.dataset.answer !== active).forEach(btn => {
        if (btn.parentNode.dataset.answer === correctAnsIndex) {
            return;
        }
        btn.classList.add('bg-gray-200');
        btn.previousElementSibling.classList.add('bg-gray-500');
    });
    setTimeout(() => {
        answerBtns.forEach(btn => {
            press(btn, false);
        });
        setTimeout(() => {
            nextQuestion();
            displayQuestion();
            answerBtns.forEach(btn => {
                release(btn);
            })
            active = null;
            freezed = false;
        }, 500);
    }, 1000);
}

function wrongAnswer() {
    freezed = true;
    // logic to press all buttons then disaturate the wrong answers except the correct one which be released end disable clicking
    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    answerBtns.filter(btn => btn.parentNode.dataset.answer === active).forEach(btn => {
        btn.classList.add('bg-red-500');
        btn.previousElementSibling.classList.add('bg-red-800');
        release(btn);
    });
    answerBtns.filter(btn => btn.parentNode.dataset.answer !== active).forEach(btn => {
        btn.classList.add('bg-gray-200');
        btn.previousElementSibling.classList.add('bg-gray-500');
    });
    const correctAnsIndex = answerBtns.findIndex(btn => btn.parentNode.dataset.answer === currentQuestion.answers.findIndex(answer => answer.correct).toString());
    answerBtns[correctAnsIndex].classList.remove('bg-gray-200');
    answerBtns[correctAnsIndex].previousElementSibling.classList.remove('bg-gray-500');
    setTimeout(() => {
        answerBtns.forEach(btn => {
            press(btn, false);
        });
        setTimeout(() => {
            nextQuestion();
            displayQuestion();
            answerBtns.forEach(btn => {
                release(btn);
            })
            active = null;
            freezed = false;
        }, 500);
    }, 1000);
}

function timeReached() {
    freezed = true;
    clearInterval(currentInterval);
    clearTimeout(currentTimeOut);
    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    answerBtns.forEach(btn => {
        release(btn);
    });
    const correctAnsIndex = answerBtns.findIndex(btn => btn.parentNode.dataset.answer === currentQuestion.answers.findIndex(answer => answer.correct).toString());
    answerBtns[correctAnsIndex].classList.add('bg-green-200');
    answerBtns[correctAnsIndex].previousElementSibling.classList.add('bg-green-500');

    answerBtns.filter(btn => btn.parentNode.dataset.answer !== correctAnsIndex).forEach(btn => {
        btn.classList.add('bg-gray-200');
        btn.previousElementSibling.classList.add('bg-gray-500');
    });

    setTimeout(() => {
        answerBtns.forEach(btn => {
            press(btn, false);
        });
        setTimeout(() => {
            nextQuestion();
            displayQuestion();
            answerBtns.forEach(btn => {
                release(btn);
            })
            active = null;
            freezed = false;
        }, 500);
    }, 1000);
}

function startTimer() {
    timer = 5;
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = timer.toString() + 's';
    currentInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer.toString() + 's';
        if (timer === 0) {
            timeReached();
        }
    }, 1000);
}


function startGame() {
    nextQuestion();
    displayQuestion();
}
