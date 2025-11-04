let calculation = localStorage.getItem('calculation') || '';
const calculationDisplay = document.querySelector('.calculation-display');

function setItemInLocalStorage() {
    localStorage.setItem('calculation', calculation);
}

function calculationDisplayFun() {
    calculationDisplay.textContent = calculation;
}

function calculationFun(input) {
    const operators = [' + ', ' - ', ' * ', ' / '];
    const lastThree = calculation.slice(-3);

    if (operators.includes(lastThree) && operators.includes(input)) {
        return;
    }

    if ((input === (' * ') || input === (' / '))  && calculation === '') {
        return;
    }

    const parts = calculation.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (input === '.' && lastPart.includes('.')) {
        return;
    }

    calculation += input;
    setItemInLocalStorage();
    calculationDisplayFun();
}

function clearCalculation() {
    calculation = '';
    setItemInLocalStorage();
    calculationDisplayFun();
}

function calculate() {
    calculation = eval(calculation);
    if (isNaN(calculation)) {
        calculation = '';
    } else {
        calculation = String(calculation);
    }
    
    setItemInLocalStorage();
    calculationDisplayFun();
}

function deleteFun() {
    if (calculation.endsWith(' + ') || 
        calculation.endsWith(' - ') || 
        calculation.endsWith(' * ') || 
        calculation.endsWith(' / ')  
    ) {
        calculation = calculation.slice(0, -3); 
    } else {
        calculation = calculation.slice(0, -1);
    }
    setItemInLocalStorage();
    calculationDisplayFun();
}


calculationDisplayFun();



