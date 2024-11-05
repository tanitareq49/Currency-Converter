//variables
const baseURL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/";
const allSelects = document.querySelectorAll(".countries select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

//step-1--currency selection
for (let select of allSelects) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name == "to" && currCode === "CAD") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change", (ev)=>{
        updateFlag(ev.target);
    })
}

//step-2--update flag
const updateFlag = (element)=> {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgSrc;
}

//step-3--currency exchange generator
const updateExchangeRate = async ()=>{
    let amount = document.querySelector("#amount");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    let mainUrl = `${baseURL}${fromCurr.value}_${toCurr.value}.json`;
    console.log(mainUrl);
    let response = await fetch(mainUrl);
    let data = await response.json();
    const rate = document.querySelector(".rate");
    let exchangeRate = data.rate;
    let finalRate = amountValue * exchangeRate;
    rate.innerText = `${amountValue} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
}

window.addEventListener("load", ()=> {
    updateExchangeRate();
})

btn.addEventListener("click", (ev)=> {
    ev.preventDefault();
    updateExchangeRate();
});