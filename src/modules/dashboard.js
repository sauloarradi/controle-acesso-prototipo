function renderList(items, renderer, empty = 'Sem registros') {
  if (!items.length) return `<div class="item"><p>${empty}</p></div>`;
  return items.map((i) => `<div class="item">${renderer(i)}</div>`).join('');
}

function overdueClass(delivery, overdueIds) {
  return overdueIds.includes(delivery.id) ? 'item overdue' : 'item';
}

export function dashboardTemplate({ state, activeScreen, todayDeliveries, overdueDeliveries, queryResult }) {
  const overdueIds = overdueDeliveries.map((d) => d.id);
  const interviewVisits = state.scheduledVisits.filter((v) => v.visitType === 'ENTREVISTA');
  const otherVisits = state.scheduledVisits.filter((v) => v.visitType !== 'ENTREVISTA');

  return `
<div class="app">
  <aside class="sidebar">
    <h1>🛡️ Portaria Rodoin</h1>
    <p>Sistema operacional de controle de acesso.</p>

    <div class="clock">
      <strong id="clockTime">--:--:--</strong>
      <div id="clockDate">--</div>
    </div>

    <div class="btn-list nav-list">
      <button class="btn btn-primary nav-btn" data-screen="principal">Tela principal</button>
      <button class="btn btn-primary nav-btn" data-screen="entregas">Tela de entregas</button>
      <button class="btn btn-primary nav-btn" data-screen="visitantes">Tela de visitantes</button>
      <button class="btn btn-primary nav-btn" data-screen="veiculos">Tela de veículos</button>
      <button class="btn btn-primary nav-btn" data-screen="consulta">Consulta CPF/Placa</button>
    </div>
  </aside>

  <main class="main">
    <header class="main-header">
      <div>
        <h2>${activeScreen === 'principal' ? 'Resumo Operacional' : 'Módulo: ' + activeScreen.toUpperCase()}</h2>
        <p>Usuário logado: ${state.currentUser}</p>
      </div>
      <span class="status-pill">Operação ativa</span>
    </header>

    <section class="kpi-row">
      <div class="kpi clickable" data-open-screen="visitantes"><small>Visitas agendadas</small><br><strong>${state.scheduledVisits.length}</strong></div>
      <div class="kpi clickable" data-open-screen="visitantes"><small>Visitas em andamento</small><br><strong>${state.ongoingVisits.length}</strong></div>
      <div class="kpi clickable" data-open-screen="entregas"><small>Entregas do dia</small><br><strong>${todayDeliveries.length}</strong></div>
      <div class="kpi clickable" data-open-screen="entregas"><small>Entregas atrasadas</small><br><strong>${overdueDeliveries.length}</strong></div>
    </section>

    <section class="grid section ${activeScreen === 'principal' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Visitas (resumo)</div><div class="panel-content">
        ${renderList(state.scheduledVisits.slice(0, 3), (v) => `<h4>${v.name}</h4><p>${v.visitType} • ${v.scheduledAt}</p>`, 'Sem agendamentos')}
        <button class="btn-lite primary" data-open-screen="visitantes">Abrir tela de visitantes</button>
      </div></article>

      <article class="panel"><div class="panel-header">Entregas (resumo)</div><div class="panel-content">
        ${renderList(todayDeliveries.slice(0, 3), (d) => `<h4>${d.keyword}</h4><p>${d.destinationSector} • ${d.expectedStart}</p>`, 'Sem entregas do dia')}
        <button class="btn-lite primary" data-open-screen="entregas">Abrir tela de entregas</button>
      </div></article>

      <article class="panel"><div class="panel-header">Veículos (resumo)</div><div class="panel-content">
        <div class="item"><h4>Caminhões recorrentes fora</h4><p>${state.recurringTrucks.filter((t) => t.status === 'FORA').length}</p></div>
        <div class="item"><h4>Carros empresa em viagem</h4><p>${state.companyCars.filter((c) => c.inTrip).length}</p></div>
        <button class="btn-lite primary" data-open-screen="veiculos">Abrir tela de veículos</button>
      </div></article>

      <article class="panel"><div class="panel-header">Consulta</div><div class="panel-content">
        <div class="item"><h4>CPF / Placa</h4><p>Histórico consolidado de visitas e veículos.</p></div>
        <button class="btn-lite primary" data-open-screen="consulta">Abrir consulta</button>
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'entregas' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Tela de Entregas</div><div class="panel-content">
        ${renderList(state.deliveries, (d) => `
          <div class="${overdueClass(d, overdueIds)}">
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
            <h4>${v.name}</h4>
            <p>${v.scheduledAt} • ${v.responsible}</p>
            <button class="btn-lite" data-auto-checkin="${v.id}">Entrada automática</button>
          `)}
        </div>
        <div>
          <h3>Outros tipos de visita</h3>
          ${renderList(otherVisits, (v) => `
            <h4>${v.name}</h4>
            <p>${v.visitType} • ${v.scheduledAt}</p>
            <button class="btn-lite" data-auto-checkin="${v.id}">Entrada automática</button>
          `)}
        </div>
      </div></article>

      <article class="panel"><div class="panel-header">Visitantes em andamento</div><div class="panel-content">
        ${renderList(state.ongoingVisits, (v) => `
          <h4>${v.name}</h4>
          <p>Entrada: ${v.entryAt} • Setor: ${v.sector}</p>
          <button class="btn-lite" data-exit-visit="${v.id}">Registrar saída</button>
        `, 'Sem visitantes em andamento')}
      </div></article>
    </section>

    <section class="single-section ${activeScreen === 'veiculos' ? 'visible' : ''}">
      <article class="panel"><div class="panel-header">Facilitadores - caminhões recorrentes</div><div class="panel-content">
        ${renderList(state.recurringTrucks, (t) => `
          <h4>${t.label} (${t.plate})</h4>
          <p>Rota: ${t.route} • Status: ${t.status}</p>
          <button class="btn-lite" data-toggle-truck="${t.id}">${t.status === 'PARADO' ? 'Registrar saída' : 'Registrar retorno'}</button>
        `)}
      </div></article>

      <article class="panel"><div class="panel-header">Carros de funcionários (entrada/saída)</div><div class="panel-content">
        ${renderList(state.employeeCars, (c) => `
          <h4>${c.employee} (${c.plate})</h4>
          <p>Status: ${c.inside ? 'DENTRO' : 'FORA'} • Última entrada: ${c.lastEntryAt || '-'}</p>
          <button class="btn-lite" data-toggle-employee-car="${c.id}">${c.inside ? 'Registrar saída' : 'Registrar entrada'}</button>
        `)}
      </div></article>

      <article class="panel"><div class="panel-header">Carros da empresa (saída/retorno com KM)</div><div class="panel-content">
        ${renderList(state.companyCars, (c) => `
          <h4>${c.name} (${c.plate})</h4>
          <p>Status: ${c.inTrip ? 'EM VIAGEM' : 'DISPONÍVEL'} • KM saída: ${c.kmOut ?? '-'} • KM retorno: ${c.kmIn ?? '-'}</p>
          ${c.inTrip ? `<button class="btn-lite" data-company-return="${c.id}">Registrar retorno</button>` : `<button class="btn-lite" data-company-exit="${c.id}">Registrar saída</button>`}
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
          <h4>${r.kind} • ${r.name || r.label || '-'}</h4>
          <p>Placa: ${r.plate || '-'} • Ação: ${r.action || 'Entrada/Saída visita'}</p>
          <p>Registro: ${r.dateTime || (r.entryAt + ' / ' + r.exitAt)} • Usuário: ${r.user}</p>
        `, 'Sem resultados para a consulta atual')}
      </div></article>
    </section>
  </main>
</div>
`;
}
