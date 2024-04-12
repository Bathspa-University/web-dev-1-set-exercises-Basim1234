function calculateTotalCost() {
    const petrolCostUSD = parseFloat(document.getElementById('petrol-cost').value);
    const litersPurchased = parseFloat(document.getElementById('liters-purchased').value);

    if (isNaN(petrolCostUSD) || isNaN(litersPurchased)) {
        alert('Please enter valid numbers.');
        return;
    }

    // Assuming exchangeRate is the exchange rate from USD to AED
    const exchangeRate = 3.67; // Example exchange rate, you should update this
    const petrolCostAED = petrolCostUSD * exchangeRate;

    const totalCostAED = petrolCostAED * litersPurchased;
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = <p>Total Cost: <span>${totalCostAED.toFixed(2)} AED</span></p>;
}