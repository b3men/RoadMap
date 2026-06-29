let roteiros = JSON.parse(localStorage.getItem('roadmap_roteiros')) || [];

function init() {
  if (roteiros.length === 0) {
    roteiros = [{
      id: 1,
      titulo: "Europa Central & Alpes Suíços",
      destino: "Budapeste → Viena → Praga → St. Moritz → Milão",
      dataInicio: "2026-05-02",
      dataFim: "2026-05-16",
      status: "Planejado",
      atividades: ["Chegada em Budapeste", "Passeio Danúbio", "Bernina Express"],
      documentos: []
    }];
    localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));
  }
}

function fazerLogin() {
  window.location.href = 'dashboard.html';
}

function renderRoteiros() {
  const container = document.getElementById('roteiros-list');
  if (!container) return;

  container.innerHTML = '';

  roteiros.forEach(roteiro => {
    const cardHTML = `
      <div class="bg-white rounded-3xl shadow-lg p-6 card cursor-pointer" onclick="verRoteiro(${roteiro.id})">
        <div class="flex justify-between">
          <h3 class="font-semibold text-xl">${roteiro.titulo}</h3>
          <span class="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full">${roteiro.status}</span>
        </div>
        <p class="text-teal-600 mt-2">${roteiro.destino}</p>
        <p class="text-sm text-gray-500 mt-4">${roteiro.dataInicio} até ${roteiro.dataFim}</p>
        
        <div class="mt-6 pt-6 border-t flex gap-2">
          <button onclick="event.stopImmediatePropagation(); verRoteiro(${roteiro.id});" 
                  class="flex-1 bg-teal-600 text-white py-3 rounded-2xl text-sm font-medium">
            Ver Detalhes
          </button>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function novaViagem() {
  const titulo = prompt("Nome do novo roteiro:");
  if (!titulo) return;

  const novo = {
    id: Date.now(),
    titulo: titulo,
    destino: prompt("Destino principal (ex: Paris, Itália):") || "Destino a definir",
    dataInicio: "2026-06-01",
    dataFim: "2026-06-10",
    status: "Planejado",
    atividades: [],
    documentos: []
  };

  roteiros.push(novo);
  localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));
  renderRoteiros();
  alert("Roteiro criado com sucesso!");
}

function verRoteiro(id) {
  localStorage.setItem('roteiroAtual', id);
  window.location.href = 'roteiro.html';
}

function carregarRoteiroAtual() {
  const id = parseInt(localStorage.getItem('roteiroAtual'));
  const roteiro = roteiros.find(r => r.id === id);
  const container = document.getElementById('roteiro-content');
  
  if (!roteiro || !container) return;

  container.innerHTML = `
    <div class="bg-white rounded-3xl shadow-xl p-10">
        <h1 class="text-4xl font-bold text-gray-800">${roteiro.titulo}</h1>
        <p class="text-2xl text-teal-600 mt-2">${roteiro.destino}</p>
        <p class="text-gray-500 mt-1">${roteiro.dataInicio} — ${roteiro.dataFim}</p>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
            <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
                <i class="fa-solid fa-list-check"></i> Atividades
            </h3>
            <ul class="space-y-3">
                ${roteiro.atividades.map(at => `<li class="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl"><i class="fa-solid fa-circle-check text-teal-500"></i> ${at}</li>`).join('')}
            </ul>
            </div>

            <div>
            <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
                <i class="fa-solid fa-folder-open"></i> Documentos
            </h3>
            <p class="text-gray-500">Nenhum documento anexado ainda.</p>
            <button onclick="alert('Funcionalidade de upload em desenvolvimento')" 
                    class="mt-4 text-teal-600 hover:underline">+ Adicionar Documento</button>
            </div>
        </div>

        <div class="mt-12 pt-8 border-t">
            <button onclick="window.location.href='dashboard.html'" 
                    class="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-2xl font-medium">Voltar para Dashboard
            </button>
        </div>
    </div>
  `;
}

// Inicialização
init();

if (window.location.pathname.includes('dashboard.html')) {
  renderRoteiros();
} else if (window.location.pathname.includes('roteiro.html')) {
  carregarRoteiroAtual();
}