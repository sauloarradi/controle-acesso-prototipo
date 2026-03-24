import { dashboardTemplate } from './modules/dashboard.js';
import {
  addDelivery,
  addPerson,
  addUser,
  addVehicle,
  autoCheckinFirstScheduled,
  getState,
  getTodayDeliveries,
  queryHistory,
  registerDelivery,
  registerVisitExit
} from './services/state.js';
import { notifyAudit } from './services/audit-service.js';

let activeSection = 'principal';
let queryResult = [];

function updateClock() {
  const now = new Date();
  const time = document.getElementById('clockTime');
  const date = document.getElementById('clockDate');
  if (!time || !date) return;

  time.textContent = now.toLocaleTimeString('pt-BR');
  date.textContent = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function render() {
  const state = getState();
  const todayDeliveries = getTodayDeliveries();
  document.getElementById('app').innerHTML = dashboardTemplate({ state, todayDeliveries, activeSection, queryResult });
  updateClock();
  wireEvents();
}

function formDataToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function wireEvents() {
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => {
      activeSection = button.dataset.nav;
      render();
    });
  });

  const autoBtn = document.getElementById('btnAutoCheckin');
  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      const visit = autoCheckinFirstScheduled();
      if (!visit) {
        alert('Não há visitas programadas para entrada automática.');
        return;
      }
      notifyAudit('VISIT_AUTO_ENTRY', visit.name);
      alert(`Entrada registrada para ${visit.name} e movida para visitas em andamento.`);
      render();
    });
  }

  document.querySelectorAll('[data-exit-visit]').forEach((button) => {
    button.addEventListener('click', () => {
      const visitId = Number(button.dataset.exitVisit);
      const visit = registerVisitExit(visitId, getState().currentUser);
      if (!visit) return;
      notifyAudit('VISIT_EXIT', visit.name);
      alert(`Saída registrada: ${visit.name}. Usuário e horário foram salvos.`);
      render();
    });
  });

  document.querySelectorAll('[data-delivery-received]').forEach((button) => {
    button.addEventListener('click', () => {
      const deliveryId = Number(button.dataset.deliveryReceived);
      const observation = prompt('Observação do recebimento:') || '';
      const delivery = registerDelivery(deliveryId, observation, getState().currentUser);
      if (!delivery) return;
      notifyAudit('DELIVERY_RECEIVED', delivery.keyword);
      alert('Entrega recebida registrada com usuário, data/hora e observação. E-mail: simulado.');
      render();
    });
  });

  const formPessoa = document.getElementById('formPessoa');
  if (formPessoa) {
    formPessoa.addEventListener('submit', (event) => {
      event.preventDefault();
      addPerson(formDataToObject(formPessoa));
      notifyAudit('PERSON_CREATE');
      alert('Pessoa cadastrada com sucesso.');
      formPessoa.reset();
      render();
    });
  }

  const formVeiculo = document.getElementById('formVeiculo');
  if (formVeiculo) {
    formVeiculo.addEventListener('submit', (event) => {
      event.preventDefault();
      addVehicle(formDataToObject(formVeiculo));
      notifyAudit('VEHICLE_CREATE');
      alert('Veículo cadastrado com sucesso.');
      formVeiculo.reset();
      render();
    });
  }

  const formEntrega = document.getElementById('formEntrega');
  if (formEntrega) {
    formEntrega.addEventListener('submit', (event) => {
      event.preventDefault();
      addDelivery(formDataToObject(formEntrega));
      notifyAudit('DELIVERY_CREATE');
      alert('Entrega futura cadastrada com sucesso.');
      formEntrega.reset();
      render();
    });
  }

  const formUsuario = document.getElementById('formUsuario');
  if (formUsuario) {
    formUsuario.addEventListener('submit', (event) => {
      event.preventDefault();
      addUser(formDataToObject(formUsuario));
      notifyAudit('USER_CREATE');
      alert('Usuário cadastrado com sucesso.');
      formUsuario.reset();
      render();
    });
  }

  const formConsulta = document.getElementById('formConsulta');
  if (formConsulta) {
    formConsulta.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = formDataToObject(formConsulta);
      queryResult = queryHistory(values.document, values.plate);
      render();
    });
  }
}

render();
setInterval(updateClock, 1000);
