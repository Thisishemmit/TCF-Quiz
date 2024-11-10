let Score = 0;
let Level = 0;
let Active = 0;
let Timer = 0;
let CurrentInterval = null;
let CurrentTimeOut = null;
let CanGoNext = false;
let Freezed = false;
let CurrentQuestion = null
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
    if (Freezed) {
        return;
    }
    clearInterval(CurrentInterval);
    clearTimeout(CurrentTimeOut);
    press(element.querySelector('.answer-btn'));
    Active = element.dataset.answer;
    if (CurrentQuestion.answers[Active].correct) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
    Freezed = true;
    CanGoNext = true;
}


function nextQuestion() {
    let { answers, question } = questions[Level];
    const correctAnswer = answers.find(answer => answer.correct);
    answers = shuffle(answers);
    answers = answers.filter(answer => !answer.correct).slice(0, 3).concat(correctAnswer);
    answers = shuffle(answers);
    CurrentQuestion = {
        question,
        answers
    };
}

function displayQuestion() {
    let questionContainer = document.querySelector('.question');
    let answersContainer = document.querySelectorAll('.answer-container  span');
    let questionCounter = document.querySelector('.question-counter');
    questionCounter.textContent = `Question ${Level + 1}/${questions.length}`;
    questionContainer.textContent = CurrentQuestion.question;
    answersContainer.forEach((container, index) => {
        const answer = CurrentQuestion.answers[index];

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
    if (!CanGoNext) {
        return;
    }
    Level++;
    if (Level === questions.length) {
        endGame();
        return;
    }
    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    answerBtns.forEach(btn => {
        press(btn, false);
    });
    setTimeout(() => {
        nextQuestion();
        displayQuestion();
        answerBtns.forEach(btn => {
            release(btn);
        })
        Freezed = false;
        Active = null;
    }, 500);
    CanGoNext = false;
}

function correctAnswer() {
    Score++;
    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    const correctAnsIndex = answerBtns.findIndex(btn => btn.parentNode.dataset.answer === CurrentQuestion.answers.findIndex(answer => answer.correct).toString());
    answerBtns.filter(btn => btn.parentNode.dataset.answer !== Active).forEach(btn => {
        if (btn.parentNode.dataset.answer === correctAnsIndex) {
            return;
        }
        btn.classList.add('bg-gray-200');
        btn.previousElementSibling.classList.add('bg-gray-500');
    });
    addToHistory('correct', CurrentQuestion.question, CurrentQuestion.answers, Active, Timer);
}

function wrongAnswer() {

    const answerBtns = [...document.querySelectorAll('.answer-btn')];

    answerBtns.forEach(btn => {
        if (btn.parentNode.dataset.answer === Active) {
            btn.classList.add('bg-red-500');
            btn.previousElementSibling.classList.add('bg-red-800');
        } else {
            btn.classList.add('bg-gray-200');
            btn.previousElementSibling.classList.add('bg-gray-500');
        }
    });
    const correctAnsIndex = answerBtns
        .findIndex(btn => btn.parentNode.dataset.answer === CurrentQuestion.answers
            .findIndex(answer => answer.correct)
            .toString()
        );
    answerBtns[correctAnsIndex].classList.remove('bg-gray-200');
    answerBtns[correctAnsIndex].previousElementSibling.classList.remove('bg-gray-500');
    addToHistory('wrong', CurrentQuestion.question, CurrentQuestion.answers, Active, null);
}

function timeReached() {
    Freezed = true;
    clearInterval(CurrentInterval);
    clearTimeout(CurrentTimeOut);
    const answerBtns = [...document.querySelectorAll('.answer-btn')];
    const correctAnsIndex = answerBtns
        .findIndex(btn => btn.parentNode.dataset.answer === CurrentQuestion.answers
            .findIndex(answer => answer.correct)
            .toString()
        );
    answerBtns[correctAnsIndex].classList.add('bg-green-200');
    answerBtns[correctAnsIndex].previousElementSibling.classList.add('bg-green-500');

    answerBtns.forEach(btn => {
        if (btn.parentNode.dataset.answer === correctAnsIndex) {
            return;
        }
        btn.classList.add('bg-gray-200');
        btn.previousElementSibling.classList.add('bg-gray-500');
    });
    addToHistory('timeout', CurrentQuestion.question, CurrentQuestion.answers, null, null);
    CanGoNext = true;
}

function startTimer() {
    Timer = 5;
    const TimerElement = document.querySelector('.timer');
    TimerElement.textContent = Timer.toString() + 's';
    CurrentInterval = setInterval(() => {
        Timer--;
        TimerElement.textContent = Timer.toString() + 's';
        if (Timer === 0) {
            timeReached();
        }
    }, 1000);
}

function startGame() {
    nextQuestion();
    displayQuestion();
}

function endGame() {
    displayResults();
}
function resetGame() {
    Score = 0;
    Level = 0;
    Active = 0;
    Timer = 0;
    CurrentInterval = null;
    CurrentTimeOut = null;
    CanGoNext = false;
    Freezed = false;
    CurrentQuestion = null;
    localStorage.setItem('history', JSON.stringify([]));
    startGame();
}
function addToHistory(type, question, answers, choice, time) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({
        type,
        question,
        answers,
        choice,
        time
    });
    localStorage.setItem('history', JSON.stringify(history));
}

function printResults() {
    const originalContent = document.body.innerHTML
    const classesToRemove = ['header']
    const idsToRemove = ['q-a-page', 'starting-page', 'download-btn']
    classesToRemove.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`)
        elements.forEach(element => {
            element.remove()
        })
    })
    document.body.querySelectorAll('*').forEach(element => {
        if (idsToRemove.includes(element.id)) {
            element.remove()
        }
        if (element.classList.contains('download-btn')) {
            element.remove()
        }
    })

    document.body.querySelector('#results-page').classList.remove('h-screen', "fixed", "-translate-y-full")
    console.log(document.body)

    window.print()
    document.body.innerHTML = originalContent
}


