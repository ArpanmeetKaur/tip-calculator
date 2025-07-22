const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-percent-btn");
const customTipInput = document.getElementById("custom-tip");
const peopleInput = document.getElementById("num-people");
const tipAmountDisplay = document.getElementById("Tip-amount-display");
const totalAmountDisplay = document.getElementById("Total-amount-display");
const resetButton = document.getElementById("reset-button");

// console.log('Bill Input:', billInput);
// console.log('Tip Buttons NodeList:', tipButtons);
// console.log('Custom Tip Input:', customTipInput);
// console.log('People Input:', peopleInput);
// console.log('Tip Amount Display Element:', tipAmountDisplay);
// console.log('Total Amount Display Element:', totalAmountDisplay);
// console.log('Reset Button:', resetButton);

// billInput.addEventListener('input' , function(event){
//     const currentBillValue = billInput.value;
//     console.log("bill Input changes, current value: " , currentBillValue);
// });

// tipButtons.forEach(function(Button){
//     Button.addEventListener('click' , function(event){
//         const clickedButton = event.target;
//         const tipPercentage = clickedButton.dataset.tip;
//         console.log('Tip Button Clicked: ' , clickedButton.textContent);
//         if(tipPercentage){
//             console.log("Selected Tip Percentage(from data-tip)" , tipPercentage + "%");
//         }
//         else{
//             console.warn("Clicked Button is missing the data-tip attribute!");
//         }
//     });
// });

// customTipInput.addEventListener('input' , function(event){
//     const customTipValue = event.target.value;
//     console.log("Custom Tip Input changed , current value: " , customTipValue);
// });

// peopleInput.addEventListener('input' , function(event){
//     const numberOfPeopleValue = event.target.value;
//     console.log('Number of People Input changed , current value: ' , numberOfPeopleValue);
// });


billInput.addEventListener('input',calculateTip); 

tipButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const clickedButton = event.target;
        const tipPercentage = clickedButton.dataset.tip;
        tipButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        customTipInput.value = '';
        if (!tipPercentage) {
            console.warn('Clicked button is missing the data-tip attribute!');
        }
        calculateTip();
    });
});

customTipInput.addEventListener('input' , () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    calculateTip();
});

peopleInput.addEventListener('input' , calculateTip);

function calculateTip(){
    console.log('--- calculateTip() function executed ---');

    const billValueStr = billInput.value;
    const peopleValueStr = peopleInput.value;
    const customTipvalueStr = customTipInput.value;

    let selectedButtonTipStr = null;
    const activeButton = document.querySelector('.tip-percent-btn.active');

    if(activeButton){
        selectedButtonTipStr = activeButton.dataset.tip;               //return a string not a number
    }

    console.log("Raw Input - Bill:" , billValueStr , `(Type: ${typeof billValueStr})`);
    console.log("Raw Input - People:" , peopleValueStr , `(Type: ${typeof peopleValueStr})`);
    console.log("Raw Input - Custom Tip:" , customTipvalueStr , `(Type: ${typeof customTipvalueStr})`);
    console.log("Raw Input - Seleced Button Tip:" , selectedButtonTipStr , `(Type: ${typeof selectedButtonTipStr})`);
    //$ is used for template literals

    const billAmount = parseFloat(billValueStr);
    const numberOfPeople = parseFloat(peopleValueStr);
    const customTipPercent = parseFloat(customTipvalueStr);

    const selectedButtonTipPercent = selectedButtonTipStr ? parseFloat(selectedButtonTipStr) : null ;
    //convert only if the button is active

    console.log("Converted Number - Bill Amount: " , billAmount , `(Type: ${typeof billAmount})`);
    console.log("Converted Number - Number Of People: " , numberOfPeople , `(Type: ${typeof numberOfPeople})`);
    console.log("Converted Number - Custom Tip%: " , customTipPercent , `(Type: ${typeof customTipPercent})`);
    console.log("Converted Number - Selected Button Tip%: " , selectedButtonTipPercent , `(Type: ${typeof selectedButtonTipPercent})`);

    let actualTipPercent = 0;
    if(!isNaN(customTipPercent) && customTipPercent>=0 ){
        actualTipPercent = customTipPercent;
        console.log("Using Custom Tip Percentage: " , actualTipPercent);
    }
    else if(selectedButtonTipPercent != null && !isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0){
        actualTipPercent = selectedButtonTipPercent;
        console.log("Using Selected Button Tip Percentage: " , actualTipPercent);
    }
    else{
        console.log("Using Default Tip Percentage: 0");
    }

    let totalTipAmount = 0;
    if(!isNaN(billAmount) && billAmount>=0){
        totalTipAmount = billAmount * (actualTipPercent/100);
    }
    console.log("Calculated Total Tip Amount: ", totalTipAmount , `(Type: ${typeof totalTipAmount})`);

    const totalBillAmount = billAmount + totalTipAmount ;
    console.log(`Total Bill Calculation : ${billAmount} + ${totalTipAmount} = ${totalTipAmount}`);
    if(isNaN(totalBillAmount)){
        console.log("Invalid input: Please enter the valid bill amount.");
    } else{
        console.log(`Final Total Bill: ₹${totalBillAmount.toFixed(2)}`);
    }

    let tipAmountPerPerson = 0;
    if(!isNaN(totalTipAmount) && !isNaN(numberOfPeople) && numberOfPeople>0){
        tipAmountPerPerson = totalTipAmount / numberOfPeople;
    } else{
        console.warn("Cannot calculate tip per person. Invalid inputs (Tip:", totalTipAmount, ", People:", numberOfPeople, ")")
    }
    console.log("Calculated- Tip Amount Per Person:" , tipAmountPerPerson, `(Type: ${typeof tipAmountPerPerson})`);

    let totalAmountPerPerson = 0;
    if(!isNaN(totalBillAmount) && !isNaN(numberOfPeople) && numberOfPeople>0){
        totalAmountPerPerson = totalBillAmount / numberOfPeople;
    } else{
        console.warn("Cannot calculate total per person. Invalid inputs (Total Bill:", totalBillAmount, ", People:", numberOfPeople, ")")
    }
    console.log("Calculated- Total Amount Per Person:" , totalAmountPerPerson, `(Type: ${typeof totalAmountPerPerson})`);

     console.log({ 
        billAmount,
        numberOfPeople,
        actualTipPercent,
        totalTipAmount,
        totalBillAmount,
        tipAmountPerPerson,
        totalAmountPerPerson
    });
};