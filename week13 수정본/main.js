const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let triangleColor = 'blue';
const trianglePoints = [
    { x: 250, y: 150 },
    { x: 150, y: 400 },
    { x: 350, y: 400 }
];
let rotationAngle = 0;

function drawTriangle(color, points, angle) {
    const centerX = (points[0].x + points[1].x + points[2].x) / 3;
    const centerY = (points[0].y + points[1].y + points[2].y) / 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-centerX, -centerY);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function isInsideTriangle(px, py, v1, v2, v3) {
    // 사용하는 방정식은 벡터의 외적을 기반으로 하는 반평면 테스트입니다.
    function sign(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    const d1 = sign({x: px, y: py}, v1, v2);
    const d2 = sign({x: px, y: py}, v2, v3);
    const d3 = sign({x: px, y: py}, v3, v1);    

    const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    const has_pos = (d1 > 0) || (d2 >   0) || (d3 > 0);

    return (has_pos && !has_neg) || (has_neg && !has_pos);
}

function update() {
    rotationAngle = (rotationAngle + 1) % 360;
    drawTriangle(triangleColor, trianglePoints, rotationAngle);
    requestAnimationFrame(update);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 변환된 삼각형의 좌표를 재계산
    const centerX = (trianglePoints[0].x + trianglePoints[1].x + trianglePoints[2].x) / 3;
    const centerY = (trianglePoints[0].y + trianglePoints[1].y + trianglePoints[2].y) / 3;
    const angleInRadians = rotationAngle * Math.PI / 180;

    // 회전된 좌표 계산
    function rotatePoint(p) {
        return {
            x: Math.cos(angleInRadians) * (p.x - centerX) - Math.sin(angleInRadians) * (p.y - centerY) + centerX,
            y: Math.sin(angleInRadians) * (p.x - centerX) + Math.cos(angleInRadians) * (p.y - centerY) + centerY
        };
    }

    const rotatedPoints = trianglePoints.map(rotatePoint);

    if (isInsideTriangle(x, y, rotatedPoints[0], rotatedPoints[1], rotatedPoints[2])) {
        triangleColor = (triangleColor === 'blue') ? 'red' : 'blue';
    }
    drawTriangle(triangleColor, trianglePoints, rotationAngle);
});

update(); // 애니메이션 시작

