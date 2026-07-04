let section = document.querySelector('section');

let activeCard = null;
let timer = null;

// =====================
// Reset Card
// =====================
function resetCard(card) {
    if (!card) return;

    card.classList.remove('selected');

    let flip = card.querySelector('.card-flip-container');
    if (flip) flip.classList.remove('flipped');

    let timerEl = card.querySelector('.timer');
    if (timerEl) timerEl.innerHTML = '';

    activeCard = null;
}

// =====================
// Show Message
// =====================
function showMessage(text, type = 'not') {
    let msg = document.createElement('span');
    msg.className = `did ${type}`;
    msg.textContent = text;

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}

// =====================
// Start Timer
// =====================
function startTimer(card) {
    let counter = 5;
    let timerEl = card.querySelector('.timer');

    clearInterval(timer);

    timer = setInterval(() => {
        counter--;
        timerEl.innerHTML = counter;

        if (counter <= 0) {
            clearInterval(timer);
            showMessage('WRONG', 'not');
            resetCard(card);
        }
    }, 1000);
}

// =====================
// Click Handler
// =====================
section.addEventListener('click', (e) => {

    let card = e.target.closest('.card');
    if (!card) return;

    // TRUE button
    if (e.target.closest('.true')) {
        clearInterval(timer);
        showMessage('GREAT', 'it');
        resetCard(card);
        return;
    }

    // BACK button
    if (e.target.closest('.back')) {
        clearInterval(timer);
        showMessage('WRONG', 'not');
        resetCard(card);
        return;
    }

    if (!card.classList.contains('selected')) {

        if (activeCard) resetCard(activeCard);

        activeCard = card;

        card.classList.add('selected');
        card.querySelector('.card-flip-container').classList.add('flipped');

        startTimer(card);
    }
});