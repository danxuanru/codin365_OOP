// MVC   model view controller
//       data   UI    actions

// 牌組52張牌
// 以圖案區分  13張牌  A 2 3 4 5 6 7 8 9 10 J Q K

// data-*
// event.target.dataset.index

// Goal
// 26 pairs  1 pairs get 10 points  26*10 = 260

/**
 * Card States  (ENUM)
 */
const GAME_STATES = {
  FirstCardAwait: 'FirstCardAwait',
  SecondCardAwait: 'SecondCardAwait',
  CardMatched: 'CardMatched',
  CardMatchFailed: 'CardMatchFailed',
  GameFinished: 'GameFinished'
};

const cardSymbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg', //黑桃
  'https://image.flaticon.com/icons/svg/105/105220.svg', //紅心
  'https://image.flaticon.com/icons/svg/105/105212.svg', //方塊
  'https://image.flaticon.com/icons/svg/105/105219.svg' //梅花
];

/**
 * reavealCards: 暫存牌組
 */
const model = {
  score: 0,
  playTimes: 0,
  revealCards: [],
  currentCardState: GAME_STATES.FirstCardAwait,
  /**
   * 只確認數字，花色不比較
   * @returns {boolean} Cards is matched or not
   */
  isRevealCardsMatched() {
    return (
      this.revealCards[0].dataset.index % 13 ===
      this.revealCards[1].dataset.index % 13
    );
  }
};

const view = {
  /**
   * @param {number[]} indexArray
   */
  renderCards(indexArray) {
    const cardRootEl = document.querySelector('#cards');
    // [0,1,2,3,.....]
    // ['<div data-index="..."></div>',.....,....]
    // '<div data-index="..."></div><div data-index="..."></div>'
    cardRootEl.innerHTML = indexArray
      .map((index) => this.getCardElement(index))
      .join('');
  },

  /**
   * @param {number} score
   */
  renderScore(score) {
    document.querySelector('.score-item').innerHTML = score;
  },

  /**
   * @param {number} times
   */
  renderPlayedTimes(times) {
    document.querySelector('.tried-item').innerHTML = times;
  },

  /**
   * @param {number} index
   */
  getCardElement(index) {
    return `<div data-index="${index}" class="card back"></div>`;
  },

  /**
   * @param {number} index
   */
  getCardContent(index) {
    const number = this.transformToNumberOrSymbol((index % 13) + 1);
    const symbol = cardSymbols[Math.floor(index / 13)];
    return `
      <p>${number}</p>
      <img src="${symbol}" alt="card-symbol">
      <p>${number}</p>
    `;
  },

  /**
   *
   * @param {DOMTokenList[]} cards
   */
  flipCard(cards) {
    cards.forEach((card) => {
      if (card.classList.contains('back')) {
        card.classList.remove('back');
        card.innerHTML = this.getCardContent(Number(card.dataset.index));
        return;
      }
      card.classList.add('back');
      card.innerHTML = '';
    });
  },

  /**
   * @param {DOMTokenList[]} cards
   */
  pairCard(cards) {
    cards.forEach((card) => {
      card.classList.add('paired');
    });
  },

  /**
   * @param {DOMTokenList[]} cards
   */
  appendWrongAnimation(cards) {
    cards.forEach((card) => {
      card.classList.add('wrong');
      card.addEventListener(
        'animationend',
        (event) => {
          event.target.classList.remove('wrong');
        },
        { once: true }
      );
    });
  },

  /**
   * Transform number to number or symbol
   * @param {number} num
   */
  transformToNumberOrSymbol(num) {
    switch (num) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      default:
        return num;
    }
  },

  gameFinished() {
    const divEl = document.createElement('div');
    divEl.classList.add('completed');
    divEl.innerHTML = `
      <p>Complete!</p>
      <p>Your total score: ${model.score}</p>
      <p>You've tried ${model.playTimes} times</p>
    `;
    const headerEl = document.querySelector('#header');
    headerEl.before(divEl);
  }
};

const controller = {
  generateCards() {
    view.renderCards(util.getRandomNumberArray(52));
    view.renderScore(model.score);
    view.renderPlayedTimes(model.playTimes);
  },
  addEventListenerToCards() {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', (event) => {
        this.dispatchCardAction(event.target);
      });
    });
  },
  dispatchCardAction(card) {
    if (!card.classList.contains('back')) return;

    switch (model.currentCardState) {
      // fisrt card flips
      case GAME_STATES.FirstCardAwait:
        view.flipCard([card]);
        model.revealCards.push(card);
        model.currentCardState = GAME_STATES.SecondCardAwait;
        break;
      // second card flips
      case GAME_STATES.SecondCardAwait:
        view.renderPlayedTimes(++model.playTimes);
        view.flipCard([card]);
        model.revealCards.push(card);
        if (model.isRevealCardsMatched()) {
          view.renderScore((model.score += 10));
          model.currentCardState = GAME_STATES.CardMatched;
          view.pairCard(model.revealCards);
          model.revealCards = [];
          model.currentCardState = GAME_STATES.FirstCardAwait;
          if (model.score === 260) {
            view.gameFinished();
            return;
          }
        } else {
          model.currentCardState = GAME_STATES.CardMatchFailed;
          view.appendWrongAnimation(model.revealCards);
          setTimeout(() => {
            view.flipCard(model.revealCards);
            model.revealCards = [];
            model.currentCardState = GAME_STATES.FirstCardAwait;
          }, 1000);
        }
        break;
    }
  }
};

const util = {
  /**
   *
   * @param {number} num length of Array
   * @returns Random Array
   */
  getRandomNumberArray(num) {
    const number = Array.from(Array(num).keys());
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index]
      ];
    }
    return number;
  }
};

controller.generateCards();
controller.addEventListenerToCards();
