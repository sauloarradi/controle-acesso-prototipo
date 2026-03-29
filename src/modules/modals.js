import { employeesBySector } from '../data/mock-data.js';
import { notifyAudit } from '../services/audit-service.js';
import { registerDeliveredItem } from '../services/state.js';

export function modalsTemplate() {
  return `
    <div id="visitorModal" class="modal">
      <div class="modal-card">
        <div class="modal-header"><h3>Formulário de Entrada de Visitantes</h3><span data-close="visitorModal">✕</span></div>
        <div class="modal-body">
          <form id="visitorForm">
            <div class="field"><label>Nome completo *</label><input name="name" required /></div>
            <div class="form-grid">
              <div class="field"><label>CPF ou RG *</label><input name="doc" required /></div>
              <div class="field"><label>Empresa (se aplicável)</label><input name="company" /></div>
            </div>
            <div class="form-grid">
              <div class="field">
                <label>Setor de destino *</label>
                <select id="sectorSelect" name="sector" required>
                  <option value="">Selecione</option>
                  <option value="ti">TI</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="rh">RH</option>
                  <option value="comercial">Comercial</option>
                  <option value="almoxarifado">Almoxarifado</option>
                </select>
              </div>
              <div class="field">
                <label>Funcionário responsável *</label>
                <select id="employeeSelect" name="employee" required>
                  <option value="">Selecione o setor primeiro</option>
                </select>
              </div>
            </div>
            <div class="field"><label>Motivo da visita *</label><input name="reason" required /></div>
            <div class="field"><label>Placa do veículo (se aplicável)</label><input name="plate" /></div>
            <button class="btn btn-success" type="submit">Registrar entrada</button>
          </form>
        </div>
      </div>
    </div>

    <div id="deliveryModal" class="modal">
      <div class="modal-card">
        <div class="modal-header"><h3>Cadastro de Entrega Futura / Período</h3><span data-close="deliveryModal">✕</span></div>
        <div class="modal-body">
          <form id="deliveryForm">
            <div class="field"><label>Descrição da encomenda *</label><input name="description" required /></div>
            <div class="form-grid">
              <div class="field"><label>Setor destino *</label><input name="destination" required /></div>
              <div class="field"><label>Fornecedor/Transportadora</label><input name="supplier" /></div>
            </div>
            <div class="form-grid">
              <div class="field"><label>Data inicial *</label><input name="startDate" type="date" required /></div>
              <div class="field"><label>Data final</label><input name="endDate" type="date" /></div>
            </div>
            <div class="field"><label>Observação</label><textarea name="observation"></textarea></div>
            <button class="btn btn-success" type="submit">Salvar entrega futura</button>
          </form>
        </div>
      </div>
    </div>

    <div id="searchModal" class="modal">
      <div class="modal-card">
        <div class="modal-header"><h3>Consulta por CPF/Placa</h3><span data-close="searchModal">✕</span></div>
        <div class="modal-body">
          <div class="form-grid">
            <div class="field"><label>CPF/RG</label><input /></div>
            <div class="field"><label>Placa</label><input /></div>
          </div>
          <button class="btn btn-primary" id="searchBtn">Pesquisar movimentações</button>
        </div>
      </div>
    </div>
  `;
}

export function wireModalEvents(refreshDashboard) {
  document.querySelectorAll('[data-close]').forEach((close) => {
    close.addEventListener('click', () => {
      const modalId = close.getAttribute('data-close');
      document.getElementById(modalId).style.display = 'none';
    });
  });

  const sectorSelect = document.getElementById('sectorSelect');
  sectorSelect.addEventListener('change', (event) => {
    const employeeSelect = document.getElementById('employeeSelect');
    employeeSelect.innerHTML = '<option value="">Selecione</option>';
    const sector = event.target.value;
    (employeesBySector[sector] || []).forEach((employee) => {
      const option = document.createElement('option');
      option.value = employee;
      option.textContent = employee;
      employeeSelect.appendChild(option);
    });
  });

  document.getElementById('visitorForm').addEventListener('submit', (event) => {
    event.preventDefault();
    notifyAudit('VISITOR_ENTRY', 'Entrada de visitante cadastrada');
    alert('Entrada registrada com sucesso. Auditoria gerada.');
    document.getElementById('visitorModal').style.display = 'none';
  });

  document.getElementById('deliveryForm').addEventListener('submit', (event) => {
    event.preventDefault();
    notifyAudit('FUTURE_DELIVERY_CREATE', 'Entrega futura cadastrada');
    alert('Entrega futura cadastrada.');
    document.getElementById('deliveryModal').style.display = 'none';
  });

  document.getElementById('searchBtn').addEventListener('click', () => {
    alert('Consulta executada.');
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.style.display = 'none';
    });
  });

  window.registerDeliveryReceipt = () => {
    const keyword = prompt('Informe palavra-chave da entrega recebida:');
    if (!keyword) return;
    registerDeliveredItem();
    notifyAudit('DELIVERY_RECEIVED', keyword);
    alert('Entrega recebida registrada. E-mail de notificação disparado.');
    refreshDashboard();
  };

  window.registerVisitorExit = () => {
    const visitor = prompt('Nome do visitante para saída:');
    if (!visitor) return;
    notifyAudit('VISITOR_EXIT', visitor);
    alert('Saída registrada com sucesso.');
  };
}

export function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}
