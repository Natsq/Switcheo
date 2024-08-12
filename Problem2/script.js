// ---- Currency Modal Pop Up ---- //

function openSellModal() {
    document.getElementById("sellCurrencyModal").style.display = "flex";
}

function closeSellModal() {
    document.getElementById("sellCurrencyModal").style.display = "none";
}

function openBuyModal() {
    document.getElementById("buyCurrencyModal").style.display = "flex";
}

function closeBuyModal() {
    document.getElementById("buyCurrencyModal").style.display = "none";
}

function selectSellCurrency(currency) {
    document.getElementById("currency-options-sell").value = currency;
    document.getElementById("sellCurrencyImage").src = `images/${currency}.svg`;
    closeSellModal();
}

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

// ---- Exchange Rate Functionalities ---- //

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

function convertCurrency(inputField) {
    const sellCurrency = document.getElementById("currency-options-sell").value;
    const buyCurrency = document.getElementById("currency-options-buy").value;
    let sellAmount = parseFloat(document.getElementById("input-amount").value);
    let buyAmount = parseFloat(document.getElementById("output-amount").value);

    if (sellCurrency && buyCurrency) {
        if (sellCurrency === buyCurrency) {
            // If the sell and buy currencies are the same, just display the same amount
            if (inputField === 'input-amount' && sellAmount > 0) {
                document.getElementById("output-amount").value = sellAmount.toFixed(4);
            } else if (inputField === 'output-amount' && buyAmount > 0) {
                document.getElementById("input-amount").value = buyAmount.toFixed(4);
            }
        } else {
            // input amounts 
            if (inputField === 'input-amount' && sellAmount > 0) {
                const rateKey = `${sellCurrency}-${buyCurrency}`;
                const rate = exchangeRates[rateKey];
                if (rate) {
                    buyAmount = sellAmount * rate;
                    document.getElementById("output-amount").value = buyAmount.toFixed(4);
                } else {
                    document.getElementById("output-amount").value = '';
                }
            // output amounts   
            } else if (inputField === 'output-amount' && buyAmount > 0) {
                const rateKey = `${buyCurrency}-${sellCurrency}`;
                const rate = exchangeRates[rateKey];
                if (rate) {
                    sellAmount = buyAmount * rate;
                    document.getElementById("input-amount").value = sellAmount.toFixed(4);
                } else {
                    document.getElementById("input-amount").value = '';
                }
            }
        }
    } else {
        // Clear both fields if currencies are not selected
        if (inputField === 'input-amount') {
            document.getElementById("output-amount").value = '';
        } else if (inputField === 'output-amount') {
            document.getElementById("input-amount").value = '';
        }
    }
}
