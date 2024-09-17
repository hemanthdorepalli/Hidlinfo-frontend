document.addEventListener('DOMContentLoaded', () => {
    fetch('https://hodlinfo-backend-2.onrender.com/api/crypto')
        .then(response => response.json())
        .then(data => {
            // Populate best price
            const bestPrice = data.reduce((max, crypto) => crypto.last > max ? crypto.last : max, 0);
            document.getElementById('best-price').textContent = `₹ ${bestPrice.toLocaleString()}`;

            // Populate table
            const tbody = document.getElementById('crypto-data');
            data.forEach((crypto, index) => {
                const row = document.createElement('tr');

                const difference = ((crypto.sell - crypto.buy) / crypto.buy * 100).toFixed(2);
              const savings = Math.abs(crypto.sell - crypto.buy).toLocaleString();

                row.innerHTML = `
                    <td><h3>${index + 1}</h3></td>
                    <td><h3>${crypto.name}</h3></td>
                    <td> <h3>₹ ${crypto.last.toLocaleString()}</h3></td>
                    <td> <h3>₹ ${crypto.buy.toLocaleString()} / ₹ ${crypto.sell.toLocaleString()}</h3></td>
                    <td style="color: ${difference >= 0 ? '#4caf50' : '#f44336'};"><h3>${difference} %</h3></td>
                    <td style="color: ${crypto.sell > crypto.buy ? '#4caf50' : '#f44336'};"><h3>${crypto.sell > crypto.buy ? '▲' : '▼'} ₹ ${savings}</h3></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

