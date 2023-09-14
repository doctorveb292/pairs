// // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
// let numbersArray = [];
// function createNumbersArray(count) {
// const arrayLenght = count;

// for (let i = 1; numbersArray.length < (arrayLenght * 2); ++i) {
//     numbersArray.push(i,i)
// }
// return numbersArray;
// };

// createNumbersArray(10);

// // // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

// function shuffle(arr) {
//     for (const index in arr) {
//         let secondIndex = Math.abs(Math.floor(Math.random() * (arr.length)));
//         let temp = arr[index];
//         arr[index] = arr[secondIndex];
//         arr[secondIndex] = temp;
//     }
//     return arr;
// }

// // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

(() => {

document.body.classList.add('body');

let numbersArray = [];
let firstCard = null;
let secondCard = null;


function inputCreate() {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');


    input.placeholder = 'Введите количество пар для игры(от 2 до 16)'
    button.textContent = 'Начать!'
    container.classList.add('container');
    form.classList.add('form');
    buttonWrapper.classList.add('buton-wrapper');
    button.classList.add('main-button');
    button.disabled = true;

    document.body.append(container);
    container.append(form);
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);


    input.addEventListener('input',() => {
        if(input.value !== "") {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });

    return {
        form,
        input,
        button,
    };
};

function startGame(count) {
    let arrayLenght = count;

    for (let i = 1; numbersArray.length < (arrayLenght * 2); ++i) {
            numbersArray.push(i,i)
    }

    for (const index in numbersArray) {
    let secondIndex = Math.abs(Math.floor(Math.random() * (numbersArray.length)));
    let temp = numbersArray[index];
    numbersArray[index] = numbersArray[secondIndex];
    numbersArray[secondIndex] = temp;
    }
    return numbersArray;
};


function createCard () {
    const gameContainer = document.createElement('div');
    const cardWrapper = document.createElement('div');
    const returnBtn = document.createElement('button');
    gameContainer.classList.add('game-container');
    gameContainer.id = 'gameContainer'
    returnBtn.classList.add('return-btn');
    cardWrapper.id = 'wrap';
    document.body.append(gameContainer);
    gameContainer.append(cardWrapper);
    gameContainer.append(returnBtn);
    returnBtn.id = 'returnBtn';
    returnBtn.textContent = 'Начать заново!';

    cardWrapper.classList.add('card-wrapper');
    for (let i = 0;i < numbersArray.length;++i) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = 'card';
        cardWrapper.append(card);
        card.textContent = numbersArray[i];
        card.dataset.number = numbersArray[i];
    };

    returnBtn.addEventListener('click', () => {
        inputCreateFunction.button.disabled = false;
        inputCreateFunction.input.disabled = false;
        document.body.querySelector('#gameContainer').remove();
    })
}

function inputCheck () {
    numbersArray = [];
    let cardList = document.querySelector('#wrap');

    if (!inputCreateFunction.input.value) {
          return;
    } else if(inputCreateFunction.input.value > 16 || inputCreateFunction.input.value < 2) {
        alert ("Введите число пар карт от 2 до 16!");
        startGame(4);
        createCard();
        inputCreateFunction.input.value = '';

        if (cardList !==null) {
            cardList.remove();
            document.body.querySelector('#returnBtn').remove();
            document.body.querySelector('#gameContainer').remove();
        }
        if (inputCreateFunction.input.value > 16 && inputCreateFunction.input.value < 2) {
            createCard();
        };
    } else {
        if (cardList !==null) {
            cardList.remove();
            document.body.querySelector('#returnBtn').remove();
            document.body.querySelector('#gameContainer').remove();
        } else {
        startGame(inputCreateFunction.input.value);
        createCard();

        inputCreateFunction.button.disabled = true;
        inputCreateFunction.input.disabled = true;
        inputCreateFunction.input.value = '';
        };
    };
}

function Game () {

    let cardInDom = document.body.querySelectorAll('#card');

    for (const card of cardInDom) {
        card.onclick = () => {

            if (card.classList.contains('open') || card.classList.contains('success')) {
                return
              };

            if (firstCard !== null && secondCard !== null) {
                firstCard.classList.remove('open');
                secondCard.classList.remove('open');
                firstCard = null;
                secondCard = null;
            }

            card.classList.add('open');

            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;
            }

            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.dataset.number;
                let secondCardNumber = secondCard.dataset.number;

                if(firstCardNumber === secondCardNumber) {
                    firstCard.classList.add('success');
                    secondCard.classList.add('success');
                }
            }
            if (numbersArray.length === document.querySelectorAll('.success').length) {
                setTimeout(function() {
                    alert("Отлично!Вы справились!!!");
                },400);
            }
        }
    }
};


let inputCreateFunction = inputCreate();

inputCreateFunction.form.addEventListener('submit', function(e) {
    e.preventDefault();
    inputCheck();
    Game();
});
})();
