const startPage = document.getElementById('starting-page')
const QApage = document.getElementById('q-a-page')


function start() {
    [QApage, startPage].forEach(page => {
        page.classList.add('-translate-y-full')
    });
    startGame();
}

function exit() {
    [QApage, startPage].forEach(page => {
        page.classList.remove('-translate-y-full')
    });
}

function displayResults() {
    [QApage, startPage].forEach(page => {
        page.classList.add('-translate-y-full')
    });
    displayResults();
}
