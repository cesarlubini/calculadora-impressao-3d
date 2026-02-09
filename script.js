function calcular() {
    const precoKg = Number(precoKgInput.value) || 0;
    const peso = Number(pesoPeca.value) || 0;
    const custoFilamento = (precoKg / 1000) * peso;

    const horasVal = Number(horas.value) || 0;
    const minutosVal = Math.min(Number(minutos.value) || 0, 59);
    const tempoHoras = horasVal + (minutosVal / 60);

    const potenciaVal = Number(potencia.value) || 0;
    const precoKwhVal = Number(precoKwh.value) || 0;
    const custoEnergia = (potenciaVal / 1000) * tempoHoras * precoKwhVal;

    const mao = Number(maoObra.value) || 0;
    const mat = Number(materiais.value) || 0;
    const emb = Number(embalagem.value) || 0;
    const falhasPerc = Number(falhas.value) || 0;
    const markupVal = Number(markup.value) || 1;

    const subtotal = custoFilamento + custoEnergia + mao + mat + emb;
    const custoFalhas = subtotal * (falhasPerc / 100);
    const custoTotal = subtotal + custoFalhas;
    const precoFinal = custoTotal * markupVal;

    custoFilamentoSpan.innerText = custoFilamento.toFixed(2);
    custoEnergiaSpan.innerText = custoEnergia.toFixed(2);

    rFilamento.innerText = custoFilamento.toFixed(2);
    rEnergia.innerText = custoEnergia.toFixed(2);
    rMao.innerText = mao.toFixed(2);
    rMateriais.innerText = mat.toFixed(2);
    rEmbalagem.innerText = emb.toFixed(2);
    rFalhas.innerText = custoFalhas.toFixed(2);
    rCustoTotal.innerText = custoTotal.toFixed(2);
    rPrecoFinal.innerText = precoFinal.toFixed(2);
}

function salvarValores() {
    ['precoKg', 'potencia', 'precoKwh', 'maoObra', 'falhas', 'markup']
        .forEach(id => localStorage.setItem(id, document.getElementById(id).value));
}

function carregarValores() {
    ['precoKg', 'potencia', 'precoKwh', 'maoObra', 'falhas', 'markup']
        .forEach(id => {
            const v = localStorage.getItem(id);
            if (v !== null) document.getElementById(id).value = v;
        });
}

/* atalhos DOM */
const pesoPeca = document.getElementById('pesoPeca');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const precoKgInput = document.getElementById('precoKg');
const potencia = document.getElementById('potencia');
const precoKwh = document.getElementById('precoKwh');
const maoObra = document.getElementById('maoObra');
const materiais = document.getElementById('materiais');
const embalagem = document.getElementById('embalagem');
const falhas = document.getElementById('falhas');
const markup = document.getElementById('markup');

const custoFilamentoSpan = document.getElementById('custoFilamento');
const custoEnergiaSpan = document.getElementById('custoEnergia');

const rFilamento = document.getElementById('r-filamento');
const rEnergia = document.getElementById('r-energia');
const rMao = document.getElementById('r-maoobra');
const rMateriais = document.getElementById('r-materiais');
const rEmbalagem = document.getElementById('r-embalagem');
const rFalhas = document.getElementById('r-falhas');
const rCustoTotal = document.getElementById('r-custo-total');
const rPrecoFinal = document.getElementById('r-preco-final');

document.addEventListener('DOMContentLoaded', () => {
    carregarValores();
    calcular();
});

document.addEventListener('input', e => {
    if (e.target.tagName === 'INPUT') {
        calcular();
        salvarValores();
    }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
