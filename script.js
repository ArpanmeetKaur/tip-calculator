//DOM Element Selections
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-percent-btn");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("num-people");
const tipAmountDisplay = document.getElementById("tip-amount-display");
const totalAmountDisplay = document.getElementById("total-amount-display");
const resetButton = document.getElementById("reset-button");

// Add input listeners
[billInput, customTipInput, peopleInput].forEach(input => {
    input.addEventListener('input', calculateTip);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateTip();
        }
    });
});

// Tip buttons: click and Enter support
tipButtons.forEach(button => {
    button.addEventListener('click', event => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        customTipInput.value = '';
        calculateTip();
    });

    button.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click(); // Same as mouse click
        }
    });
});

if (resetButton) {
    resetButton.addEventListener('click', resetCalculator);
} else {
    console.error('Reset button not found!');
}

function calculateTip() {
    console.log('--- calculateTip() function executed ---');

    // Parse input values
    const billAmount = parseFloat(billInput.value);
    const numberOfPeople = parseFloat(peopleInput.value);
    const customTipPercent = parseFloat(customTipInput.value.trim());
    const customTipEntered = customTipInput.value.trim() !== '';
    const activeButton = document.querySelector('.tip-percent-btn.active');
    const selectedButtonTipPercent = activeButton ? parseFloat(activeButton.dataset.tip) : null;

    // Tip selection logic
    let actualTipPercent = 0;
    let isTipValid = true;

    if (customTipEntered) {
        if (!isNaN(customTipPercent) && customTipPercent >= 0) {
            actualTipPercent = customTipPercent;
        } else {
            isTipValid = false;
        }
    } else if (!isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0) {
        actualTipPercent = selectedButtonTipPercent;
    } else {
        isTipValid = false;
    }

    // Validate all inputs
    const isBillValid = !isNaN(billAmount) && billAmount >= 0;
    const isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0 && Number.isInteger(numberOfPeople);

    // Apply red border to invalid inputs
    billInput.classList.toggle('error', !isBillValid);
    peopleInput.classList.toggle('error', !isPeopleValid);
    customTipInput.classList.toggle('error', !isTipValid);

    // Stop if any input is invalid
    if (!isBillValid || !isPeopleValid || !isTipValid) {
        tipAmountDisplay.textContent = '₹0.00';
        totalAmountDisplay.textContent = '₹0.00';
        console.warn("Invalid input. Calculation skipped.");
        return;
    }

    // Perform calculations
    const totalTipAmount = billAmount * (actualTipPercent / 100);
    const totalBillAmount = billAmount + totalTipAmount;
    const tipPerPerson = totalTipAmount / numberOfPeople;
    const totalPerPerson = totalBillAmount / numberOfPeople;

    // Display outputs
    tipAmountDisplay.textContent = `₹${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `₹${totalPerPerson.toFixed(2)}`;

    console.log(`Tip Per Person: ₹${tipPerPerson.toFixed(2)}, Total Per Person: ₹${totalPerPerson.toFixed(2)}`);
}

function resetCalculator() {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipAmountDisplay.textContent = '₹0.00';
    totalAmountDisplay.textContent = '₹0.00';
    billInput.classList.remove('error');
    customTipInput.classList.remove('error');
    peopleInput.classList.remove('error');
    console.log('Calculator reset.');
}

// Initial run
document.addEventListener('DOMContentLoaded', calculateTip);
