let totalAmount = document.querySelector('#total-amount')
let userAmount = document.querySelector('#user-amount')
const checkAmount = document.querySelector('#check-amount')
const setBudgetBtn = document.querySelector('#set-budget')
const productTitle = document.querySelector('.product-title')
const errorMessage = document.querySelector('#budget-error')
const productTitleError = document.querySelector('#product-title-error')
// const productCostError = document.querySelector()
const amount = document.querySelector('#amount')
const expenditureValue = document.querySelector('#expenditure-value')
const balanceValue = document.querySelector('#balance-amount')
const list = document.querySelector('.list')
let tempAmount = 0;




// Set Budget

setBudgetBtn.addEventListener('click', () => {
    // empty or negative input 
    tempAmount = totalAmount.value
    if (tempAmount === '' || tempAmount < 0) {
        errorMessage.classList.remove('hide')
    } else {
        errorMessage.classList.add('hide')

        // set budget
        amount.innerHTML = tempAmount
        //set balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText

        //clear input value
        totalAmount.value = ''
    }

})

//Disable edit & delete button

const disableBtn = (bool) => {
    let editButtons = document.querySelector('.edit');
    if (editButtons) { // If there are any elements found, it converts the NodeList object returned by querySelector into an array using Array.from and then loops through each element using forEach
        Array.from(editButtons).forEach((element) => {
            element.disabled = bool; //For each element, the code sets its disabled property to the value of bool, which is passed as an argument to the function.
        });
    }
}

//modify list elements

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement
    let currentBalance = balanceValue.innerText
    let currentExpense = expenditureValue.innerText
    let parentAmount = parentDiv.querySelector('.amount').innerText
    if (edit) {
        let parentText = parentDiv.querySelector('.product').innerText
        productTitle.value = parentText
        userAmount.value = parentAmount
        disableBtn(true)
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount)
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove()
}


//Create expense List

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement('div')
    sublistContent.classList.add('sublist-content', 'flex-space')
    list.appendChild(sublistContent)
    sublistContent.innerHTML = `<p class='product'>${expenseName}</p><p class='amount'>${expenseValue}</p>`
    let editButton = document.createElement('button')
    editButton.classList.add("ri-edit-box-fill", 'edit')
    editButton.style.fontSize = '24px'
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true)
    })

    let deleteButton = document.createElement('button')
    deleteButton.classList.add("ri-delete-bin-fill", "delete")
    deleteButton.style.fontSize = '24px'
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton)
    })
    sublistContent.appendChild(editButton)
    sublistContent.appendChild(deleteButton)
    document.querySelector('.list').appendChild(sublistContent)
}


//Function to add expense

checkAmount.addEventListener('click', () => {

    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove('hide')
        return false
    }
    // enable buttons
    disableBtn(false)
    // expense
    let expenditure = parseInt(userAmount.value)
    // total expense(existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum
    // total balance(budget -total expense)

    const totalBalance = tempAmount - sum
    balanceValue.innerText = totalBalance

    //create List

    listCreator(productTitle.value, userAmount.value)
    //empty inputs

    productTitle.value = ''
    userAmount.value = ''
})
