window.addEventListener('load', () => {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userChoiceElement = document.querySelector('.user-choice');
    const scoreCountElement = document.querySelector('.score-count');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspoke', 'spokescissors',
            'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock', 'rockscissors'];
    let currentScore = null;

    retrieveScoreFromLocalStorage();
    
    document.querySelectorAll('.user-choice .game-card').forEach(item => {
        item.addEventListener('click', (event) => {
            startGame();
        });
    });

    resultElement.querySelector('button').addEventListener('click', tryAgain);

    function startGame() {
        const userSelectedClassName = userChoice(event.target);
        const computerSelectedClassName = computerChoice();
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearElementBeforeAppend();
        buildChoiceElement(true, userSelectedClassName);
        buildChoiceElement(false, computerSelectedClassName);
        calculateWinner(userSelectedClassName, computerSelectedClassName);
    }

    function userChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    function computerChoice() {
        const compChoice = Math.floor(Math.random() * 5);
        return actions[compChoice];
    }

    function clearElementBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }

    function buildChoiceElement(userElement, className) {
        const el = document.createElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="/images/icon-${className}.svg" alt="">`;
        if (userElement) {
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
        resultElement.classList.add('hidden');
    }

    function calculateWinner(user, comp) {
        resultElement.classList.remove('hidden');
        if (user === comp) {
            resultTitleElement.innerText = 'Tie';
        } else if (userWins(user + comp)) {
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    };

    function userWins(resultConcatenated) {
        return userWinResults.some(item => item === resultConcatenated);
    }

    function calculateScore(roundScore) {
        currentScore += roundScore;
        updateScoreBoard();
    }

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    function retrieveScoreFromLocalStorage() {
        const score = window.localStorage.getItem('gameScore') || 0;
        currentScore = +score;
        updateScoreBoard(score);
    }


    // work with modal
    const rulesButtonElement = document.querySelector('.rules-btn');
    const modalBgElement = document.querySelector('.modal-bg');
    const modalElement = document.querySelector('.modal');

    rulesButtonElement.addEventListener('click', () => {
        modalBgElement.classList.add('active');
        modalElement.classList.add('active');
    });

    modalBgElement.addEventListener('click', (event) => {
        if (event.target === modalBgElement) {
            hideModal();
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal() {
        modalBgElement.classList.remove('active');
        modalElement.classList.remove('active');
    }

    
    
});