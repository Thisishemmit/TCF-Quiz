const startPage = document.getElementById('starting-page')
const QApage = document.getElementById('q-a-page')
const resultsPage = document.getElementById('results-page')

function start() {
    [QApage, startPage].forEach(page => {
        page.classList.add('-translate-y-full')
        page.classList.remove('-translate-y-[200%]')
    });
    resultsPage.classList.remove('-translate-y-full')
    startGame();
}

function exit() {
    [QApage, startPage].forEach(page => {
        page.classList.remove('-translate-y-full', '-translate-y-[200%]')
    });
    resultsPage.classList.remove('-translate-y-full')
    resetGame();
}

function displayQuestionCard(historyItem) {
    const { type, question, answers, choice, time } = historyItem;

    // correct bg = linear top to bottom DCFFDA FFFFFF border 0D4F09
    // wrong bg = linear top to bottom FF8A8A FFFFFF border EF4444
    // timeout bg = linear top to bottom FFD6A5 FFFFFF border F59E0B
    //
    const cardHTML = `
        <div class="z-10  mb-4">

            <div class="relative w-full h-full rounded-xl z-10 border-2 p-6 border-[${type === 'correct' ? '#0D4F09' : type === 'wrong' ? '#EF4444' : '#F59E0B'}] bg-gradient-to-b from-[${type === 'correct' ? '#DCFFDA' : type === 'wrong' ? '#FF8A8A' : '#FFD6A5'}] to-white">
            <h3 class="font-medium text-xl mb-4">${question}</h3>
            <div class="grid grid-cols-2 gap-4">
                ${answers.map((answer, index) => `
                    <div class="relative p-4 rounded-xl ${getAnswerStyle(type, index, choice, answer.correct)}">
                        ${answer.text}
                    </div>
                `).join('')}
            </div>
            ${time ? `<div class="mt-4 text-right">Time: ${time}s</div>` : ''}
        </div>
        </div>
    `;

    return cardHTML;
}

function getAnswerStyle(type, index, choice, isCorrect) {
    if (type === 'correct' && index === parseInt(choice)) {
        return 'bg-[#8FCA8A] border-2 border-[#0D4F09]';
    } else if (type === 'wrong' && index === parseInt(choice)) {
        return 'bg-[#FF8A8A] border-2 border-[#0D4F09]';
    } else if (isCorrect) {
        return 'bg-[#8FCA8A] border-2 border-[#0D4F09]';
    } else {
        return 'bg-gray-200 border-2 border-[#0D4F09]';
    }
}

function getAnswerBackgroundStyle(type, index, choice, isCorrect) {
    if (type === 'correct' && index === parseInt(choice)) {
        return 'bg-[#2A9023]';
    } else if (type === 'wrong' && index === parseInt(choice)) {
        return 'bg-[#B22222]';
    } else if (isCorrect) {
        return 'bg-[#2A9023]';
    } else {
        return 'bg-gray-500';
    }
}

function displayResults() {
    resultsPage.classList.add('-translate-y-full');
    QApage.classList.remove('-translate-y-full');
    QApage.classList.add('-translate-y-[200%]');

    const history = JSON.parse(localStorage.getItem('history')) || [];
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `${Score + '/' + questions.length}`;

    const levelElement = document.getElementById('language-level');
    const level = calculateLevel(Score);
    levelElement.textContent = level;

    const summaryContainer = document.getElementById('questions-summary');
    summaryContainer.innerHTML = '';

    history.forEach(historyItem => {
        summaryContainer.innerHTML += displayQuestionCard(historyItem);
    });
}

function calculateLevel(score) {
    if (score >= 9) return 'C1';
    if (score >= 7) return 'B2';
    if (score >= 5) return 'B1';
    if (score >= 3) return 'A2';
    return 'A1';
}
