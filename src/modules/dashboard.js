function renderItems(items, mapper) {
  return items.map((item) => `<div class="item">${mapper(item)}</div>`).join('');
}

export function dashboardTemplate(state) {
  return `
  <div class="app">
    <aside class="sidebar">
      <h1>🛡️ Controle de Acesso</h1>
      <p>Portaria corporativa (versão sem ADVPL, pronta para expansão multiempresa).</p>

      <div class="clock">
        <strong id="clockTime">--:--:--</strong>
        <div id="clockDate">--</div>
      </div>

      <div class="btn-list">
        <button class="btn btn-primary" data-action="open-visitor-modal">👤 Registrar entrada visitante</button>
        <button class="btn btn-danger" data-action="register-visitor-exit">🚪 Registrar saída visitante</button>
        <button class="btn btn-success" data-action="open-delivery-modal">📦 Cadastrar entrega futura</button>
        <button class="btn btn-warning" data-action="register-delivery">✅ Registrar recebimento entrega</button>
        <button class="btn btn-primary" data-action="open-search-modal">🔎 Consulta CPF/Placa</button>
      </div>

      <div class="sidebar-note">
        • Sem integração de câmeras.<br>
        • Banco de dados dedicado (fora do Protheus).<br>
        • Auditoria obrigatória em entrada/saída/entrega.
      </div>
    </aside>

    <main class="main">
      <header class="main-header">
        <div>
          <h2>Tela Principal da Portaria</h2>
          <p>Visitas agendadas, visitantes internos e entregas do dia.</p>
        </div>
        <span class="status-pill">Operação ativa</span>
      </header>

      <section class="kpi-row">
        <div class="kpi"><small>Visitas agendadas</small><br><strong>${state.scheduledVisits.length}</strong></div>
        <div class="kpi"><small>Visitantes internos</small><br><strong>${state.internalVisitors.length}</strong></div>
        <div class="kpi"><small>Entregas do dia</small><br><strong>${state.todayDeliveries.length}</strong></div>
        <div class="kpi"><small>Entregas recebidas</small><br><strong>${state.deliveredCount}</strong></div>
      </section>

      <section class="grid">
        <article class="panel">
          <div class="panel-header">📅 Visitas Agendadas <span class="badge">${state.scheduledVisits.length}</span></div>
          <div class="panel-content">
            ${renderItems(state.scheduledVisits, (visit) => `
              <h4>${visit.name}</h4>
              <p>${visit.sector} • Resp. ${visit.responsible}</p>
              <p>Horário previsto: ${visit.time}</p>
            `)}
          </div>
          <div class="panel-actions">
            <button class="btn-lite" data-action="open-visitor-modal">Cadastrar visita</button>
            <button class="btn-lite primary" data-action="auto-checkin">Entrada automática</button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header">🏢 Visitantes Internos <span class="badge">${state.internalVisitors.length}</span></div>
          <div class="panel-content">
            ${renderItems(state.internalVisitors, (visitor) => `
              <h4>${visitor.name}</h4>
              <p>Entrada: ${visitor.entryTime} • Permanência: ${visitor.duration}</p>
              <p>Setor: ${visitor.sector}</p>
            `)}
          </div>
          <div class="panel-actions">
            <button class="btn-lite primary" data-action="register-visitor-exit">Registrar saída</button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header">📦 Entregas Agendadas (Hoje) <span class="badge">${state.todayDeliveries.length}</span></div>
          <div class="panel-content">
            ${renderItems(state.todayDeliveries, (delivery) => `
              <h4>${delivery.item}</h4>
              <p>Setor: ${delivery.destination} • ${delivery.supplier}</p>
              <p>Período: ${delivery.period}</p>
            `)}
          </div>
          <div class="panel-actions">
            <button class="btn-lite" data-action="open-delivery-modal">Nova entrega futura</button>
            <button class="btn-lite primary" data-action="register-delivery">Registrar recebimento</button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-header">🧾 Cadastros e Consulta</div>
          <div class="panel-content">
            <div class="item"><h4>Cadastro de Pessoas</h4><p>Funcionário, fornecedor, visitante + foto.</p></div>
            <div class="item"><h4>Cadastro de Veículos</h4><p>Próprios, terceiros e vínculo veículo x funcionário.</p></div>
            <div class="item"><h4>Cadastro de Entregas</h4><p>Data única ou período + observação.</p></div>
            <div class="item"><h4>Cadastro de Usuários</h4><p>Perfis, permissões e rastreabilidade.</p></div>
            <div class="item"><h4>Consulta CPF/Placa</h4><p>Histórico de entradas e saídas.</p></div>
          </div>
        </article>
      </section>
    </main>
  </div>
  `;
}
