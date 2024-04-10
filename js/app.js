
const prices = {
    products: 0.5,
    orders: 0.25
}

const packageInfo = {
    basic: 0,
    professional: 25,
    premium: 60
}

const extras = {
    acounting: 35,
    terminal: 5
}

// pobranie inputów, select, checkbox
const productInput = document.getElementById('products');
const orderInput = document.getElementById('orders');
const packageInput = document.getElementById('package');
const checkboxAcounting = document.getElementById("accounting");
const checkboxRental = document.getElementById("terminal");

// pobranie elementy summary
const summaryList = document.querySelector(".list__summary");
const summaryListItems = summaryList.children
const priceContainer = document.getElementById("total-price");
const totalPrice = document.querySelector(".total__price");

const selectList = document.querySelector(".select__dropdown");
const selectItem = selectList.children;

// eventy
productInput.addEventListener("focusin", handleProductInputFocusIn);
productInput.addEventListener("focusout", handleProductInputFocusOut);
productInput.addEventListener("keyup", handleProductInputKeyup);
productInput.addEventListener("change", handleProductInputKeyup);

orderInput.addEventListener("focusin", handleOrderInputFocusIn);
orderInput.addEventListener("focusout", handleOrderInputFocusOut);
orderInput.addEventListener("keyup", handleOrderInputKeyup);
orderInput.addEventListener("change", handleOrderInputKeyup);

packageInput.addEventListener("click", handlePackageSelectClick);
Array.from(selectItem).forEach(item => {
    item.addEventListener("click", handleSelectListClick);
})
checkboxAcounting.addEventListener("change", handleCheckboxChange);
checkboxRental.addEventListener("change", handleCheckboxChange);

// sumy w funkcjach
let finalPriceProduct = 0;
let finalPriceOrder = 0;
let finalPricePackage = 0;
let finalPriceAccounting = 0;
let finalPriceRental = 0;

// funkcje
updateTotalPrice()
priceContainer.classList.add("open");

// 1 input
function handleProductInputFocusIn(event) {
    event.preventDefault()
    event.target.style.border = "2px solid #08a6e4";
}

function handleProductInputFocusOut(event) {
    event.preventDefault()

    event.target.style.border = "1px solid #08a6e4";
}

function handleProductInputKeyup(event) {

    const inputValue = event.target.value
    const validationResultInput1 = inputsValidation(inputValue)

    if (!validationResultInput1) {
        event.target.value = ""
        finalPriceProduct = 0;
        summaryListItems[0].classList.remove("open");

        return
    }

    console.log(validationResultInput1)
    const itemCalc = summaryListItems[0].querySelector(".item__calc")
    itemCalc.innerText = `${inputValue} * ${prices.products}`
    const itemPrice = summaryListItems[0].querySelector(".item__price")
    itemPrice.innerText = `${inputValue * prices.products} $`
    summaryListItems[0].classList.add("open");

    finalPriceProduct = inputValue * prices.products
    updateTotalPrice()

    priceContainer.classList.add("open")
}

// 2 input
function handleOrderInputFocusIn(event) {
    event.preventDefault()
    event.target.style.border = "2px solid #08a6e4";
}

function handleOrderInputFocusOut(event) {
    event.preventDefault()
    event.target.style.border = "1px solid #08a6e4";
}

function handleOrderInputKeyup(event) {
    event.preventDefault()

    const inputValue = event.target.value

    const validationResultInput2 = inputsValidation(inputValue)
    if (!validationResultInput2) {
        event.target.value = ""
        finalPriceProduct = 0;
        summaryListItems[1].classList.remove("open");

        return
    }
    const itemCalc = summaryListItems[1].querySelector(".item__calc")
    itemCalc.innerText = `${inputValue} * ${prices.orders}`
    const itemPrice = summaryListItems[1].querySelector(".item__price")
    itemPrice.innerText = `${inputValue * prices.orders} $`
    summaryListItems[1].classList.add("open");

    finalPriceOrder = inputValue * prices.orders
    updateTotalPrice()
}

//3 input Select

function handlePackageSelectClick(event) {

    const selectElement = event.target.parentElement
    selectElement.classList.toggle("open")
}

function handleSelectListClick(event) {

    const choice = event.target.dataset.value;
    const target = event.currentTarget;
    const itemCalc = summaryListItems[2].querySelector(".item__calc");
    const itemPrice = summaryListItems[2].querySelector(".item__price");
    const selectInputValue = document.querySelector(".select__input")

    itemCalc.innerText = `${target.innerText}`
    summaryListItems[2].classList.add("open")

    if (choice === "basic") {

        itemPrice.innerText = `${packageInfo.basic} $`;
        finalPricePackage = packageInfo.basic;

    } else if (choice === "professional") {

        itemPrice.innerText = `${packageInfo.professional} $`;
        finalPricePackage = packageInfo.professional;

    } else if (choice === "premium") {

        itemPrice.innerText = `${packageInfo.premium} $`;
        finalPricePackage = packageInfo.premium;
    }

    event.target.parentElement.parentElement.classList.remove("open");
    selectInputValue.innerText = `${target.innerText}`
    updateTotalPrice()
}

function handleCheckboxChange (event) {

    const accountingElement = document.querySelector('[data-id = "accounting"]');
    const accountingPriceElemnt = accountingElement.querySelector(".item__price")
    const terminalElement = document.querySelector('[data-id = "terminal"]');
    const terminalPriceElement = terminalElement.querySelector(".item__price")

    const checkbox = event.target

    if (checkbox.id === "accounting" ) {
        if (checkbox.checked) {

            accountingElement.classList.add("open");
            accountingPriceElemnt.innerText = `${extras.acounting} $`;
            finalPriceAccounting = extras.acounting;

        } else {
            accountingElement.classList.remove("open");
            finalPriceAccounting = 0;
        }
    }

    if (checkbox.id === "terminal" ) {
        if (checkbox.checked) {
            terminalElement.classList.add("open");
            terminalPriceElement.innerText = `${extras.terminal} $`;
            finalPriceRental = extras.terminal;
        } else {
            terminalElement.classList.remove("open");
            finalPriceRental = 0;
        }
    }

    updateTotalPrice()
}

// Podsumowanie sum wszystkich elmentów

function updateTotalPrice () {

    const finalTotalSum = finalPriceProduct + finalPriceOrder + finalPricePackage + finalPriceAccounting + finalPriceRental

    totalPrice.innerText = `$ ${finalTotalSum}`
}

function inputsValidation (value) {

    const numberValue = parseFloat(value)

    if (isNaN(numberValue)) {
        console.log("1")
        return false
    }

    if (numberValue % 1 !== 0) {
        console.log("2")
        return false
    }

    if (numberValue <= 0) {
        console.log("3")
        return false
    }

    return true
}

