const state = {
    players: [],
    questions: [
        {
            id: '2DDfmB9EwRqF8kpNQKvNIk',
            song: 'Norteña Del Sur',
            artist: 'Nortec: Bostich + Fussible',
            listener: 'test1',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b27319e01b3b6855543502b4fdcf'
        },
        {
            id: '3uhBi8rrhEHUTE3H2l36Ng',
            song: 'Angelito Heart - Demo Ely Guerra; Angelito Heart (Demo Ely Guera)',
            artist: 'Ely Guerra',
            listener: 'test2',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b2737572e94d9de78539c8895747'
        },
        {
            id: '7hrDA2n8BVGLyHra0rBiFd',
            song: 'Younger - Kygo Remix',
            artist: 'Kygo, Seinabo Sey',
            listener: 'test2',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b273a62ff9100ed51cd84cf01b45'
        },
        {
            id: '0KJ2inLtXARJn3sM6P03DO',
            song: 'Pervert Pop Song (Castígame)',
            artist: 'Plastilina Mosh',
            listener: 'test3',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b273e46c351882fc9ff1c6b3558b'
        },
        {
            id: '7680VIj8zmkPd3i8En1Xbw',
            song: 'Brasilia',
            artist: 'Maple Syrup, Zmeyev',
            listener: 'test4',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b2733487f40ea9e26e9ef9bd41a0'
        },
        {
            id: '2wmAPn2P1eTzaA8VXWuMBj',
            song: 'Girl Crush',
            artist: 'CATBEAR',
            listener: 'test4',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b2737fdda05e3acf29d9c7988cca'
        },
        {
            id: '3fk5fBFB27GbWGATdBpOgr',
            song: 'Carmesí',
            artist: 'Vicente Garcia',
            listener: 'test3',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b273d736613f902425dbf608194d'
        },
        {
            id: '4WfV1CNg91SBp8oG0VY0VB',
            song: 'Crush',
            artist: 'Cigarettes After Sex',
            listener: 'test4',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b27327e05a05dda5665ce3f8f9f0'
        },
        {
            id: '7KbF6AdprOXEEHlsq11Z6d',
            song: '11 PM',
            artist: 'Maluma',
            listener: 'test2',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b273073bc2070f7fa02b2a6bda64'
        },
        {
            id: '4k1QhFBpm7iCYY103ByKOo',
            song: 'Love and War',
            artist: 'CATBEAR',
            listener: 'test2',
            options: [ 'test2', 'test3', 'test1', 'test4' ],
            album: 'https://i.scdn.co/image/ab67616d0000b2738652ebf5243763706dfb0927'
        },
    ],
    currentPlayer: '',
    correctAnswers: 0
};

function changePhase(current, next) {
    console.dir(state);
    document.getElementById(current).classList.value = 'hidden';
    document.getElementById(next).classList.remove();
    document.getElementById(next).classList.value = 'visible';
}

function showPlayerName () {
    changePhase('session', 'player');
}

function onStartSession() {
    state.sessionId = 1;
    showPlayerName();
}

function onEnterSession(e) {
    e.preventDefault();
    state.sessionId = document.getElementById('sessionId').value;
    showPlayerName();
}

function onEnterPlayerName(e) {
    e.preventDefault();
    const player = document.getElementById('playerName').value;
    state.players.push(player);
    state.currentPlayer = player;

    changePhase('player', 'music-provider');
}

function printPlayersList() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    state.players.forEach(player => {
        playersList.innerHTML += '<li>' + player + '</li>';
    });
}

function showReception() {
    printPlayersList();
    changePhase('music-provider', 'reception');
}

function selectMusicProvider(provider) {
    state.provider = provider;
    showReception();
}

function copySessionLink() {
    state.players.push(`guest${state.players.length + 1}`);
    state.round = 1;
    state.currentQuestion = 0;
    printPlayersList();
    document.getElementById('start-button').classList.remove();
    document.getElementById('start-button').classList.value = 'visible';
}

function printQuestion(question) {
    const albumImage = document.getElementById('album');
    const titleLabel = document.getElementById('title');
    const singerLabel = document.getElementById('singer');
    const optionsList = document.getElementById('options');

    albumImage.src = question.album;
    titleLabel.innerHTML = question.song;
    singerLabel.innerHTML = question.artist;
    optionsList.innerHTML = question.options.reduce((acc, optionValue, index) => {
        const optionNumber = index + 1;
        let status = 'correct';
        if ( optionValue !== question.listener) {
            status = 'wrong';
        }
        acc += `<div class="row">
            <div id="status-option${optionNumber}" class="icon-${status} hidden">
                <span class="hidden">${status}</span>
            </div>
            <input type="radio" name="option${optionNumber}" value="${optionValue}">
            <label for="option${optionNumber}">${optionValue}</label>
        </div>`;
        return acc;
    }, '');
    document.getElementById('instructions').classList.value = 'hidden';
} 

function startGame() {
    printQuestion(state.questions[state.currentQuestion]);
    changePhase('reception', 'question');
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[type="radio"]:checked');
    if (selectedAnswer) {
        const answerIndicator = document.getElementById(`status-${selectedAnswer.getAttribute('name')}`);
        answerIndicator.classList.remove('hidden');
        const userAnswer = selectedAnswer.getAttribute('value');
        if ( userAnswer == state.questions[state.currentQuestion].listener) {
            state.correctAnswers++;
        }
        setTimeout(() => {
            state.currentQuestion++;
            printQuestion(state.questions[state.currentQuestion]);
        }, 10000);
    } else {
        document.getElementById('instructions').classList.remove();
    }
}
