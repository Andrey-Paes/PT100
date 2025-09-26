// ===== Fundo estilo Galáxia =====
const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrelas = [];
for (let i = 0; i < 200; i++) {
  estrelas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    raio: Math.random() * 2,
    velocidade: Math.random() * 0.5 + 0.2,
  });
}

function animar() {
  ctx.fillStyle = "rgba(29, 22, 36, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.beginPath();
  estrelas.forEach((estrela) => {
    ctx.moveTo(estrela.x, estrela.y);
    ctx.arc(estrela.x, estrela.y, estrela.raio, 0, Math.PI * 2);
  });
  ctx.fill();

  estrelas.forEach((estrela) => {
    estrela.y += estrela.velocidade;
    if (estrela.y > canvas.height) {
      estrela.x = Math.random() * canvas.width;
      estrela.y = 0;
    }
  });

  requestAnimationFrame(animar);
}
animar();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== Lógica 4-20mA =====
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

  const resMin = 100;
  const resMax = 138.5;

  let mA = 4 + ((res - resMin) / (resMax - resMin)) * 16;
  if (mA < 4) mA = 4;
  if (mA > 20) mA = 20;

  saidaInput.value = mA.toFixed(2) + " mA";
}

btnCalcular.addEventListener("click", calcularSaida);
