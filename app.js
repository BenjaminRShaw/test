const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasButton = document.getElementById('clearCanvas');
const saveDrawingButton = document.getElementById('saveDrawing');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

clearCanvasButton.addEventListener('click', clearCanvas);
saveDrawingButton.addEventListener('click', saveDrawing);

function startDrawing(e) {
    drawing = true;
    draw(e); // to start drawing immediately when mousedown
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // resets the current path
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}
