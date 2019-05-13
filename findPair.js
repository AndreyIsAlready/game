let start = document.querySelector('#start');
document.querySelector('#winner').style.display = 'none'
start.addEventListener('click', startGame)
let newGame = document.querySelector('#theEnd');

newGame.addEventListener('click',GoNewGame)

function GoNewGame(){
    let divGame = document.querySelector('#game');
    let timer = divGame.querySelector('#timer');
    let tds = divGame.querySelectorAll('td');
    timer.innerHTML = "00:00.000"
    document.querySelector('#winner').style.display = 'none'
    start.disabled = false;
    for (let td of tds) {
        td.style.background = 'white';
    }
}







function startGame() {

    let divGame = document.querySelector('#game');
    let tds = divGame.querySelectorAll('td');
    let timer = divGame.querySelector('#timer');
    start.disabled = true;
    timerGame();

    let colors = ['1', 'red', 'red', 'green', 'green', 'blue', 'blue', 'black', 'black',
        'yellow', 'yellow', 'hotpink', 'hotpink', 'indigo', 'indigo', 'teal', 'teal']

    let obj = createObj()
    let arrTd = [];

    for (let td of tds) {
        td.classList.add('active')
        td.addEventListener('click', clickMode)
    }

    function clickMode() {
        this.style.background = obj[this.innerHTML];
        arrTd.push(this)
        matchTd(arrTd)
        if (arrTd.length == 2 &&
            arrTd[0].style.background != arrTd[1].style.background) {
            notMatch();
        } else if (arrTd.length == 2 &&
            arrTd[0].style.background == arrTd[1].style.background) {
            getMatch();
        }
    }


    function getMatch() {
        for (let td of tds) {
            td.removeEventListener('click', clickMode)
        }
        arrTd[0].classList.remove('active')
        arrTd[1].classList.remove('active')
        for (let td of tds) {
            if (td.classList.contains('active')) {
                td.addEventListener('click', clickMode);
            }
        }
        arrTd = []
        Win();
    }

    function notMatch() {
        for (let td of tds) {
            td.removeEventListener('click', clickMode)
        }
        let id = setTimeout(function () {
            arrTd[0].style.background = 'white';
            arrTd[1].style.background = 'white';
            arrTd = []
            for (let td of tds) {
                if (td.classList.contains('active')) {
                    td.addEventListener('click', clickMode);
                }
            }
            clearTimeout(id)
        }, 300)
    }

    function createObj() {
        let obj = {}
        let set = new Set();

        while (set.size != 16) {
            set.add(Math.ceil(Math.random() * 16))
        }

        newObj(set, obj)
        return obj
    }

    function newObj(arr, obj) {
        let i = 0;
        arr.forEach((elem) => {
            i++
            obj[i] = colors[elem]
        })
    }

    function matchTd(arr) {
        checkEqual(arr)
        if (arr.length > 2) {
            arr.splice(2)
        }
    }
    function checkEqual(arr) {
        if (arr[0] === arr[1]) {
            arr.splice(1)
        }
    }
    function Win() {
        if (divGame.querySelectorAll('.active').length == 0) {
            return true;
        }

    }

    function timerGame() {
        timer.innerHTML = "00:00.000"
        let milliseconds;
        let seconds = 0;
        let minets = 0;
        let time = new Date().getTime();
        let id = setInterval(function () {
            milliseconds = new Date().getTime() - time;
            if (milliseconds > 999) {
                time = new Date().getTime();
                seconds++
            }
            if (seconds >= 60) {
                minets++
                seconds = 0;
            }
            if (Win()) {
                clearInterval(id);
                modalWindow();
            }
            timer.innerHTML = getZero(minets) + ':' + getZero(seconds) + '.' + milliseconds
        }, 1)

    }
    function getZero(num) {
        if (num <= 9) {
            return '0' + num
        } else {
            return num
        }
    }
function modalWindow(){
        document.querySelector('#winner').style.display = 'grid'
        document.querySelector('#yourTime').innerHTML = 'Затраченое время: '+timer.innerHTML;
}
}

