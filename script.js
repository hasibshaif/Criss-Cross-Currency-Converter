// Function to fetch currency data from the API
function fetchCurrencies() {
    fetch('/api/fetchCurrencies') // Call the serverless function
        .then(response => response.json())
        .then(data => {
            // Populate 'fromCurrency' dropdown
            const fromCurrencyDropdown = document.getElementById('fromCurrency');
            populateDropdown(fromCurrencyDropdown, data);

            // Populate 'toCurrency' dropdown
            const toCurrencyDropdown = document.getElementById('toCurrency');
            populateDropdown(toCurrencyDropdown, data);
        })
        .catch(error => {
            console.error('Error fetching currency data:', error);
        });
}

// Function to populate dropdown with currency options
function populateDropdown(dropdown, data) {
    for (const currencyCode in data) {
        const option = document.createElement('option');
        option.text = `${currencyCode} - ${data[currencyCode]}`;
        option.value = currencyCode;
        dropdown.appendChild(option);
    }
}

// Function to swap the selected options in the dropdowns
function swapCurrencies() {
    var fromCurrency = document.getElementById("fromCurrency");
    var toCurrency = document.getElementById("toCurrency");

    var temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// Add event listener for the swap button
document.getElementById("swap").addEventListener("click", function() {
    // Swap the selected currencies
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    document.getElementById("fromCurrency").value = toCurrency;
    document.getElementById("toCurrency").value = fromCurrency;
    
    // Trigger the displayExchangeRate function to update the exchange rate text
    displayExchangeRate();
});

// Function to handle currency conversion
function convertCurrency() {
    var amount = parseFloat(document.querySelector('.input-box').value);
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;

    if (!isNaN(amount)) {
        // Call the serverless function instead of the Open Exchange Rates API
        fetch('/api/fetchLatestRates')
            .then(response => response.json())
            .then(data => {
                if ('rates' in data) {
                    const rates = data.rates;

                    if (fromCurrency in rates && toCurrency in rates) {
                        const exchangeRate = rates[toCurrency] / rates[fromCurrency];
                        const convertedAmount = amount * exchangeRate;

                        document.querySelector('.output-box').value = convertedAmount.toFixed(2);
                    } else {
                        console.error('Invalid currency code');
                    }
                } else {
                    console.error('Error:', data);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        document.querySelector('.output-box').value = '';
    }
}

// Event listener for the input box
document.querySelector('.input-box').addEventListener('input', convertCurrency);

// Function to handle setting the currencies in the dropdowns
function setCurrencyFromButton(buttonId, fromCurrency, toCurrency) {
    document.getElementById(buttonId).addEventListener("click", function() {
        // Set the "fromCurrency" dropdown to the first 3 letters and the "toCurrency" dropdown to the last 3 letters
        document.getElementById("fromCurrency").value = fromCurrency;
        document.getElementById("toCurrency").value = toCurrency;

        // Trigger the display of exchange rate when currencies are set from the buttons
        displayExchangeRate();
        convertCurrency();
    });
}

// Add event listeners for each button
setCurrencyFromButton("usdCadBtn", "USD", "CAD");
setCurrencyFromButton("usdGbpBtn", "USD", "GBP");
setCurrencyFromButton("usdJpyBtn", "USD", "JPY");
setCurrencyFromButton("usdEurBtn", "USD", "EUR");
setCurrencyFromButton("eurJpyBtn", "EUR", "JPY");
setCurrencyFromButton("eurChfBtn", "EUR", "CHF");
setCurrencyFromButton("eurGbpBtn", "EUR", "GBP");
setCurrencyFromButton("audUsdBtn", "AUD", "USD");
setCurrencyFromButton("gbpJpyBtn", "GBP", "JPY");
setCurrencyFromButton("chfJpyBtn", "CHF", "JPY");
setCurrencyFromButton("eurCadBtn", "EUR", "CAD");
setCurrencyFromButton("eurAudBtn", "EUR", "AUD");

// Function to display the exchange rate text
function displayExchangeRate() {
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;

    if (fromCurrency && toCurrency) {
        // Call the serverless function instead of the Open Exchange Rates API
        fetch('/api/fetchLatestRates')
            .then(response => response.json())
            .then(data => {
                if ('rates' in data) {
                    const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
                    const exchangeRateText = `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;

                    // Display the exchange rate text
                    document.querySelector('.exchange-rate-text').textContent = exchangeRateText;
                    document.querySelector('.exchange-rate-text').style.display = 'block'; // Show the text
                } else {
                    console.error('Error: Unable to fetch exchange rates');
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        document.querySelector('.exchange-rate-text').style.display = 'none';
    }
}


// Event listener for the currency dropdowns
document.getElementById("fromCurrency").addEventListener("change", displayExchangeRate);
document.getElementById("toCurrency").addEventListener("change", displayExchangeRate);
// Event listener for the currency dropdowns
document.getElementById("fromCurrency").addEventListener("change", convertCurrency);
document.getElementById("toCurrency").addEventListener("change", convertCurrency);

// Event listener for the input box
document.querySelector('.input-box').addEventListener('input', displayExchangeRate);

// Call the function initially to display the exchange rate
displayExchangeRate();

// Fetch JSON data and populate the table
fetch('currencies.json')
    .then(response => response.json())
    .then(data => createCurrencyTable(data))
    .catch(error => console.error('Error fetching JSON:', error));

// Function to create the currency table
function createCurrencyTable(data) {
    const currencyListBody = document.getElementById('currencyListBody');

    data.forEach(currency => {
        const row = document.createElement('tr');

        // Country Flag
        const flagCell = document.createElement('td');
        if (currency.has_flag !== undefined && currency.has_flag === false) {
            flagCell.textContent = ""; // No flag available
        } else {
            const flagImg = document.createElement('img');
            flagImg.src = `https://flagsapi.com/${currency.country_iso}/shiny/64.png`;
            flagCell.appendChild(flagImg);
        }
        row.appendChild(flagCell);

        // Currency Code
        const currencyCodeCell = document.createElement('td');
        currencyCodeCell.textContent = currency.currency_code;
        row.appendChild(currencyCodeCell);

        // Currency Name
        const currencyNameCell = document.createElement('td');
        currencyNameCell.textContent = currency.full_currency_code;
        row.appendChild(currencyNameCell);

        // Country Name
        const countryNameCell = document.createElement('td');
        countryNameCell.textContent = currency.country_name;
        row.appendChild(countryNameCell);

        currencyListBody.appendChild(row);
    });
}


// Call the fetchCurrencies function when the page loads
window.onload = fetchCurrencies;