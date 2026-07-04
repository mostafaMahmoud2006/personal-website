// ==========================================
// ============== BANK CLASS ================
// ==========================================

class Bank {

    // Static properties (shared between all instances)
    static users = [];
    static BANK_NAME = 'M.Z.S.AI';

    // Constructor to create a new user
    constructor(name, id = Bank.users.length + 1, balance = 0, created_at = new Date().toLocaleDateString()) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.created_at = created_at;

        // Each user has cards + transaction history
        this.cards = [];
        this.history = [];

        // Add user to global users list
        Bank.users.push(this);
    }

    // Generate random CSV (security code)
    createCSV() {
        return Math.ceil(Math.random() * 999)
    }

    // Generate card number (grouped like xxxx-xxxx-xxxx)
    createCardNumber() {
        let cardNumber = [...(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString())];
        let result = [];
        let target = ""

        cardNumber.forEach((num) => {
            target += num;

            if (target.length === 4) {
                result.push(target);
                target = '';
            }
        })

        return result.join('-')
    }

    // Create new card for user
    createCard() {
        let cardDetails = {
            id: this.cards.length + 1,
            cardNumber: this.createCardNumber(),
            csv: this.createCSV(),
            cardDate: undefined
        };

        // Get current date
        let month = new Date().getMonth()
        let day = new Date().getDay()

        // Format date (ensure 2 digits)
        if (month.length !== 2) {
            month = `0${month}`
        }
        if (day.length !== 2) {
            day = `0${day}`
        }

        let date = `${day}/${month}`
        cardDetails.cardDate = date

        // Add card to user
        this.cards.push(cardDetails);
    }

    // Withdraw money
    withdraw(amount) {
        if (amount > this.balance) return "Not enough money";

        this.balance -= amount;

        // Save transaction
        this.history.push({
            id: this.history.length + 1,
            date: new Date().toLocaleDateString(),
            info: `Withdraw ${amount}$`
        });
    }

    // Deposit money
    deposit(amount) {
        this.balance += amount;

        // Save transaction
        this.history.push({
            id: this.history.length + 1,
            date: new Date().toLocaleDateString(),
            info: `Deposit ${amount}$`
        });
    }

    // Add multiple cards
    addCards(listOfCards) {
        this.cards.push(...listOfCards);
    }

    // Add multiple history entries
    addHistory(listOfHistory) {
        this.history.push(...listOfHistory);
    }
}


// ==========================================
// ============== INITIAL DATA ==============
// ==========================================

let users = [
    {
        id: 1,
        name: "Mostafa",
        balance: 2000,
        createdAt: "2024-01-01",
        cards: [],
        history: []
    },
    {
        id: 2,
        name: "Ahmed",
        balance: 2000,
        createdAt: "2024-01-01",
        cards: [],
        history: []
    }
];


// ==========================================
// ========== INITIALIZATION ================
// ==========================================

// Convert plain objects → Bank instances
users.forEach((ele) => {
    let user = new Bank(ele.name, ele.id, ele.balance, ele.createdAt);
    user.addCards(ele.cards);
    user.addHistory(ele.history);
});

// Active user id
const user_id = 2;


// ==========================================
// ============ DOM ELEMENTS ================
// ==========================================

let user_name = document.getElementById('new-user');

let addCard = document.getElementById('addCard');
let cardHolder = document.getElementById('carousel');

let balance = document.getElementById("balance");

let transactions = document.getElementById('transactions');
let history = document.getElementById('history');

let show = document.getElementById('showHistory');


// ==========================================
// ========== INITIAL RENDERING =============
// ==========================================

// Load cards + balance
setUpCardsAndBalance(Bank.users, cardHolder, user_id);

// Load transaction history
viewHistory(user_id, transactions);


// ==========================================
// ============ EVENT HANDLERS ==============
// ==========================================

// Withdraw money
withdraw.onclick = () => {
    let amount = amountWithdraw.value;
    let user = getUser(Bank.users, user_id);

    if (amount > 0 && user.balance > amount && user) {
        user.withdraw(+amount);

        amountWithdraw.value = '';
        balance.innerHTML = user.balance + "$";

        viewHistory(user_id, transactions)
    } else {
        window.alert('Not enough money');
    }
};


// Deposit money
deposit.onclick = () => {
    let amount = amountDeposit.value;
    let user = getUser(Bank.users, user_id);

    if (amount > 0 && user && amount) {
        user.deposit(+amount);

        amountDeposit.value = '';
        balance.innerHTML = user.balance + "$";

        viewHistory(user_id, transactions)

        console.log(user.history);
    } else {
        window.alert('Write amount of money')
    }
};


// Toggle history visibility
show.onclick = () => {
    history.classList.toggle('active')
}


// Remove user
remove.onclick = () => {
    removeUser(user_id);

    document.getElementsByClassName('error')[0].style.display = 'flex';

    console.log(Bank.users);
}


// Create new card
addCard.onclick = () => {
    createCard(Bank.users, user_id);
};


// Update username in UI
user_name.addEventListener('click', () => {
    document.getElementById('user').innerHTML = document.getElementById('userName').value;
});


// Create new user
document.getElementById('new-user').addEventListener('click', () => {
    let user = new Bank(document.getElementById('userName').value);

    setUpCardsAndBalance(Bank.users, cardHolder, user.id);

    document.getElementsByClassName('error')[0].style.display = 'none';
});


// ==========================================
// ============ HELPER FUNCTIONS ============
// ==========================================

// Get user by id
function getUser(users, user_id) {
    return users.find((ele) => ele.id === user_id);
}


// Setup cards + balance UI
function setUpCardsAndBalance(users, holder, user_id) {
    holder.innerHTML = '';

    let target = getUser(users, user_id);

    // If user not found
    if (target === undefined) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode("No cards, click to create one"));
        div.classList.add('no-cards');
        holder.appendChild(div);
        return;
    }

    // Update balance
    balance.innerHTML = target.balance + "$";

    // Render cards
    target.cards.forEach((card) => {
        let html = `<div class="card" data-id=${card.id}>
            <span id="bankName">${Bank.BANK_NAME}</span>
            <span id="cardNumber">${card.cardNumber}</span>
            <div>
                <span id="csv">${card.csv}</span>
                <span id="exp">${card.cardDate}</span>
            </div>
        </div>`;

        holder.innerHTML += html;
    });
}


// Create card for user
function createCard(users, user_id) {
    let target = getUser(users, user_id);

    // Call class method
    target.createCard()

    // Re-render
    setUpCardsAndBalance(Bank.users, cardHolder, user_id);
}


// Render transaction history
function viewHistory(user_id, holder) {
    holder.innerHTML = '';

    let target = getUser(Bank.users, user_id);

    // If no user
    if (target === undefined) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode("No cards, click to create one"));
        div.classList.add('no-cards');
        holder.appendChild(div);
        return;
    }

    // Render history items
    target.history.forEach((ele) => {
        let html = `
        <div class="transaction" id=${ele.id}>
            <span id="index">${ele.id}</span>
            <div>
                <span id="about">${ele.info}</span>
                <span id="date">${ele.date}</span>
            </div>
        </div>`;

        holder.innerHTML += html;
    });
}


// Remove user from system
function removeUser(user_id) {
    Bank.users = Bank.users.filter(ele => ele.id !== user_id);
}