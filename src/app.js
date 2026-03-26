import { dashboardTemplate } from './modules/dashboard.js';
import {
  autoCheckinVisit,
  getOverdueDeliveries,
  getState,
  getTodayDeliveries,
  queryHistory,
  registerCompanyCarExit,
  registerCompanyCarReturn,
  registerDelivery,
  registerVisitExit,
  toggleEmployeeCar,
  toggleRecurringTruck
} from './services/state.js';
import { notifyAudit } from './services/audit-service.js';

let activeScreen = 'principal';
let queryResult = [];

function updateClock() {
  const now = new Date();
  const t = document.getElementById('clockTime');
  const d = document.getElementById('clockDate');
  if (!t || !d) return;
  t.textContent = now.toLocaleTimeString('pt-BR');
  d.textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

function render() {
  const state = getState();
  const todayDeliveries = getTodayDeliveries();
  const overdueDeliveries = getOverdueDeliveries();
  document.getElementById('app').innerHTML = dashboardTemplate({
    state,
    activeScreen,
    todayDeliveries,
    overdueDeliveries,
    queryResult
  });
  updateClock();
  wireEvents();
}

function wireEvents() {
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
      activeScreen = button.dataset.screen;
      render();
    });
  });

  document.querySelectorAll('[data-open-screen]').forEach((button) => {
    button.addEventListener('click', () => {
      activeScreen = button.dataset.openScreen;
      render();
    });
  });

  document.querySelectorAll('[data-auto-checkin]').forEach((button) => {
    button.addEventListener('click', () => {
      const visitId = Number(button.dataset.autoCheckin);
      const created = autoCheckinVisit(visitId, getState().currentUser);
      if (!created) return;
      notifyAudit('VISIT_AUTO_ENTRY', created.name);
      alert(`Entrada automática registrada para ${created.name}.`);
      render();
    });
  });

  document.querySelectorAll('[data-exit-visit]').forEach((button) => {
    button.addEventListener('click', () => {
      const visitId = Number(button.dataset.exitVisit);
      const closed = registerVisitExit(visitId, getState().currentUser);
      if (!closed) return;
      notifyAudit('VISIT_EXIT', closed.name);
      alert(`Saída registrada para ${closed.name}.`);
      render();
    });
  });

  document.querySelectorAll('[data-receive-delivery]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.receiveDelivery);
      const observation = prompt('Observação do recebimento (obrigatório):');
      if (!observation) return alert('É obrigatório informar observação.');
      const result = registerDelivery(id, observation, getState().currentUser);
      if (!result) return;
      notifyAudit('DELIVERY_RECEIVED', result.keyword);
      alert('Entrega registrada e notificação disparada (simulada).');
      render();
    });
  });

  document.querySelectorAll('[data-toggle-truck]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.toggleTruck);
      const result = toggleRecurringTruck(id, getState().currentUser);
      if (!result) return;
      notifyAudit('TRUCK_FLOW', `${result.truck.label} - ${result.action}`);
      alert(`${result.action} registrada para ${result.truck.label}.`);
      render();
    });
  });

  document.querySelectorAll('[data-toggle-employee-car]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.toggleEmployeeCar);
      const result = toggleEmployeeCar(id, getState().currentUser);
      if (!result) return;
      notifyAudit('EMPLOYEE_CAR_FLOW', `${result.car.plate} - ${result.action}`);
      alert(`${result.action} registrada para ${result.car.employee}.`);
      render();
    });
  });

  document.querySelectorAll('[data-company-exit]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.companyExit);
      const driver = prompt('Nome do motorista:');
      const kmOut = Number(prompt('KM de saída:'));
      const result = registerCompanyCarExit(id, driver || '', kmOut, getState().currentUser);
      if (result.error) return alert(result.error);
      notifyAudit('COMPANY_CAR_EXIT', `${result.car.plate} - KM ${kmOut}`);
      alert('Saída registrada com KM.');
      render();
    });
  });

  document.querySelectorAll('[data-company-return]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.companyReturn);
      const kmIn = Number(prompt('KM de retorno:'));
      const result = registerCompanyCarReturn(id, kmIn, getState().currentUser);
      if (result.error) return alert(result.error);
      notifyAudit('COMPANY_CAR_RETURN', `${result.car.plate} - KM ${kmIn}`);
      alert('Retorno registrado com sucesso.');
      render();
    });
  });

  const form = document.getElementById('formConsulta');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      queryResult = queryHistory(values.document, values.plate);
      render();
    });
  }
}

render();
setInterval(updateClock, 1000);
