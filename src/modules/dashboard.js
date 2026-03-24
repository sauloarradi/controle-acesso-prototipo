function card(title, body) {
  return `<article class="panel"><div class="panel-header">${title}</div><div class="panel-content">${body}</div></article>`;
}

function renderList(items, mapper, emptyMessage = 'Sem registros') {
  if (!items.length) return `<div class="item"><p>${emptyMessage}</p></div>`;
  return items.map((item) => `<div class="item">${mapper(item)}</div>`).join('');
}

export function dashboardTemplate({ state, todayDeliveries, activeSection, queryResult }) {
  return `
<div class="app">
  <aside class="sidebar">
    <h1>🛡️ Controle de Acesso</h1>
    <p>Protótipo funcional alinhado ao documento da portaria.</p>

    <div class="clock">
      <strong id="clockTime">--:--:--</strong>
      <div id="clockDate">--</div>
    </div>

    <div class="btn-list nav-list">
      <button class="btn btn-primary nav-btn" data-nav="principal">Tela principal</button>
      <button class="btn btn-primary nav-btn" data-nav="pessoas">Cadastro pessoas</button>
      <button class="btn btn-primary nav-btn" data-nav="veiculos">Cadastro veículos</button>
      <button class="btn btn-primary nav-btn" data-nav="entregas">Cadastro entregas</button>
      <button class="btn btn-primary nav-btn" data-nav="usuarios">Cadastro usuários</button>
      <button class="btn btn-primary nav-btn" data-nav="consulta">Consulta CPF/Placa</button>
    </div>
  </aside>

  <main class="main">
    <header class="main-header">
      <div>
        <h2>${activeSection === 'principal' ? 'Tela Principal' : 'Módulo: ' + activeSection.toUpperCase()}</h2>
        <p>Usuário logado: ${state.currentUser}</p>
      </div>
      <span class="status-pill">Sem câmeras • Auditoria ativa</span>
    </header>

    <section class="kpi-row">
      <div class="kpi"><small>Visitas agendadas</small><br><strong>${state.scheduledVisits.length}</strong></div>
      <div class="kpi"><small>Visitas em andamento</small><br><strong>${state.ongoingVisits.length}</strong></div>
      <div class="kpi"><small>Entregas do dia atual</small><br><strong>${todayDeliveries.length}</strong></div>
      <div class="kpi"><small>Pessoas cadastradas</small><br><strong>${state.people.length}</strong></div>
    </section>

    <section class="grid section ${activeSection === 'principal' ? 'visible' : ''}" id="section-principal">
      ${card('📅 Visitas Programadas', `
        <div class="panel-actions">
          <button class="btn-lite primary" id="btnAutoCheckin">Registrar entrada automática</button>
        </div>
        ${renderList(state.scheduledVisits, (v) => `
          <h4>${v.name}</h4>
          <p>Previsto: ${v.scheduledAt} • Setor: ${v.sector}</p>
          <p>Responsável: ${v.responsible}</p>
        `, 'Sem visitas programadas')}
      `)}

      ${card('🏢 Visitas em Andamento', `
        ${renderList(state.ongoingVisits, (v) => `
          <h4>${v.name}</h4>
          <p>Entrada: ${v.entryAt} • Permanência: ${v.duration}</p>
          <p>Setor: ${v.sector}</p>
          <button class="btn-lite" data-exit-visit="${v.id}">Registrar saída</button>
        `, 'Sem visitas em andamento')}
      `)}

      ${card('📦 Entregas Agendadas (Dia Atual)', `
        ${renderList(todayDeliveries, (d) => `
          <h4>${d.keyword}</h4>
          <p>Setor: ${d.destinationSector} • ${d.supplier || 'Sem fornecedor'}</p>
          <p>Período: ${d.expectedStart}${d.expectedEnd ? ' até ' + d.expectedEnd : ''}</p>
          <button class="btn-lite" data-delivery-received="${d.id}">Registrar entrega</button>
        `, 'Sem entregas previstas para hoje')}
      `)}

      ${card('🧾 Cadastros e Operações', `
        <div class="item"><h4>Cadastro de pessoas</h4><p>Funcionário, fornecedor e visitante com foto.</p></div>
        <div class="item"><h4>Cadastro de veículos</h4><p>Próprio/terceiro + relação veículo x funcionário.</p></div>
        <div class="item"><h4>Cadastro de entregas</h4><p>Entrega futura e por período.</p></div>
        <div class="item"><h4>Cadastro de usuários</h4><p>Gestão de acessos.</p></div>
      `)}
    </section>

    <section class="single-section ${activeSection === 'pessoas' ? 'visible' : ''}" id="section-pessoas">
      <div class="panel">
        <div class="panel-header">👤 Cadastro de Pessoas</div>
        <div class="panel-content">
          <form id="formPessoa" class="form-grid-3">
            <div class="field"><label>Tipo *</label><select name="type" required><option>FUNCIONARIO</option><option>FORNECEDOR</option><option>VISITANTE</option></select></div>
            <div class="field"><label>Nome completo *</label><input name="name" required></div>
            <div class="field"><label>CPF</label><input name="cpf"></div>
            <div class="field"><label>RG</label><input name="rg"></div>
            <div class="field"><label>Empresa (se aplicável)</label><input name="company"></div>
            <div class="field"><label>Foto URL</label><input name="photo"></div>
            <div class="field"><label>Setor</label><select name="sector"><option value="">Selecione</option><option>TI</option><option>Financeiro</option><option>RH</option><option>Comercial</option><option>Almoxarifado</option></select></div>
            <div class="field field-full"><button class="btn btn-success" type="submit">Salvar pessoa</button></div>
          </form>
          <hr>
          ${renderList(state.people, (p) => `<h4>${p.name}</h4><p>${p.type} • ${p.cpf || p.rg || 'Sem documento'} ${p.company ? '• ' + p.company : ''}</p>`)}
        </div>
      </div>
    </section>

    <section class="single-section ${activeSection === 'veiculos' ? 'visible' : ''}" id="section-veiculos">
      <div class="panel">
        <div class="panel-header">🚗 Cadastro de Veículos + vínculo com funcionário</div>
        <div class="panel-content">
          <form id="formVeiculo" class="form-grid-3">
            <div class="field"><label>Tipo *</label><select name="type" required><option>PROPRIO</option><option>TERCEIRO</option></select></div>
            <div class="field"><label>Placa *</label><input name="plate" required></div>
            <div class="field"><label>Modelo</label><input name="model"></div>
            <div class="field"><label>Proprietário</label><input name="owner"></div>
            <div class="field"><label>Foto URL</label><input name="photo"></div>
            <div class="field"><label>Funcionário vinculado</label><input name="employee"></div>
            <div class="field field-full"><button class="btn btn-success" type="submit">Salvar veículo</button></div>
          </form>
          <hr>
          ${renderList(state.vehicles, (v) => `<h4>${v.plate}</h4><p>${v.type} • ${v.model || '-'} • ${v.employee || 'Sem vínculo'}</p>`) }
        </div>
      </div>
    </section>

    <section class="single-section ${activeSection === 'entregas' ? 'visible' : ''}" id="section-entregas">
      <div class="panel">
        <div class="panel-header">📦 Cadastro de Entregas (data única ou período)</div>
        <div class="panel-content">
          <form id="formEntrega" class="form-grid-3">
            <div class="field"><label>Palavra-chave *</label><input name="keyword" required></div>
            <div class="field"><label>Setor destino *</label><input name="destinationSector" required></div>
            <div class="field"><label>Fornecedor/Transportadora</label><input name="supplier"></div>
            <div class="field"><label>Data início *</label><input name="expectedStart" type="date" required></div>
            <div class="field"><label>Data fim</label><input name="expectedEnd" type="date"></div>
            <div class="field"><label>Enviar e-mail no recebimento</label><select name="sendEmail"><option value="SIM">SIM</option><option value="NAO">NÃO</option></select></div>
            <div class="field field-full"><button class="btn btn-success" type="submit">Salvar entrega futura</button></div>
          </form>
          <hr>
          ${renderList(state.deliveries, (d) => `<h4>${d.keyword}</h4><p>${d.status} • ${d.expectedStart}${d.expectedEnd ? ' até ' + d.expectedEnd : ''}</p>`) }
        </div>
      </div>
    </section>

    <section class="single-section ${activeSection === 'usuarios' ? 'visible' : ''}" id="section-usuarios">
      <div class="panel">
        <div class="panel-header">🔐 Cadastro de Usuários</div>
        <div class="panel-content">
          <form id="formUsuario" class="form-grid-3">
            <div class="field"><label>Nome *</label><input name="name" required></div>
            <div class="field"><label>E-mail *</label><input name="email" type="email" required></div>
            <div class="field"><label>Perfil *</label><select name="role" required><option>ADMIN</option><option>PORTARIA</option><option>SEGURANCA</option></select></div>
            <div class="field field-full"><button class="btn btn-success" type="submit">Salvar usuário</button></div>
          </form>
          <hr>
          ${renderList(state.users, (u) => `<h4>${u.name}</h4><p>${u.email} • ${u.role}</p>`) }
        </div>
      </div>
    </section>

    <section class="single-section ${activeSection === 'consulta' ? 'visible' : ''}" id="section-consulta">
      <div class="panel">
        <div class="panel-header">🔎 Consulta por CPF ou Placa</div>
        <div class="panel-content">
          <form id="formConsulta" class="form-grid-3">
            <div class="field"><label>CPF/RG</label><input name="document"></div>
            <div class="field"><label>Placa</label><input name="plate"></div>
            <div class="field"><label>&nbsp;</label><button class="btn btn-primary" type="submit">Consultar histórico</button></div>
          </form>
          <hr>
          ${renderList(queryResult || [], (r) => `<h4>${r.name}</h4><p>Entrada: ${r.entryAt} • Saída: ${r.exitAt} • Setor: ${r.sector}</p><p>Usuário saída: ${r.user}</p>`, 'Sem resultados para a consulta atual')}
        </div>
      </div>
    </section>
  </main>
</div>
`;
}
