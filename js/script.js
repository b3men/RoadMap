let roteiros = JSON.parse(localStorage.getItem('roadmap_roteiros')) || [];

function init() {
  if (roteiros.length === 0) {
    roteiros = [{
      id: 1,
      titulo: "Europa Central & Alpes Suíços",
      destino: "Budapeste → Viena → Praga → St. Moritz → Milão",
      dataInicio: "2026-05-02",
      dataFim: "2026-05-16",
      tipo: "smart",
      continente: "Europa",
      estacao: "Primavera",
      descricao: "Viagem incrível pela Europa Central gerada por IA",
      atividades: ["Chegada em Budapeste", "Passeio pelo Danúbio", "Bernina Express"]
    }];
    localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));
  }
}

function renderRoteiros() {
  const container = document.getElementById('roteiros-list') || document.getElementById('roteiros-container');
  if (!container) return;

  container.innerHTML = roteiros.map(roteiro => `
    <div class="bg-white rounded-3xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition" onclick="verRoteiro(${roteiro.id})">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-xl">${roteiro.titulo}</h3>
        <span class="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full">${roteiro.tipo === 'smart' ? '🤖 IA' : 'Manual'}</span>
      </div>
      <p class="text-teal-600 mt-2">${roteiro.destino}</p>
      <p class="text-sm text-gray-500 mt-4">${roteiro.dataInicio} até ${roteiro.dataFim}</p>
      
      <div class="mt-6 pt-6 border-t">
        <button onclick="event.stopImmediatePropagation(); verRoteiro(${roteiro.id});" 
                class="w-full bg-teal-600 text-white py-3 rounded-2xl text-sm font-medium">
          Ver Detalhes
        </button>
      </div>
    </div>
  `).join('');
}

async function gerarRoteiroIA(e) {
  e.preventDefault();

  const continente = document.getElementById('smart-continente').value;
  const estacao = document.getElementById('smart-estacao').value;
  const nomeCustom = document.getElementById('smart-nome') ? document.getElementById('smart-nome').value.trim() : '';

  if (!continente || !estacao) {
    alert("Por favor, selecione Continente e Estação.");
    return;
  }

  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = 'Gerando com IA...';

  try {
    const prompt = `Crie um roteiro de viagem para ${continente} na estação de ${estacao}.
                    ${nomeCustom ? `Título: ${nomeCustom}` : ''}
                    Responda apenas com um JSON válido contendo: titulo, destino, descricao, dataInicio, dataFim.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=SUA_CHAVE_GEMINI_AQUI",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const texto = data.candidates[0].content.parts[0].text;

    const jsonMatch = texto.match(/\{[\s\S]*\}/);
    const gerado = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    const novoRoteiro = {
      id: Date.now(),
      titulo: gerado?.titulo || nomeCustom || `Viagem para ${continente}`,
      destino: gerado?.destino || `${continente}`,
      descricao: gerado?.descricao || `Roteiro gerado para ${estacao} em ${continente}`,
      dataInicio: gerado?.dataInicio || "2026-06-01",
      dataFim: gerado?.dataFim || "2026-06-10",
      tipo: "smart",
      continente: continente,
      estacao: estacao,
      atividades: []
    };

    roteiros.push(novoRoteiro);
    localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));

    alert("✅ Roteiro gerado com sucesso!");
    document.getElementById('new-roteiro-modal').classList.add('hidden');
    renderRoteiros();

  } catch (error) {
    console.error(error);
    alert("❌ Erro ao conectar com a IA. Verifique sua chave do Gemini.");
  } finally {
    btn.disabled = false;
    btn.textContent = 'Gerar Roteiro com IA';
  }
}

function criarRoteiroManual(e) {
  e.preventDefault();

  const novo = {
    id: Date.now(),
    titulo: document.getElementById('man-titulo').value,
    destino: document.getElementById('man-destino').value,
    dataInicio: document.getElementById('man-inicio').value,
    dataFim: document.getElementById('man-fim').value,
    tipo: "manual",
    atividades: []
  };

  roteiros.push(novo);
  localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));
  renderRoteiros();
  document.getElementById('new-roteiro-modal').classList.add('hidden');
}

function verRoteiro(id) {
  localStorage.setItem('roteiroAtual', id);
  window.location.href = 'roteiro.html';
}

init();

if (window.location.pathname.includes('dashboard.html')) {
  renderRoteiros();
} else if (window.location.pathname.includes('roteiro.html')) {
  carregarRoteiroAtual();
}