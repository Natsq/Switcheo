// ---- Currency Modal Pop Up ---- //

// Open Sell Modal
function openSellModal() {
    document.getElementById("sellCurrencyModal").style.display = "flex";
}

// Close Sell Modal
function closeSellModal() {
    document.getElementById("sellCurrencyModal").style.display = "none";
}

// Open Buy Modal
function openBuyModal() {
    document.getElementById("buyCurrencyModal").style.display = "flex";
}

// Close Buy Modal
function closeBuyModal() {
    document.getElementById("buyCurrencyModal").style.display = "none";
}

// Function to select a currency for selling
function selectSellCurrency(currency) {
    document.getElementById("currency-options-sell").value = currency;
    document.getElementById("sellCurrencyImage").src = `images/${currency}.svg`;
    closeSellModal();
}

// Function to select a currency for buying
function selectBuyCurrency(currency) {
    document.getElementById("currency-options-buy").value = currency;
    document.getElementById("buyCurrencyImage").src = `images/${currency}.svg`;
    closeBuyModal();
}

// Close modal if outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeSellModal();
        closeBuyModal();
    }
}


// ------------------- Exchange Rate Functionalities -------------------------//

const exchangeRates = {
    'SOL-USD': 156.54 ,
    'SOL-ETH': 0.05945110,
    'SOL-LUNA': 479.14418185,
    'USD-SOL': 0.00637132,
    'USD-ETH': 0.00037871,
    'USD-LUNA': 3.05278002,
    'ETH-SOL': 16.78711717,
    'ETH-USD': 2642.15,
    'ETH-LUNA': 8041,
    'LUNA-SOL': 0.00208910,
    'LUNA-USD': 0.327560,
    'LUNA-ETH': 0.00012417
};

function convertSellAmount() {
    const sellCurrency = document.getElementById("currency-options-sell").value;
    const buyCurrency = document.getElementById("currency-options-buy").value;
    const amountToSell = parseFloat(document.getElementById("input-amount").value);

    if (sellCurrency && buyCurrency && amountToSell > 0) {
        if (sellCurrency === buyCurrency) {
            // If the sell and buy currencies are the same, just display the same amount
            document.getElementById("output-amount").value = amountToSell.toFixed(2);
        } else {
            const rateKey = `${sellCurrency}-${buyCurrency}`;
            const rate = exchangeRates[rateKey];
            if (rate) {
                const amountToBuy = amountToSell * rate;
                document.getElementById("output-amount").value = amountToBuy.toFixed(2);
            } else {
                document.getElementById("output-amount").value = '';
            }
        }
    } else {
        document.getElementById("output-amount").value = '';
    }
}

function convertBuyAmount() {
    const sellCurrency = document.getElementById("currency-options-sell").value;
    const buyCurrency = document.getElementById("currency-options-buy").value;
    const amountToBuy = parseFloat(document.getElementById("output-amount").value);

    if (sellCurrency && buyCurrency && amountToBuy > 0) {
        if (sellCurrency === buyCurrency) {
            // If the sell and buy currencies are the same, just display the same amount
            document.getElementById("input-amount").value = amountToBuy.toFixed(2);
        } else {
            const rateKey = `${buyCurrency}-${sellCurrency}`;
            const rate = exchangeRates[rateKey];
            if (rate) {
                const amountToSell = amountToBuy * rate;
                document.getElementById("input-amount").value = amountToSell.toFixed(2);
            } else {
                document.getElementById("input-amount").value = '';
            }
        }
    } else {
        document.getElementById("input-amount").value = '';
    }
}
