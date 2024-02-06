'use strict';

const account1 = {
  owner: 'Alaa Mohammed',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Omnia Ahmed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Youssef Mohammed',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Yamen Alaa',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Alen Alaa',
  movements: [820, 3555, -845, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account6 = {
  owner: 'Hazem MOhammed',
  movements: [980, 4568, 321, -587, 1560, 120],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4, account5, account6];

const app = document.querySelector('.app');
const welcomeText = document.querySelector('.welcome');
const userLogIn = document.querySelector('.input-user');
let userPin = document.querySelector('.input-pin');
let btnLOgIn = document.querySelector('.login-btn');
const balanceDate = document.querySelector('.b-date');
const balanceDate2 = document.querySelector('.date');
const balanceValue = document.querySelector('.b-value');
const contMovements = document.querySelector('.movements');
const movementsRow = document.querySelector('.movements-row');
const movementType = document.querySelector('.move-type');
const movementDate = document.querySelector('.move-date');
const movementValue = document.querySelector('.move-value');
const sumValueIn = document.querySelector('.value-in');
const sumValueOut = document.querySelector('.value-out');
const sumValueInterest = document.querySelector('.value-interest');
const btnSort = document.querySelector('.btn-sort');

const transferToAcc = document.querySelector('.input-to');
const transferToAmount = document.querySelector('.input-amount');
const btnTransfer = document.querySelector('.btn-transfer');

const loanAmount = document.querySelector('.input-loan-amount');
const btnLoan = document.querySelector('.btn-loan');

const closeUser = document.querySelector('.close-input-user');
const closeUserPin = document.querySelector('.close-input-pin');
const btnClose = document.querySelector('.btn-close');

const displayMovements = function (acc, sort = false) {
  contMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements-row">
          <div class="move-type ${type}">${i + 1} ${type}</div>
          <div class="move-date">3 days ago</div>
          <div class="move-value">${move} &#8364;</div>
      </div>`;
    contMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  balanceValue.innerHTML = `${acc.balance}&#8364;`;
};

const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueIn.innerHTML = `${income} &#8364;`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueOut.innerHTML = `${Math.floor(Math.abs(out))} &#8364;`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueInterest.innerHTML = `${interest.toFixed(2)} &#8364;`;
};

const createUsernames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUi = function (acc) {
  displayMovements(acc);
  displayBalance(acc);
  displaySummary(acc);
};

let currentAccount;

btnLOgIn.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === userLogIn.value);
  if (currentAccount?.pin === Number(userPin.value)) {
    welcomeText.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } ${currentAccount.owner.split(' ')[1][0].toUpperCase()}.`;
    app.style.opacity = 100;
    userLogIn.value = userPin.value = '';
    userPin.blur();
    updateUi(currentAccount);
  } else {
    userLogIn.value = `Invalid User`;
    userPin.value = `or Wrong Pass`;
    setTimeout(function () {
      userLogIn.value = userPin.value = '';
    }, 3000);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(transferToAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === transferToAcc.value
  );
  transferToAcc.value = transferToAmount = '';
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(loanAmount.value);
  console.log(loanAmount);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 100)) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }
  loanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === closeUser.value &&
    currentAccount.pin === Number(closeUserPin.value)
  ) {
    const deleteIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(deleteIndex, 1);
    app.style.opacity = 0;
  }
  closeUserPin.value = closeUser.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
