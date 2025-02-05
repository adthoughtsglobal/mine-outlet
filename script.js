function renderCodeToCanvas(codeString, canvasElement) {
    const ctx = canvasElement.getContext("2d");
    const colors = {
        "a": "#FF0000", "b": "#00FF00", "c": "#0000ff", "d": "#FFFF00",
        "e": "#FF00FF", "f": "#00FFFF", "g": "#800000", "h": "#ffffff",
        "i": "#008000", "j": "#b700ffff", "k": "#008080", "l": "#000000", "m": "#6b6b6b"
    };
    const size = 12;
    const pixelSizeX = Math.floor(canvasElement.width / size);
const pixelSizeY = Math.floor(canvasElement.height / size);


    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const index = y * size  + x;
            if (index < codeString.length) {
                ctx.fillStyle = colors[codeString[index]] || "#000000";
                ctx.fillRect(x * pixelSizeX, y * pixelSizeY, pixelSizeX, pixelSizeY);
            }
        }
    }
}

async function renderElements() {
    var response = await fetch("db/elementdb.json");
    var pricingData = await response.json();


    const pricingContainer = document.getElementById("pricing");
    pricingContainer.innerHTML = "";

    Object.entries(pricingData).forEach(([name, data]) => {
        const elementDiv = document.createElement("div");
        elementDiv.className = "element";

        const imgdiv = document.createElement("canvas");
        imgdiv.classList.add("elementImage");
        renderCodeToCanvas(data.img || "ababababababbabababababaababababababbabababababaababababababbabababababaababababababbabababababaababababababbabababababaababababababbabababababa", imgdiv);

        const title = document.createElement("h1");
        title.className = "elementname";
        title.textContent = name;

        const description = document.createElement("p");

        const button = document.createElement("button");
        button.className = "buybtn";
        button.textContent = `${data.value} ${data.unit}`;

        const funnyDescriptions = [
            `${name}: Only ${data.value} ${data.unit} away from making your day a little more interesting!`,
            `Need something new? ${name} is here, and it's yours for just ${data.value} ${data.unit}.`,
            `Get your hands on ${name} today! It’s just ${data.value} ${data.unit} away from being yours.`,
            `Who needs regular stuff when you can own ${name} for only ${data.value} ${data.unit}?`,
            `${name}: Because regular elements are so last season. Only ${data.value} ${data.unit}.`,
            `Add a little spark to your collection with ${name}. It's only ${data.value} ${data.unit}.`,
            `Your life could use some ${name}. For just ${data.value} ${data.unit}, it's all yours!`,
            `Don’t wait! ${name} is just ${data.value} ${data.unit} away from being in your hands.`,
            `Want to spice things up? ${name} is yours for ${data.value} ${data.unit}. You know you want it.`,
            `Take home ${name} today! It’s an investment in mystery, chaos, or maybe just fun, for ${data.value} ${data.unit}.`
        ];

        description.textContent = funnyDescriptions[Math.floor(Math.random() * funnyDescriptions.length)];

        elementDiv.appendChild(imgdiv);
        elementDiv.appendChild(title);
        elementDiv.appendChild(description);
        elementDiv.appendChild(button);
        pricingContainer.appendChild(elementDiv);
    });
}


renderElements();
async function loadHoldings() {
    const response = await fetch('db/usersdb.json');
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