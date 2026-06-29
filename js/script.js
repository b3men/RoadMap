// ====================== DADOS GLOBAIS ======================
let roteiros = JSON.parse(localStorage.getItem('roadmap_roteiros')) || [];

// ====================== INICIALIZAÇÃO ======================
function init() {
  if (roteiros.length === 0) {
    roteiros = [
      {
        id: 1,
        titulo: "Europa Central & Alpes",
        destino: "Budapeste → Viena → Praga → St. Moritz",
        dataInicio: "2026-05-02",
        dataFim: "2026-05-16",
        tipo: "manual",
        continente: "Europa",
        estacao: "Primavera",
        descricao: "Viagem cultural e natureza pela Europa Central",
        atividades: ["Chegada em Budapeste", "Passeio pelo Danúbio", "Bernina Express"]
      },
      {
        id: 2,
        titulo: "Praias do Nordeste Brasileiro",
        destino: "Fortaleza → Jericoacoara → Lençóis Maranhenses",
        dataInicio: "2026-01-10",
        dataFim: "2026-01-20",
        tipo: "manual",
        continente: "América do Sul",
        estacao: "Verão",
        descricao: "Sol, mar e dunas incríveis",
        atividades: ["Praia de Jeri", "Dunas de Lençóis", "Passeio de buggy"]
      },
      {
        id: 3,
        titulo: "Japão das Cerejeiras",
        destino: "Tóquio → Quioto → Osaka",
        dataInicio: "2026-03-25",
        dataFim: "2026-04-05",
        tipo: "manual",
        continente: "Ásia",
        estacao: "Primavera",
        descricao: "Sakura e cultura japonesa",
        atividades: ["Templos de Quioto", "Hanami em Tóquio", "Castelo de Osaka"]
      },
      {
        id: 4,
        titulo: "Patagônia Argentina & Chile",
        destino: "Bariloche → Ushuaia → Torres del Paine",
        dataInicio: "2026-07-15",
        dataFim: "2026-07-28",
        tipo: "manual",
        continente: "América do Sul",
        estacao: "Inverno",
        descricao: "Neve, montanhas e paisagens épicas",
        atividades: ["Esqui em Bariloche", "Glaciar Perito Moreno", "Trekking em Torres del Paine"]
      },
      {
        id: 5,
        titulo: "Safári no Quênia",
        destino: "Nairobi → Maasai Mara → Lago Nakuru",
        dataInicio: "2026-09-05",
        dataFim: "2026-09-15",
        tipo: "manual",
        continente: "África",
        estacao: "Primavera",
        descricao: "Aventura selvagem na África",
        atividades: ["Safari no Maasai Mara", "Flamingos no Lago Nakuru", "Reserva de Elefantes"]
      },
      {
        id: 6,
        titulo: "Austrália - Costa Leste",
        destino: "Sydney → Great Barrier Reef → Cairns",
        dataInicio: "2026-11-01",
        dataFim: "2026-11-12",
        tipo: "manual",
        continente: "Oceania",
        estacao: "Primavera",
        descricao: "Praias, recifes e cidades vibrantes",
        atividades: ["Opera House em Sydney", "Mergulho na Grande Barreira", "Floresta Tropical"]
      },
      {
        id: 7,
        titulo: "Canadá - Montanhas Rochosas",
        destino: "Vancouver → Banff → Lake Louise",
        dataInicio: "2026-10-10",
        dataFim: "2026-10-20",
        tipo: "manual",
        continente: "América do Norte",
        estacao: "Outono",
        descricao: "Outono dourado nas montanhas",
        atividades: ["Lake Louise", "Banff National Park", "Gelo no Columbia Icefield"]
      },
      {
        id: 8,
        titulo: "Marrocos - Deserto e Medina",
        destino: "Marrakech → Deserto do Saara → Fez",
        dataInicio: "2026-04-05",
        dataFim: "2026-04-15",
        tipo: "manual",
        continente: "África",
        estacao: "Primavera",
        descricao: "Cultura árabe e deserto",
        atividades: ["Praça Jemaa el-Fna", "Passeio de camelo no Saara", "Medina de Fez"]
      }
    ];

    localStorage.setItem('roadmap_roteiros', JSON.stringify(roteiros));
  }
}

// ====================== DASHBOARD ======================
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
    </div>
  `).join('');
}

// ====================== CRIAR MANUAL ======================
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
  alert("Roteiro criado com sucesso!");
}

// ====================== NAVEGAÇÃO ======================
function verRoteiro(id) {
  localStorage.setItem('roteiroAtual', id);
  window.location.href = 'roteiro.html';
}

// ====================== INICIALIZAÇÃO ======================
init();

if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('index.html')) {
  renderRoteiros();
}