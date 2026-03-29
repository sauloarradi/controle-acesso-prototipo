import { dashboardTemplate } from './modules/dashboard.js';
import {
  addDeliveryPlan,
  addPerson,
  addScheduledVisit,
  addUser,
  addVehicle,
  authenticate,
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

function formValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function render() {
  const state = getState();
  document.getElementById('app').innerHTML = dashboardTemplate({
    state,
    activeScreen,
    todayDeliveries: getTodayDeliveries(),
    overdueDeliveries: getOverdueDeliveries(),
    queryResult
  });
  updateClock();
  wireEvents();
}

function openModal(id){ const m=document.getElementById(id); if(m) m.style.display='flex'; }
function closeModal(id){ const m=document.getElementById(id); if(m) m.style.display='none'; }

function wireEvents() {

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = formValues(loginForm);
      const user = authenticate(values.username, values.password);
      if (!user) return alert('Usuário ou senha inválidos.');
      notifyAudit('LOGIN_SUCCESS', user.username);
      render();
    });
    return;
  }
  document.querySelectorAll('.nav-btn,[data-open-screen]').forEach((button) => {
    button.addEventListener('click', () => {
      activeScreen = button.dataset.screen || button.dataset.openScreen;
      render();
    });
  });

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openModal));
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModal(button.dataset.closeModal));
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.style.display = 'none';
    });
  });

  document.querySelectorAll('[data-auto-checkin]').forEach((button) => {
    button.addEventListener('click', () => {
      const visit = autoCheckinVisit(Number(button.dataset.autoCheckin), getState().currentUser?.name || "");
      if (!visit) return;
      notifyAudit('VISIT_AUTO_ENTRY', visit.name);
      alert(`Entrada automática registrada para ${visit.name}.`);
      render();
    });
  });

  document.querySelectorAll('[data-exit-visit]').forEach((button) => {
    button.addEventListener('click', () => {
      const visit = registerVisitExit(Number(button.dataset.exitVisit), getState().currentUser?.name || "");
      if (!visit) return;
      notifyAudit('VISIT_EXIT', visit.name);
      alert(`Saída registrada para ${visit.name}.`);
      render();
    });
  });

  document.querySelectorAll('[data-receive-delivery]').forEach((button) => {
    button.addEventListener('click', () => {
      const observation = prompt('Observação do recebimento (obrigatório):');
      if (!observation) return alert('É obrigatório informar observação.');
      const result = registerDelivery(Number(button.dataset.receiveDelivery), observation, getState().currentUser?.name || "");
      if (!result) return;
      notifyAudit('DELIVERY_RECEIVED', result.keyword);
      alert('Entrega registrada e notificação disparada (simulada).');
      render();
    });
  });

  document.querySelectorAll('[data-toggle-truck]').forEach((button) => {
    button.addEventListener('click', () => {
      const result = toggleRecurringTruck(Number(button.dataset.toggleTruck), getState().currentUser?.name || "");
      if (!result) return;
      notifyAudit('TRUCK_FLOW', `${result.truck.label} - ${result.action}`);
      alert(`${result.action} registrada para ${result.truck.label}.`);
      render();
    });
  });

  document.querySelectorAll('[data-toggle-employee-car]').forEach((button) => {
    button.addEventListener('click', () => {
      const result = toggleEmployeeCar(Number(button.dataset.toggleEmployeeCar), getState().currentUser?.name || "");
      if (!result) return;
      notifyAudit('EMPLOYEE_CAR_FLOW', `${result.car.plate} - ${result.action}`);
      alert(`${result.action} registrada para ${result.car.employee}.`);
      render();
    });
  });

  document.querySelectorAll('[data-company-exit]').forEach((button) => {
    button.addEventListener('click', () => {
      const driver = prompt('Nome do motorista:');
      const kmOut = Number(prompt('KM de saída:'));
      const result = registerCompanyCarExit(Number(button.dataset.companyExit), driver || '', kmOut, getState().currentUser?.name || "");
      if (result.error) return alert(result.error);
      notifyAudit('COMPANY_CAR_EXIT', `${result.car.plate} - KM ${kmOut}`);
      alert('Saída registrada com KM.');
      render();
    });
  });

  document.querySelectorAll('[data-company-return]').forEach((button) => {
    button.addEventListener('click', () => {
      const kmIn = Number(prompt('KM de retorno:'));
      const result = registerCompanyCarReturn(Number(button.dataset.companyReturn), kmIn, getState().currentUser?.name || "");
      if (result.error) return alert(result.error);
      notifyAudit('COMPANY_CAR_RETURN', `${result.car.plate} - KM ${kmIn}`);
      alert('Retorno registrado com sucesso.');
      render();
    });
  });

  const formConsulta = document.getElementById('formConsulta');
  if (formConsulta) {
    formConsulta.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = formValues(formConsulta);
      queryResult = queryHistory(values.document, values.plate);
      render();
    });
  }

  const formPessoaVisita = document.getElementById('formPessoaVisita');
  if (formPessoaVisita) {
    formPessoaVisita.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = formValues(formPessoaVisita);
      if (values.registerType === 'VISITA_AGENDADA') {
        addScheduledVisit({
          name: values.name,
          document: values.document,
          visitType: values.type === 'ENTREVISTA' ? 'ENTREVISTA' : 'VISITA',
          sector: values.sector,
          responsible: values.responsible,
          company: values.company,
          photoUrl: values.photoUrl,
          scheduledAt: values.scheduledAt || '--:--'
        });
        notifyAudit('SCHEDULED_VISIT_CREATE');
        alert('Visita agendada cadastrada com sucesso.');
      } else {
        addPerson({
          type: values.type === 'ENTREVISTA' ? 'VISITANTE' : values.type,
          name: values.name,
          cpf: values.document,
          rg: '',
          company: values.company,
          photoUrl: values.photoUrl,
          sector: values.sector
        });
        notifyAudit('PERSON_CREATE');
        alert('Pessoa cadastrada com sucesso.');
      }
      formPessoaVisita.reset();
      closeModal('modalPessoaVisita');
      render();
    });
  }

  const formVehicleRegistry = document.getElementById('formVehicleRegistry');
  if (formVehicleRegistry) {
    formVehicleRegistry.addEventListener('submit', (event) => {
      event.preventDefault();
      addVehicle(formValues(formVehicleRegistry));
      notifyAudit('VEHICLE_CREATE');
      alert('Veículo cadastrado com sucesso.');
      formVehicleRegistry.reset();
      closeModal('modalVeiculo');
      render();
    });
  }

  const formUser = document.getElementById('formUser');
  if (formUser) {
    formUser.addEventListener('submit', (event) => {
      event.preventDefault();
      addUser(formValues(formUser));
      notifyAudit('USER_CREATE');
      alert('Usuário cadastrado com sucesso.');
      formUser.reset();
      render();
    });
  }

  const formEntrega = document.getElementById('formEntrega');
  if (formEntrega) {
    formEntrega.addEventListener('submit', (event) => {
      event.preventDefault();
      addDeliveryPlan(formValues(formEntrega));
      notifyAudit('DELIVERY_PLAN_CREATE');
      alert('Entrega futura cadastrada com sucesso.');
      formEntrega.reset();
      closeModal('modalEntrega');
      render();
    });
  }
}

render();
setInterval(updateClock, 1000);
