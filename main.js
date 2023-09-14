(()=>{
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
    const timerWindow = document.createElement('div');
    const timerSelect = document.createElement('select');
    const timerText = document.createElement('span');
    
    input.placeholder = 'Введите количество пар для игры(от 2 до 14)'
    button.textContent = 'Начать!'
    container.classList.add('container');
    timerWindow.classList.add('timer-window');
    timerWindow.append(timerSelect);
    timerSelect.add(new Option (id = 10,'10'));
    timerSelect.add(new Option (id = 20,'20'));
    timerSelect.add(new Option (id = 30,'30'));
    timerSelect.add(new Option (id = 40,'40'));
    timerSelect.add(new Option (id = 50,'50'));
    timerSelect.add(new Option (id = 60,'60'));
    timerWindow.prepend(timerText);
    timerText.textContent = 'Выберите время игры(в секундах)';
    timerWindow.id = 'rocket';
    timerSelect.id = 'timerS';
    form.classList.add('form');
    buttonWrapper.classList.add('buton-wrapper');
    button.classList.add('main-button');
    button.disabled = true;
    document.body.append(container);
    container.append(form);
    container.append(timerWindow);
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
        location.reload();
    })
}
function inputCheck () {
    numbersArray = [];
    let cardList = document.querySelector('#wrap');
    if (!inputCreateFunction.input.value) {
          return;
    } else if(inputCreateFunction.input.value > 14 || inputCreateFunction.input.value < 2) {
        alert ("Введите число пар карт от 2 до 14!");
        startGame(4);
        createCard();
        inputCreateFunction.input.value = '';
        
        if (cardList !==null) {
            cardList.remove();
            document.body.querySelector('#returnBtn').remove();
            document.body.querySelector('#gameContainer').remove();
        }
        if (inputCreateFunction.input.value > 14 && inputCreateFunction.input.value < 2) {
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
    // обращаемся ко всем элементам card через quetrySelector,который делает список всех элементов
    // подходящих под условие поиска
    let cardInDom = document.body.querySelectorAll('#card');
    // далее,путем перебора по элементам списка(это нужно,тк у списка нет методов click И тд,
    // поэтому мы перебираем элементы и для выюранного элемента из списка делаем событие click)
    for (const card of cardInDom) {
        card.onclick = () => {
            // делаем так,чтобы при двойном нажатии на открытую или успешную карточку,ничего не происходило
            if (card.classList.contains('open') || card.classList.contains('success')) {
                return
              };
            // при событии click мы делем проверку на открытость карточки: если обе переменные
            // first/second card не равны null-не пустые,значит им присвоен класс Open.убираем данный класс
            // и обнуляем значение пересенной.Таким образом реализуется открытие 2 карт и при 3 клике
            // два предыдущие карты закроются.
            if (firstCard !== null && secondCard !== null) {
                firstCard.classList.remove('open');
                secondCard.classList.remove('open');
                firstCard = null;
                secondCard = null;
            }
            // при клике добавляется класс
            card.classList.add('open');
            // добавляем в переменные значение карточек.Изначально,переменные равны 0.Пр первом клике в переменную
            // записывается 1 занчение.Когда переменная first card занята,то ппрри повторном клике значение карточки
            // записывается в переменную second сard.
            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;
            }
            // идет процесс сравнения карт.Если обе переменные не равны 0,далее мы объявляем 2 новые 
            // переменные со значаением индексов карт,который мы присвоили картам,при их создании.
            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.dataset.number;
                let secondCardNumber = secondCard.dataset.number;
                // если индексы совпали,то добавляем для 2 карт доп.класс успеха)) При этом,класс open остается,но success
                // перебивает стили open и далее,при следуюзем нажатии,удаляется стиль open,но успех остается и карты остаются    
                // открытыми             
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
    let timer;
    let x = document.getElementById('timerS').value;
    function Countdown () {
        document.getElementById('rocket').textContent = 'Осталось:\n' + x + '\nсекунд';
            --x;
            if( x < 0) {
                clearTimeout(timer);
                document.body.querySelector('#rocket').textContent = 'Время вышло! Вы проиграли =(';
             } else {
                timer = setTimeout(Countdown,900);
             }
     }
    Countdown();
});
})();
            
