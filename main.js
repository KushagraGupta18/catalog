document.getElementById("solveButton").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) {
        alert("Please upload a JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const jsonData = JSON.parse(event.target.result);
        solvePolynomial(jsonData);
    };
    reader.readAsText(fileInput);
});

function decodeValue(base, value) {
    return parseInt(value, base);
}

function solvePolynomial(data) {
    const { n, k } = data.keys;
    const points = [];

    for (let i = 1; i <= n; i++) {
        const base = parseInt(data[i].base);
        const value = data[i].value;
        const x = i; 
        const y = decodeValue(base, value);
        points.push([x, y]);
    }

    const secret = lagrangeInterpolation(points, 0); // Solving at x = 0
    document.getElementById("result").innerText = `The secret constant (c) is: ${secret}`;
}

function lagrangeInterpolation(points, x) {
    let secret = 0;
    const k = points.length;
    
    for (let i = 0; i < k; i++) {
        let term = points[i][1];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        secret += term;
    }
    
    return Math.round(secret);
}
