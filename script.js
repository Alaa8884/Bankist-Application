'use strict';

const account1 = {
  owner: 'Alaa Mohammed',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2024-04-13T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Omnia Ahmed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2024-04-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'ar-EG',
};

const account3 = {
  owner: 'Youssef Mohammed',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Yamen Alaa',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};
const account5 = {
  owner: 'Alen Alaa',
  movements: [820, 3555, -845, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'ar-EG',
};
const account6 = {
  owner: 'Hazem MOhammed',
  movements: [980, 4568, 321, -587, 1560, 120],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
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
const labelTimer = document.querySelector('.timer');

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  contMovements.innerHTML = '';
  const moves = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  moves.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(move, acc.locale, acc.currency);

    const html = `
      <div class="movements-row">
          <div class="move-type ${type}">${i + 1} ${type}</div>
          <div class="move-date">${displayDate}</div>
        <div class="move-value">${formattedMov}</div>
      </div>`;
    contMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  balanceValue.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueIn.innerHTML = formatCur(income, acc.locale, acc.currency);
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueOut.innerHTML = formatCur(Math.abs(out), acc.locale, acc.currency);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  sumValueInterest.innerHTML = formatCur(interest, acc.locale, acc.currency);
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
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      welcomeText.textContent = 'Log in to get started';
      app.style.opacity = 0;
    }

    time--;
  };

  let time = 120;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
let currentAccount, timer;

btnLOgIn.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === userLogIn.value);
  if (currentAccount?.pin === Number(userPin.value)) {
    welcomeText.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } ${currentAccount.owner.split(' ')[1][0].toUpperCase()}.`;
    app.style.opacity = 100;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    balanceDate2.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    userLogIn.value = userPin.value = '';
    userPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
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
  transferToAcc.value = transferToAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUi(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(loanAmount.value);
  console.log(loanAmount);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 100)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUi(currentAccount);

      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  loanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === closeUser.value &&
    currentAccount.pin === +closeUserPin.value
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
