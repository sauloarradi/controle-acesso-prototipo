import { dashboardTemplate } from './modules/dashboard.js';
import { modalsTemplate, wireModalEvents, openModal } from './modules/modals.js';
import { autoCheckinFirstScheduled, getState } from './services/state.js';
import { notifyAudit } from './services/audit-service.js';

function updateClock() {
  const now = new Date();
  const time = document.getElementById('clockTime');
  const date = document.getElementById('clockDate');
  if (!time || !date) return;

  time.textContent = now.toLocaleTimeString('pt-BR');
  date.textContent = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function render() {
  const app = document.getElementById('app');
  const state = getState();
  app.innerHTML = dashboardTemplate(state) + modalsTemplate();

  wireModalEvents(render);
  wireActions();
  updateClock();
}

function wireActions() {
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action');

      if (action === 'open-visitor-modal') openModal('visitorModal');
      if (action === 'open-delivery-modal') openModal('deliveryModal');
      if (action === 'open-search-modal') openModal('searchModal');
      if (action === 'register-visitor-exit') window.registerVisitorExit();
      if (action === 'register-delivery') window.registerDeliveryReceipt();

      if (action === 'auto-checkin') {
        const visit = autoCheckinFirstScheduled();
        if (!visit) {
          alert('Não há visitas agendadas pendentes.');
          return;
        }
        notifyAudit('AUTO_CHECKIN', visit.name);
        alert(`Entrada automática registrada para ${visit.name}.`);
        render();
      }
    });
  });
}

render();
setInterval(updateClock, 1000);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.style.display = 'none';
    });
  }
});
