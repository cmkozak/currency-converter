/*
    After the convert button gets clicked
    this function gets the json data from 
    http://www.floatrates.com/
    then sends data to executeData() method
*/
function convert() {
    const numValue = document.getElementById("num").value;
    const queryGetter = document.getElementById("dropdownSelector");
    const currencyType = queryGetter.options[queryGetter.selectedIndex].value;

    const url = `http://www.floatrates.com/daily/${currencyType}.json`;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            const data = JSON.parse(this.response);
            executeData(data, currencyType, numValue);
        } else {
            alert("Error with GET request, please try again.");
        }
    }
    xmlhttp.send();
}


/*
    After getting HTTP JSON data, this function
    gets all of the available currency codes
    iterates through them all and adds the value to the website
*/
function executeData(data, currencyType, numValue) {
    const dataTypes = ["usd", "eur", "cny", "jpy", "gbp", "mxn", "cad", "aud", "rub", "chf", "nzd", "vnd"];
    
    dataTypes.forEach(value => {
        if (currencyType === value){
            document.getElementById(value).innerHTML = numValue;
        } else {
            document.getElementById(value).innerHTML = parseFloat(data[value].rate * numValue).toFixed(2);
        }
    });
}
