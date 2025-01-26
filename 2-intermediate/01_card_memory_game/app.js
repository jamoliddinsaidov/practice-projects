// global selectors and variables
const statsContainer = document.querySelector('.stats-container');
const triesCounterElement = statsContainer.querySelector('.tries span');
const timeElement = statsContainer.querySelector('.time');

const mainGameContainer = document.querySelector('.main-game-container');
const congratsContaier = mainGameContainer.querySelector('.congrats-container');
const settingsContainer = mainGameContainer.querySelector('.settings');
const startButton = settingsContainer.querySelector('.start-button');

const cardsState = new Map();
let timeCounter = 0;
let timerId = null;

// functions
function main() {
  handleStartButton();
}

function handleStartButton() {
  startButton.addEventListener('click', () => {
    hideSettingsContainer();
    showStatsContainer();
    prepareRestartButtons();
    startGame();
  });
}

function hideSettingsContainer() {
  settingsContainer.classList.add('hidden');
}

function showStatsContainer() {
  statsContainer.classList.remove('hidden');
}

function prepareRestartButtons() {
  const restartBtn = statsContainer.querySelector('.restart');
  restartBtn.addEventListener('click', restartGame);

  const finalRestartBtn = congratsContaier.querySelector('.final-restart');
  finalRestartBtn.addEventListener('click', () => {
    congratsContaier.classList.add('hidden');
    restartGame();
  });
}

function startGame() {
  startTimer();
  generateCardsState();
  generateCards();
}

function restartGame() {
  cardsState.clear();
  timeCounter = 0;

  removeCardsContainer();
  clearInterval(timerId);
  resetTriesCounter();
  startGame();
}

function startTimer() {
  timeCounter = 0;
  updateTimerCounter();

  timerId = setInterval(() => {
    timeCounter += 1;
    updateTimerCounter();
  }, 1000);
}

function generateCardsState() {
  const randomizedEmojis = generateRandomizedEmojis();
  randomizedEmojis.forEach((emoji) => {
    const id = Math.random().toString();
    cardsState.set(id, {
      isMatched: false,
      isClickable: true,
      id,
      emoji,
    });
  });
}

function generateRandomizedEmojis() {
  const emojis = ['🐒', '🐉', '🦉', '🐩', '🦧', '🦌', '🦦', '🐧'];
  return [...emojis, ...emojis].sort(() => {
    const a = Math.random().toString().slice(4, 8);
    const b = Math.random().toString().slice(5, 9);
    return a - b;
  });
}

function generateCards() {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container', 'grid', 'grid-cols-4', 'gap-4');

  cardsState.forEach((cardState) => {
    const emojiElement = createEmojiElement(cardState);
    const cardElement = createCardElement(cardState.id, emojiElement);

    cardsContainer.append(cardElement);
  });

  mainGameContainer.append(cardsContainer);
}

function createCardElement(cardId, emojiElement) {
  const cardElement = document.createElement('div');

  cardElement.setAttribute('data-card-id', cardId);
  cardElement.append(emojiElement);

  addCardElementDefaultClasses(cardElement);
  addCardElementEventListeners(cardElement);

  return cardElement;
}

function addCardElementDefaultClasses(cardElement) {
  cardElement.classList.add(
    'bg-indigo-300',
    'rounded-md',
    'text-center',
    'py-2',
    'lg:pb-4',
    'lg:pt-2',
    'shadow-md',
    'transition',
    'duration-300'
  );
}

function createEmojiElement(cardState) {
  const emojiElement = document.createElement('p');
  emojiElement.innerText = cardState.emoji;

  addEmojiElementDefaultClasses(emojiElement);

  return emojiElement;
}

function addEmojiElementDefaultClasses(emojiElement) {
  emojiElement.classList.add(
    'text-4xl',
    'lg:text-7xl',
    'transition-opacity',
    'duration-300',
    'opacity-0'
  );
}

function addCardElementEventListeners(cardElement) {
  cardElement.addEventListener('click', handleCardClickEvent);
}

function handleCardClickEvent(event) {
  const { currentlyOpenedCardId, currentlyOpenedCardState } = getCurrentlyOpenedCardDetails(
    getCardElementFromMouseEvent(event)
  );
  const { isCurrentCardMatchWithOtherCards, previouslyOpenedCardId, matchedCardId } =
    getCardsMatchDetails(currentlyOpenedCardState);

  if (isCardsMatch(isCurrentCardMatchWithOtherCards, matchedCardId)) {
    handleCardsMatch(currentlyOpenedCardState, currentlyOpenedCardId, matchedCardId);
  } else if (isNoCardsMatch(previouslyOpenedCardId)) {
    handleNoCardsMatch(currentlyOpenedCardState, currentlyOpenedCardId, previouslyOpenedCardId);
  } else {
    handleNoCardToMatch(currentlyOpenedCardState, currentlyOpenedCardId);
  }

  if (
    isCardsMatch(isCurrentCardMatchWithOtherCards, matchedCardId) ||
    isNoCardsMatch(previouslyOpenedCardId)
  ) {
    updateTriesCounter();
  }

  if (shouldFinishTheGame()) {
    finishTheGame();
  }
}

function getCardElementFromMouseEvent(event) {
  let cardElement = event.target;

  if (cardElement.localName === 'p') {
    cardElement = cardElement.parentElement;
  }

  return cardElement;
}

function getCurrentlyOpenedCardDetails(cardElement) {
  const currentlyOpenedCardId = cardElement.dataset.cardId;
  const currentlyOpenedCardState = cardsState.get(currentlyOpenedCardId);

  return { currentlyOpenedCardId, currentlyOpenedCardState };
}

function getCardsMatchDetails(currentlyOpenedCardState) {
  let isCurrentCardMatchWithOtherCards = false;
  let previouslyOpenedCardId = null;
  let matchedCardId = null;

  cardsState.forEach((card) => {
    if (isCardNotClickable(card) && isCardNotMatched(card)) {
      if (isCardsEmojiMatch(card, currentlyOpenedCardState)) {
        isCurrentCardMatchWithOtherCards = true;
        matchedCardId = card.id;
      } else {
        previouslyOpenedCardId = card.id;
      }
    }
  });

  return { isCurrentCardMatchWithOtherCards, previouslyOpenedCardId, matchedCardId };
}

function isCardNotClickable(card) {
  return !card.isClickable;
}

function isCardNotMatched(card) {
  return !card.isMatched;
}

function isCardsEmojiMatch(firstCard, secondCard) {
  return firstCard.emoji === secondCard.emoji;
}

function isCardsMatch(isCurrentCardMatchWithOtherCards, matchedCardId) {
  return isCurrentCardMatchWithOtherCards && !!matchedCardId;
}

function isNoCardsMatch(previouslyOpenedCardId) {
  return !!previouslyOpenedCardId;
}

function handleCardsMatch(currentlyOpenedCardState, currentlyOpenedCardId, matchedCardId) {
  updateCardsState({
    cardId: currentlyOpenedCardId,
    cardState: currentlyOpenedCardState,
    isClickable: false,
    isMatched: true,
  });
  showCardContent(currentlyOpenedCardId);

  updateCardsState({
    cardId: matchedCardId,
    cardState: cardsState.get(matchedCardId),
    isClickable: false,
    isMatched: true,
  });
  showCardContent(matchedCardId);

  animateCardContent([currentlyOpenedCardId, matchedCardId], true);
}

function handleNoCardsMatch(
  currentlyOpenedCardState,
  currentlyOpenedCardId,
  previouslyOpenedCardId
) {
  updateCardsState({
    cardId: currentlyOpenedCardId,
    cardState: currentlyOpenedCardState,
    isClickable: true,
    isMatched: false,
  });
  showCardContent(currentlyOpenedCardId);

  updateCardsState({
    cardId: previouslyOpenedCardId,
    cardState: cardsState.get(previouslyOpenedCardId),
    isClickable: true,
    isMatched: false,
  });
  showCardContent(previouslyOpenedCardId);

  animateCardContent([currentlyOpenedCardId, previouslyOpenedCardId], false);
}

function handleNoCardToMatch(currentlyOpenedCardState, currentlyOpenedCardId) {
  updateCardsState({
    cardId: currentlyOpenedCardId,
    cardState: currentlyOpenedCardState,
    isClickable: false,
    isMatched: false,
  });
  showCardContent(currentlyOpenedCardId);
}

function updateCardsState({ cardId, cardState, isClickable, isMatched }) {
  cardsState.set(cardId, {
    ...cardState,
    isClickable,
    isMatched,
  });
}

function showCardContent(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"`);
  cardElement.classList.add('pointer-events-none');

  const cardContentElement = cardElement.children[0];
  cardContentElement.classList.remove('opacity-0');
  cardContentElement.classList.add('opacity-1');
}

function animateCardContent(cardIds, isMatch) {
  const [firstCardElement, secondCardElement] = cardIds.map((cardId) =>
    document.querySelector(`[data-card-id="${cardId}"`)
  );
  const matchBgColor = isMatch ? 'bg-green-300' : 'bg-red-400';

  firstCardElement.classList.replace('bg-indigo-300', matchBgColor);
  secondCardElement.classList.replace('bg-indigo-300', matchBgColor);
  setTimeout(() => {
    firstCardElement.classList.replace(matchBgColor, 'bg-indigo-300');
    secondCardElement.classList.replace(matchBgColor, 'bg-indigo-300');

    if (isMatch) {
      firstCardElement.classList.add('scale-75');
      secondCardElement.classList.add('scale-75');
    } else {
      hideCardContent(cardIds[0]);
      hideCardContent(cardIds[1]);
    }
  }, 500);
}

function hideCardContent(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"`);
  cardElement.classList.remove('pointer-events-none');

  const cardContentElement = cardElement.children[0];
  cardContentElement.classList.remove('opacity-1');
  cardContentElement.classList.add('opacity-0');
}

function updateTriesCounter() {
  const currentCount = +triesCounterElement.innerText;
  triesCounterElement.innerText = currentCount + 1;
}

function resetTriesCounter() {
  triesCounterElement.innerText = 0;
}

function updateTimerCounter() {
  timeElement.innerText = formatSeconds(timeCounter);
}

function removeCardsContainer() {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer?.remove();
}

function shouldFinishTheGame() {
  const cardStateValues = Array.from(cardsState.values());
  return cardStateValues.every((card) => card.isMatched);
}

function finishTheGame() {
  setTimeout(() => {
    removeCardsContainer();
    clearInterval(timerId);
    updateFinishedGameTimeCounter();
    updateFinishedGameTriesCounter();

    congratsContaier.classList.remove('hidden');
  }, 1200);
}

function updateFinishedGameTimeCounter() {
  const finalTimeElement = congratsContaier.querySelector('.final-time');
  const finalTime = getStringFormattedFinalTime(timeCounter);
  finalTimeElement.innerText = finalTime;
}

function updateFinishedGameTriesCounter() {
  const finalTriesElement = congratsContaier.querySelector('.final-tries');
  const finalTries = +triesCounterElement.innerText;
  finalTriesElement.innerText = finalTries;
}

function formatSeconds(totalSeconds) {
  const { minutes, seconds } = getMinutesSecondsFrom(totalSeconds);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function getMinutesSecondsFrom(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds };
}

function getStringFormattedFinalTime(totalSeconds) {
  const { minutes, seconds } = getMinutesSecondsFrom(totalSeconds);
  let formattedString = '';

  if (minutes) {
    formattedString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  if (minutes && seconds) {
    formattedString += ' and ';
  }

  if (seconds) {
    formattedString += `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  return formattedString;
}

main();
