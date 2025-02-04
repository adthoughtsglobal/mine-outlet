
async function renderElements() {
    var response = await fetch("db/elementdb.json");
    var pricingData = await response.json();


    const pricingContainer = document.getElementById("pricing");
    pricingContainer.innerHTML = "";

    Object.entries(pricingData).forEach(([name, data]) => {
        const elementDiv = document.createElement("div");
        elementDiv.className = "element";

        const title = document.createElement("h1");
        title.className = "elementname";
        title.textContent = name;

        const description = document.createElement("p");
        description.textContent = `${name} available for purchase.`;

        const button = document.createElement("button");
        button.className = "buybtn";
        button.textContent = `${data.value} ${data.unit}`;

        elementDiv.appendChild(title);
        elementDiv.appendChild(description);
        elementDiv.appendChild(button);
        pricingContainer.appendChild(elementDiv);
    });
}


renderElements();
async function loadHoldings() {
    const response = await fetch('/db/usersdb.json');
    const data = await response.json();
    delete data.info;

    const users = Object.entries(data)
        .map(([user, materials]) => ({
            user,
            materials,
            total: Object.values(materials).reduce((a, b) => a + b, 0)
        }))
        .sort((a, b) => b.total - a.total);

    const holdingsDiv = document.getElementById('holdings');
    holdingsDiv.innerHTML = '';

    users.forEach(({ user, materials }, index) => {
        const table = document.createElement('table');
        table.classList.add("userdbtable");
        table.innerHTML = `<caption>${user} <small>#${index + 1}</small></caption>
            <tr><th>Material</th><th>Amount (grams)</th></tr>` +
            Object.entries(materials).map(([material, amount]) =>
                `<tr><td>${material}</td><td>${amount}</td></tr>`
            ).join('');
        holdingsDiv.appendChild(table);
    });
}

loadHoldings();