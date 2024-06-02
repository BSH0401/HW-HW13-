const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let triangleColor = 'blue';
const trianglePoints = [
    { x: 100, y: 350 },
    { x: 300, y: 350 },
    { x: 200, y: 50 }
];

function drawTriangle(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);
    ctx.lineTo(trianglePoints[1].x, trianglePoints[1].y);
    ctx.lineTo(trianglePoints[2].x, trianglePoints[2].y);
    ctx.closePath();
    ctx.fill();
}

drawTriangle(triangleColor);

function pointInTriangle(px, py, v1, v2, v3) {
    const areaOrig = Math.abs((v2.x - v1.x) * (v3.y - v1.y) - (v3.x - v1.x) * (v2.y - v1.y));
    const area1 = Math.abs((v1.x - px) * (v2.y - py) - (v2.x - px) * (v1.y - py));
    const area2 = Math.abs((v2.x - px) * (v3.y - py) - (v3.x - px) * (v2.y - py));
    const area3 = Math.abs((v3.x - px) * (v1.y - py) - (v1.x - px) * (v3.y - py));

    return (area1 + area2 + area3 == areaOrig);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (pointInTriangle(x, y, trianglePoints[0], trianglePoints[1], trianglePoints[2])) {
        triangleColor = (triangleColor === 'blue') ? 'red' : 'blue';
    } else {
        triangleColor = 'blue';
    }

    drawTriangle(triangleColor);
});
