const canvas = document.getElementById("sensor");
const ctx = canvas.getContext("2d");

// Escala do sensor
const scale = 1.5;
ctx.save();
ctx.scale(scale, scale);

// --- Desenho do sensor ---
ctx.beginPath();
ctx.moveTo(90, 240);
ctx.lineTo(315, 220);
ctx.lineTo(290, 450);
ctx.lineTo(110, 450);
ctx.closePath();
ctx.fillStyle = "#4a4a4aff";
ctx.fill();

ctx.arc(200, 200, 130, 0, 2 * Math.PI);
const grad = ctx.createRadialGradient(200, 200, 60, 200, 200, 130);
grad.addColorStop(0, "#a4a4a4ff");
grad.addColorStop(1, "#2b2a2aff");
ctx.fillStyle = grad;
ctx.fill();

ctx.beginPath();
ctx.moveTo(110, 450);
ctx.lineTo(290, 450);
ctx.lineTo(280, 470);
ctx.lineTo(120, 470);
ctx.closePath();
ctx.fillStyle = "#424242ff";
ctx.fill();

ctx.arc(200, 200, 0, 0, 0 * Math.PI);
ctx.strokeStyle = "#565555ff";
ctx.lineWidth = 2.0;

function parafuso(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = "#afa7a7ff";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 10, y);
  ctx.moveTo(x, y - 10);
  ctx.lineTo(x, y + 10);
  ctx.stroke();
}

parafuso(150, 130);
parafuso(250, 130);
parafuso(150, 250);
parafuso(200, 250);
parafuso(250, 250);

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

fio("black", 150, 130, 180, 20, 50, 110, 15, 10);
fio("red", 250, 130, 180, 20, 390, 70, 340, 5);
fio("white", 150, 250, 200, 200, 150, 200, 180, 200);
fio("white", 200, 250, 200, 200, 200, 150, 200, 300);
fio("red", 250, 250, 200, 200, 250, 200, 220, 200);

ctx.restore();

// --- Lógica de cálculo 4-20mA ---
const faixaInput = document.getElementById("faixa");
const resInput = document.getElementById("res");
const saidaInput = document.getElementById("saida");
const btnCalcular = document.getElementById("btnCalcular");

// Fórmula de conversão linear: mA = 4 + (res - resMin) * 16 / (resMax - resMin)
// Para PT100 padrão, resMin = 100Ω (0°C), resMax = 138.5Ω (150°C)
function calcularSaida() {
  const faixa = parseFloat(faixaInput.value);
  const res = parseFloat(resInput.value);

  if (isNaN(faixa) || isNaN(res) || faixa < 0 || faixa > 150) {
    alert("Digite valores válidos: faixa 0-150 °C e resistência correta.");
    return;
  }

  // PT100: 0°C = 100Ω, 150°C = 138.5Ω
  const resMin = 100;
  const resMax = 138.5;

  // Conversão linear
  let mA = 4 + ((res - resMin) / (resMax - resMin)) * 16;

  // Limita de 4 a 20 mA
  if (mA < 4) mA = 4;
  if (mA > 20) mA = 20;

  saidaInput.value = mA.toFixed(2) + " mA";
}

btnCalcular.addEventListener("click", calcularSaida);
