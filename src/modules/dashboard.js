function renderList(items, renderer, empty = 'Sem registros') {
  if (!items.length) return `<div class="item compact"><p>${empty}</p></div>`;
  return items.map((i) => renderer(i)).join('');
}

function cadastroModals() {
  return `
  <div class="modal" id="modalPessoaVisita">
    <div class="modal-card">
      <div class="modal-header"><h3>Cadastro de Pessoa / Visita</h3><button class="btn-lite" data-close-modal="modalPessoaVisita">Fechar</button></div>
      <div class="panel-content">
        <form id="formPessoaVisita" class="form-grid-3">
          <div class="field"><label>Tipo de registro *</label><select name="registerType" required><option value="PESSOA">Pessoa</option><option value="VISITA_AGENDADA">Visita agendada</option></select></div>
          <div class="field"><label>Tipo pessoa/visita *</label><select name="type" required><option value="FUNCIONARIO">Funcionário</option><option value="VISITANTE">Visitante</option><option value="FORNECEDOR">Fornecedor</option><option value="ENTREVISTA">Entrevista</option></select></div>
          <div class="field"><label>Nome completo *</label><input name="name" required /></div>
          <div class="field"><label>CPF ou RG *</label><input name="document" required /></div>
          <div class="field"><label>Empresa</label><input name="company" /></div>
          <div class="field"><label>Setor destino</label><input name="sector" /></div>
          <div class="field"><label>Funcionário responsável</label><input name="responsible" /></div>
          <div class="field"><label>Horário agendado</label><input name="scheduledAt" placeholder="09:30" /></div>
          <div class="field"><label>Foto URL</label><input name="photoUrl" placeholder="https://..." /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn-primary" type="submit">Salvar</button></div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="modalEntrega">
    <div class="modal-card">
      <div class="modal-header"><h3>Cadastro de Entrega</h3><button class="btn-lite" data-close-modal="modalEntrega">Fechar</button></div>
      <div class="panel-content">
        <form id="formEntrega" class="form-grid-3">
          <div class="field"><label>Palavra-chave *</label><input name="keyword" required /></div>
          <div class="field"><label>Setor destino *</label><input name="destinationSector" required /></div>
          <div class="field"><label>Fornecedor</label><input name="supplier" /></div>
          <div class="field"><label>Data início *</label><input type="date" name="expectedStart" required /></div>
          <div class="field"><label>Data fim</label><input type="date" name="expectedEnd" /></div>
          <div class="field"><label>Observação</label><input name="observation" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn-primary" type="submit">Salvar</button></div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="modalVeiculo">
    <div class="modal-card">
      <div class="modal-header"><h3>Cadastro de Veículo</h3><button class="btn-lite" data-close-modal="modalVeiculo">Fechar</button></div>
      <div class="panel-content">
        <form id="formVehicleRegistry" class="form-grid-2">
          <div class="field"><label>Tipo *</label><select name="type" required><option>PROPRIO</option><option>TERCEIRO</option></select></div>
          <div class="field"><label>Placa *</label><input name="plate" required /></div>
          <div class="field"><label>Modelo</label><input name="model" /></div>
          <div class="field"><label>Responsável</label><input name="employee" /></div>
          <div class="field"><label>Foto URL</label><input name="photoUrl" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn-primary" type="submit">Salvar</button></div>
        </form>
      </div>
    </div>
  </div>
`;
}

export function dashboardTemplate({ state, activeScreen, todayDeliveries, overdueDeliveries, queryResult }) {
  if (!state.currentUser) {
    return `
      <div class="login-screen">
        <div class="login-card">
          <h1>SIGA TOFFANO</h1>
          <p>Sistema inteligente de gestão de acesso</p>
          <form id="loginForm" class="login-form">
            <label>Usuário</label>
            <input name="username" required />
            <label>Senha</label>
            <input name="password" type="password" required />
            <button class="btn btn-primary" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    `;
  }
  const overdueIds = overdueDeliveries.map((d) => d.id);
  const interviewVisits = state.scheduledVisits.filter((v) => v.visitType === 'ENTREVISTA');
  const otherVisits = state.scheduledVisits.filter((v) => v.visitType !== 'ENTREVISTA');

  return `
<div class="app">
  <aside class="sidebar">
    <h1>🛡️ SIGA TOFFANO</h1>
    <p>Sistema inteligente de gestão de acesso.</p>

    <div class="clock">
      <strong id="clockTime">--:--:--</strong>
      <div id="clockDate">--</div>
    </div>

    <div class="btn-list nav-list">
      <button class="btn btn-primary nav-btn" data-screen="principal">Tela principal</button>
      <button class="btn btn-primary nav-btn" data-screen="cadastros">Cadastros</button>
      <button class="btn btn-primary nav-btn" data-screen="entregas">Entregas</button>
      <button class="btn btn-primary nav-btn" data-screen="visitantes">Visitantes</button>
      <button class="btn btn-primary nav-btn" data-screen="veiculos">Veiculos</button>
      <button class="btn btn-primary nav-btn" data-screen="consulta">Consulta CPF/Placa</button>
    </div>
  </aside>

  <main class="main">
    <header class="main-header">
      <div>
        <h2>${activeScreen === 'principal' ? 'Resumo Operacional' : 'Módulo: ' + activeScreen.toUpperCase()}</h2>
        <p>Usuário logado: ${state.currentUser.name}</p>
      </div>
      <span class="status-pill">Operação ativa</span>
    </header>

    <section class="kpi-row">
      <div class="kpi clickable" data-open-screen="visitantes"><small>Visitas agendadas</small><br><strong>${state.scheduledVisits.length}</strong></div>
      <div class="kpi clickable" data-open-screen="visitantes"><small>Visitas em andamento</small><br><strong>${state.ongoingVisits.length}</strong></div>
      <div class="kpi clickable" data-open-screen="entregas"><small>Entregas do dia</small><br><strong>${todayDeliveries.length}</strong></div>
      <div class="kpi clickable" data-open-screen="entregas"><small>Entregas atrasadas</small><br><strong>${overdueDeliveries.length}</strong></div>
      <div class="kpi clickable" data-open-screen="cadastros"><small>Pessoas cadastradas</small><br><strong>${state.people.length}</strong></div>
      <div class="kpi clickable" data-open-screen="cadastros"><small>Veículos cadastrados</small><br><strong>${state.vehicleRegistry.length}</strong></div>
    </section>

    <section class="grid section ${activeScreen === 'principal' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Visitas (resumo)</div><div class="panel-content">
        ${renderList(state.scheduledVisits.slice(0, 4), (v) => `<div class="item compact"><h4>${v.name}</h4><p>${v.visitType} • ${v.scheduledAt}</p></div>`, 'Sem agendamentos')}
        <button class="btn-lite primary" data-open-screen="visitantes">Abrir tela de visitantes</button>
      </div></article>

      <article class="panel"><div class="panel-header">Entregas (resumo)</div><div class="panel-content">
        ${renderList(todayDeliveries.slice(0, 4), (d) => `<div class="item compact ${overdueIds.includes(d.id) ? 'overdue' : ''}"><h4>${d.keyword}</h4><p>${d.destinationSector}</p></div>`, 'Sem entregas do dia')}
        <button class="btn-lite primary" data-open-screen="entregas">Abrir tela de entregas</button>
      </div></article>

      <article class="panel"><div class="panel-header">Veículos (resumo)</div><div class="panel-content">
        <div class="item compact"><h4>Caminhões recorrentes fora</h4><p>${state.recurringTrucks.filter((t) => t.status === 'FORA').length}</p></div>
        <div class="item compact"><h4>Carros empresa em viagem</h4><p>${state.companyCars.filter((c) => c.inTrip).length}</p></div>
        <button class="btn-lite primary" data-open-screen="veiculos">Abrir tela de veículos</button>
      </div></article>

      <article class="panel"><div class="panel-header">Cadastros (resumo)</div><div class="panel-content">
        <div class="item compact"><h4>Pessoas</h4><p>${state.people.length}</p></div>
        <div class="item compact"><h4>Usuários</h4><p>${state.users.length}</p></div>
        <button class="btn-lite primary" data-open-screen="cadastros">Abrir cadastros</button>
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'cadastros' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Escolha o cadastro</div><div class="panel-content cards-chooser">
        <button class="chooser-card" data-open-modal="modalPessoaVisita"><h4>Pessoa / Visita</h4><p>Funcionário, visitante, fornecedor e entrevista agendada.</p></button>
        <button class="chooser-card" data-open-modal="modalEntrega"><h4>Entrega</h4><p>Cadastro de entrega futura ou por período.</p></button>
        <button class="chooser-card" data-open-modal="modalVeiculo"><h4>Veículo</h4><p>Cadastro de veículos próprios e terceiros.</p></button>
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'entregas' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Tela de Entregas</div><div class="panel-content">
        ${renderList(state.deliveries, (d) => `
          <div class="item compact ${overdueIds.includes(d.id) ? 'overdue' : ''}">
            <h4>${d.keyword}</h4>
            <p>Status: ${d.status} • Setor: ${d.destinationSector}</p>
            <p>Período: ${d.expectedStart}${d.expectedEnd ? ' até ' + d.expectedEnd : ''}</p>
            ${d.status === 'AGENDADA' ? `<button class="btn-lite" data-receive-delivery="${d.id}">Registrar entrega</button>` : '<p>Entrega já recebida</p>'}
          </div>
        `)}
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'visitantes' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Tela de Visitantes</div><div class="panel-content split-two">
        <div>
          <h3>Entrevistas de emprego</h3>
          ${renderList(interviewVisits, (v) => `
            <div class="item compact">
              <h4>${v.name}</h4>
              <p>${v.scheduledAt} • ${v.responsible}</p>
              <button class="btn-lite" data-auto-checkin="${v.id}">Entrada automática</button>
            </div>
          `)}
        </div>
        <div>
          <h3>Outros tipos de visita</h3>
          ${renderList(otherVisits, (v) => `
            <div class="item compact">
              <h4>${v.name}</h4>
              <p>${v.visitType} • ${v.scheduledAt}</p>
              <button class="btn-lite" data-auto-checkin="${v.id}">Entrada automática</button>
            </div>
          `)}
        </div>
      </div></article>

      <article class="panel"><div class="panel-header">Visitantes em andamento</div><div class="panel-content">
        ${renderList(state.ongoingVisits, (v) => `
          <div class="item compact">
            <h4>${v.name}</h4>
            <p>Entrada: ${v.entryAt} • Setor: ${v.sector}</p>
            <button class="btn-lite" data-exit-visit="${v.id}">Registrar saída</button>
          </div>
        `, 'Sem visitantes em andamento')}
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'veiculos' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Facilitadores - caminhões recorrentes</div><div class="panel-content">
        ${renderList(state.recurringTrucks, (t) => `
          <div class="item compact">
            <h4>${t.label} (${t.plate})</h4>
            <p>Rota: ${t.route} • Status: ${t.status}</p>
            <button class="btn-lite" data-toggle-truck="${t.id}">${t.status === 'PARADO' ? 'Registrar saída' : 'Registrar retorno'}</button>
          </div>
        `)}
      </div></article>

      <article class="panel"><div class="panel-header">Carros de funcionários (entrada/saída)</div><div class="panel-content">
        ${renderList(state.employeeCars, (c) => `
          <div class="item compact">
            <h4>${c.employee} (${c.plate})</h4>
            <p>Status: ${c.inside ? 'DENTRO' : 'FORA'} • Última entrada: ${c.lastEntryAt || '-'}</p>
            <button class="btn-lite" data-toggle-employee-car="${c.id}">${c.inside ? 'Registrar saída' : 'Registrar entrada'}</button>
          </div>
        `)}
      </div></article>

      <article class="panel"><div class="panel-header">Carros da empresa (saída/retorno com KM)</div><div class="panel-content">
        ${renderList(state.companyCars, (c) => `
          <div class="item compact">
            <h4>${c.name} (${c.plate})</h4>
            <p>Status: ${c.inTrip ? 'EM VIAGEM' : 'DISPONÍVEL'} • KM saída: ${c.kmOut ?? '-'} • KM retorno: ${c.kmIn ?? '-'}</p>
            ${c.inTrip ? `<button class="btn-lite" data-company-return="${c.id}">Registrar retorno</button>` : `<button class="btn-lite" data-company-exit="${c.id}">Registrar saída</button>`}
          </div>
        `)}
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'consulta' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Consulta por CPF/Placa</div><div class="panel-content">
        <form id="formConsulta" class="form-grid-3">
          <div class="field"><label>CPF/RG</label><input name="document" /></div>
          <div class="field"><label>Placa</label><input name="plate" /></div>
          <div class="field"><label>&nbsp;</label><button class="btn btn-primary" type="submit">Consultar</button></div>
        </form>
        <hr>
        ${renderList(queryResult || [], (r) => `
          <div class="item compact">
            <h4>${r.kind} • ${r.name || r.label || '-'}</h4>
            <p>Placa: ${r.plate || '-'} • Ação: ${r.action || 'Entrada/Saída visita'}</p>
            <p>Registro: ${r.dateTime || (r.entryAt + ' / ' + r.exitAt)} • Usuário: ${r.user}</p>
          </div>
        `, 'Sem resultados para a consulta atual')}
      </div></article>
    </section>
  </main>
</div>
${cadastroModals()}
`;
}
