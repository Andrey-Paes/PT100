const canvas = document.getElementById("sensor");
const ctx = canvas.getContext("2d");

// Escala do sensor
const scale = 1.5;
ctx.save();
ctx.scale(scale, scale);

// --- Desenho do corpo do sensor ---
ctx.beginPath();
ctx.moveTo(90, 240);
ctx.lineTo(315, 220);
ctx.lineTo(290, 450);
ctx.lineTo(110, 450);
ctx.closePath();
ctx.fillStyle = "#4a4a4aff";
ctx.fill();

// Corpo circular com gradiente radial
ctx.beginPath();
ctx.arc(200, 200, 130, 0, 2 * Math.PI);
const grad = ctx.createRadialGradient(200, 200, 60, 200, 200, 130);
grad.addColorStop(0, "#a4a4a4ff");
grad.addColorStop(1, "#2b2a2aff");
ctx.fillStyle = grad;
ctx.fill();

// Base inferior
ctx.beginPath();
ctx.moveTo(110, 450);
ctx.lineTo(290, 450);
ctx.lineTo(280, 470);
ctx.lineTo(120, 470);
ctx.closePath();
ctx.fillStyle = "#424242ff";
ctx.fill();

// --- Desenho dos fios (antes dos parafusos para ficarem atrás) ---
function fio(cor, x1, y1, x2, y2, cx1, cy1, cx2, cy2) {
  if (cor === "black") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
  ctx.strokeStyle = cor;
  ctx.lineWidth = 6;
  ctx.stroke();
}

// Chamando os fios
fio("black", 150, 130, 180, 20, 50, 110, 15, 10);
fio("red", 250, 130, 180, 20, 390, 70, 340, 5);
fio("white", 150, 250, 200, 200, 150, 200, 180, 200);
fio("white", 200, 250, 200, 200, 200, 150, 200, 300);
fio("red", 250, 250, 200, 200, 250, 200, 220, 200);

// --- Desenho dos parafusos (depois dos fios) ---
function parafuso(x, y) {
  // corpo do parafuso
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = "#cbc6c6";
  ctx.fill();

  // contorno do parafuso
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.strokeStyle = "#565555";
  ctx.lineWidth = 2;
  ctx.stroke();

  // cruz do parafuso
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.moveTo(x, y - 10);
  ctx.lineTo(x, y + 10);
  ctx.strokeStyle = "#565555";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Chamando os parafusos
parafuso(150, 130);
parafuso(250, 130);
parafuso(150, 250);
parafuso(200, 250);
parafuso(250, 250);

ctx.restore();

// --- Lógica de cálculo 4-20mA ---
const faixaInput = document.getElementById("faixa");
const resInput = document.getElementById("res");
const saidaInput = document.getElementById("saida");
const btnCalcular = document.getElementById("btnCalcular");

function calcularSaida() {
  const faixa = parseFloat(faixaInput.value);
  const res = parseFloat(resInput.value);

  if (isNaN(faixa) || isNaN(res) || faixa < 0 || faixa > 150) {
    alert("Digite valores válidos: faixa 0-150 °C e resistência correta.");
    return;
  }

  const resMin = 100; // 0°C
  const resMax = 138.5; // 150°C

  let mA = 4 + ((res - resMin) / (resMax - resMin)) * 16;

  if (mA < 4) mA = 4;
  if (mA > 20) mA = 20;

  saidaInput.value = mA.toFixed(2) + " mA";
}

btnCalcular.addEventListener("click", calcularSaida);
