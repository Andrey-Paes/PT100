function mostrarTipoSensor() {
    const tipo = document.getElementById('tipoSensor').value;
    alert("Tipo de sensor selecionado: " + tipo + " fios");
  }
  
  function mostrarResistencia() {
    const r = document.getElementById('resistencia').value;
    alert("Resistência registrada: " + r + " Ω");
  }
  
  function mostrarFaixa() {
    const faixa = document.getElementById('faixa').value;
    alert("Faixa definida: " + faixa);
  }
  
  function converterTemperatura() {
    const r = parseFloat(document.getElementById('resistencia').value);
    if (isNaN(r)) {
      alert("Digite uma resistência válida.");
      return;
    }
    // Fórmula simplificada para PT-100: T = (R - 100) / 0.385
    const temperatura = ((r - 100) / 0.385).toFixed(2);
    document.getElementById('resultadoTemperatura').innerText = "Temperatura estimada: " + temperatura + " °C";
  }
  
  function calcularCorrente() {
    const faixa = document.getElementById('faixa').value;
    const tempTexto = document.getElementById('resultadoTemperatura').innerText;
    if (!faixa || !tempTexto.includes("Temperatura")) {
      alert("Preencha a faixa e converta a temperatura primeiro!");
      return;
    }
  
    const temperatura = parseFloat(tempTexto.match(/[-+]?[0-9]*\.?[0-9]+/)[0]);
  
    const [min, max] = faixa.split("-").map(v => parseFloat(v.trim()));
    if (isNaN(min) || isNaN(max) || min >= max) {
      alert("Digite uma faixa válida, como 0-100.");
      return;
    }
  
    const corrente = 4 + (16 * (temperatura - min) / (max - min));
    document.getElementById('saidaCorrente').innerText = "Saída em corrente: " + corrente.toFixed(2) + " mA";
  }