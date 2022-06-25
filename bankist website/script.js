'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
 const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');




const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const calcDisplaySummary=function(acc)
{
const incomes=acc.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
labelSumIn.textContent=`${incomes}€`;

const out=acc.movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
labelSumOut.textContent=`${Math.abs(out)}€`;

const interest=acc.movements.filter(mov=>mov>0).map(deposit=>((deposit * acc.interestRate)/100)).filter(int=>int>=1).reduce((acc,int)=>acc+int,0);
//interest rate is 1.2%
labelSumInterest.textContent=`${interest}€`;
}

calcDisplaySummary(account1);

const displayMovements=function(movements,sort=false)
{
containerMovements.innerHTML="";
//conditional operator
const movs=sort?movements.slice().sort((a,b)=>a-b):movements;//slice() makes a copy of movements
movs.forEach(function(mov,i)
{
const type=(mov>0)?"deposit":"withdrawal";

const html=` <div class="movements__row">
<div class="movements__type movements__type--${type}">${i+1} ${type}</div>

<div class="movements__value">${mov}€</div>
</div>`;

containerMovements.insertAdjacentHTML("afterbegin",html);

});
}

displayMovements(account1.movements);


const createUsername=function(accts)
{
accts.forEach(function(acc)
{
  acc.username=acc.owner.toLowerCase().split(" ").map(el=>el.slice(0,1)).join("");
}

)
 
}
createUsername(accounts);



const calcdisplayBalance=function(acc)
{
  acc.balance=acc.movements.reduce((acc,mov)=> acc + mov,0);
  labelBalance.textContent=`${acc.balance}€`;
  
}


const updateUI=function(acc)
{
//Display movements
displayMovements(acc.movements);

//Display balance
calcdisplayBalance(acc);

//Display summary
  calcDisplaySummary(acc);
}




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eutoUSD=1.1;
const movementsUSD=movements.map(
  (mov)=> mov*eutoUSD
  
);



const balance=movements.reduce((acc,currentValue)=> acc + currentValue,0);//initial value of accumulator



//maximum value

const max=movements.reduce(function(acc,curr,i,arr)
{
  if(acc>curr)
  {
    return acc;
  }
  else
  {
    return curr;
  }

},movements[0]);




/*const movementDescriptions=movements.map((mov,i,arr)=>{
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementDescriptions);

//simplified

const movementDescriptions=movements.map((mov,i)=>
  `Movement ${i + 1}: You ${(mov>0)?"deposited":"withdrew"}  ${mov}`

);
console.log(movementDescriptions)

const deposits=movements.filter(function(mov)
{
return mov>0;
});

console.log(movements);
console.log(deposits);

const withdrawls=movements.filter(mov=>mov<0);
console.log(movements);
console.log(withdrawls);*/

const eurotoUSD=1.1;
const totalDepositsUSD=movements.filter(mov=>mov>0).map(mov=>mov*eurotoUSD).reduce(function(acc,mov,i,arr)
{
  return acc+mov;
},0);



const firstWithdrawl=movements.find(mov=>mov<0);

const account=accounts.find(acc=>acc.owner==='Jessica Davis');


let currentAccount;
btnLogin.addEventListener("click",function(e)
{
  //form element automatically does enter action when we keep the cursor in the space and press enter 
  e.preventDefault();//prevents page from refreshing
  currentAccount= accounts.find(acc=>acc.username===inputLoginUsername.value);//value will read the value from the empty space
  
  if(currentAccount?.pin===Number(inputLoginPin.value))
  {
//Display UI and message
labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(" ")[0]}`;
}

containerApp.style.opacity=100;
//clear input field
inputLoginUsername.value=inputLoginPin.value="";
inputLoginPin.blur();//this will make this field lose focus ex the cursor will stop blinking

//Display movements
/*displayMovements(currentAccount.movements); we are converting it to a function

//Display balance
calcdisplayBalance(currentAccount);

//Display summary
  calcDisplaySummary(currentAccount);*/
  updateUI(currentAccount);
});


btnTransfer.addEventListener("click",function(e)
{
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.username===inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value="";
  if(amount>0&&currentAccount.balance>=amount&&receiverAcc?.username!==currentAccount.username&&receiverAcc)
  {
currentAccount.movements.push(-amount);//since the amount is being deducted from our account
receiverAcc.movements.push(amount);//since the reciever account is gaining that money
updateUI(currentAccount);
  }
  
});

btnLoan.addEventListener("click",function(e)
{
e.preventDefault();
const amount=Number(inputLoanAmount.value);
if(amount>0&&currentAccount.movements.some(mov=>mov>=amount*0.1))
{
  currentAccount.movements.push(amount);
  //update UI
  updateUI(currentAccount);
}
inputLoanAmount.value="";
});

btnClose.addEventListener("click",function(e)
{
  e.preventDefault();
  if(inputCloseUsername.value===currentAccount.username&&Number(inputClosePin.value)===currentAccount.pin)
  {
    inputCloseUsername.value=inputClosePin.value="";
    const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
    console.log(index);
    accounts.splice(index,1);
    console.log(accounts);
    containerApp.style.opacity=0;
  }
});
let sorted=false;
btnSort.addEventListener("click",function(e)
{
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
});

const owners=["jonas","zach","adam","martha"];
console.log(owners.sort());
console.log(movements);
//ascending order
movements.sort(
  (a,b)=>{
    if(a>b)
    {
      return 1;
    }
    if(b>a)
    {
      return -1;
    }
  }
);
console.log(movements);
//descending order
movements.sort(
  (a,b)=>{
    if(a>b)
    {
      return -1;
    }
    if(b>a)
    {
      return 1;
    }
  }
);

console.log(movements);

labelBalance.addEventListener("click",function()
{
const movementsUI=Array.from(document.querySelectorAll(".movements__value"));
console.log("--------------");
console.log(movementsUI.map(el=>el.textContent.replace("€","")));
});



const overallBalance1=accounts.map(acc=>acc.movements);
console.log(overallBalance1);

const balanceBank=accounts.flatMap(acc=>acc.movements).filter(mov=>mov>0).reduce((acc,cur)=>acc+cur,0);
console.log(balanceBank);

/*const numDeposit1000=accounts.flatMap(acc=>acc.movements).filter(mov=>mov>1000).length;
console.log(numDeposit1000);*/
const numDeposit1000=accounts.flatMap(acc=>acc.movements).reduce((count,cur)=>cur>=1000?count+1:count,0);
console.log(numDeposit1000);

const sums=accounts.flatMap(acc=>acc.movements).reduce((sums,cur)=>{cur>0?sums.deposits+=cur:sums.withdrawl+=cur;
  return sums;},{deposits:0,withdrawl:0});
  console.log(sums);

//this is a nice title =>This Is a Nice Title
const convertTitleCase=function(title)
{
const exceptions=['a','an','the','but','or','on','in','with'];
const titleCase=title.toLowerCase().split(" ").map(word=>exceptions.includes(word)?word:word[0].toUpperCase()+word.slice(1,word.size)).join(" ");
console.log(titleCase);
}

console.log(convertTitleCase("this is a long title"));

