import { initialState } from '../data/mock-data.js';

const state = structuredClone(initialState);

const nowTime = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const nowIso = () => new Date().toISOString();

function isDateInTodayOrPeriod(start, end) {
  const today = new Date();
  const s = new Date(start);
  if (!end) return s.toDateString() === today.toDateString();
  const e = new Date(end);
  return today >= s && today <= e;
}

export function getState() {
  return state;
}

export function getTodayDeliveries() {
  return state.deliveries.filter((d) => d.status === 'AGENDADA' && isDateInTodayOrPeriod(d.expectedStart, d.expectedEnd));
}

export function getOverdueDeliveries() {
  const today = new Date();
  return state.deliveries.filter((d) => d.status === 'AGENDADA' && d.expectedEnd && new Date(d.expectedEnd) < today);
}

export function registerDelivery(deliveryId, observation, user) {
  const delivery = state.deliveries.find((d) => d.id === deliveryId);
  if (!delivery) return null;
  delivery.status = 'RECEBIDA';
  delivery.observation = observation;
  state.deliveryHistory.push({
    id: Date.now(),
    deliveryId,
    keyword: delivery.keyword,
    user,
    receivedAt: nowIso(),
    observation
  });
  return delivery;
}

export function autoCheckinVisit(visitId, user) {
  const idx = state.scheduledVisits.findIndex((v) => v.id === visitId);
  if (idx < 0) return null;
  const visit = state.scheduledVisits.splice(idx, 1)[0];
  const ongoing = {
    ...visit,
    id: Date.now(),
    entryAt: nowTime(),
    duration: '0h 00min',
    entryBy: user
  };
  state.ongoingVisits.push(ongoing);
  return ongoing;
}

export function registerVisitExit(ongoingVisitId, user) {
  const idx = state.ongoingVisits.findIndex((v) => v.id === ongoingVisitId);
  if (idx < 0) return null;
  const visit = state.ongoingVisits.splice(idx, 1)[0];
  state.visitHistory.push({
    id: Date.now(),
    name: visit.name,
    document: visit.document,
    plate: visit.plate || '',
    visitType: visit.visitType,
    sector: visit.sector,
    entryAt: visit.entryAt,
    exitAt: nowTime(),
    user
  });
  return visit;
}

export function toggleRecurringTruck(truckId, user) {
  const truck = state.recurringTrucks.find((t) => t.id === truckId);
  if (!truck) return null;
  const action = truck.status === 'PARADO' ? 'SAIDA' : 'RETORNO';
  truck.status = truck.status === 'PARADO' ? 'FORA' : 'PARADO';

  state.vehicleHistory.push({
    id: Date.now(),
    type: 'CAMINHAO_RECORRENTE',
    plate: truck.plate,
    label: truck.label,
    action,
    user,
    dateTime: nowIso()
  });

  return { truck, action };
}

export function toggleEmployeeCar(employeeCarId, user) {
  const car = state.employeeCars.find((c) => c.id === employeeCarId);
  if (!car) return null;
  const action = car.inside ? 'SAIDA' : 'ENTRADA';
  car.inside = !car.inside;
  if (action === 'ENTRADA') car.lastEntryAt = nowTime();
  if (action === 'SAIDA') car.lastExitAt = nowTime();

  state.vehicleHistory.push({
    id: Date.now(),
    type: 'CARRO_FUNCIONARIO',
    plate: car.plate,
    label: car.employee,
    action,
    user,
    dateTime: nowIso()
  });

  return { car, action };
}

export function registerCompanyCarExit(carId, driver, kmOut, user) {
  const car = state.companyCars.find((c) => c.id === carId);
  if (!car || car.inTrip) return { error: 'Veículo já está em viagem.' };
  if (!Number.isFinite(kmOut) || kmOut <= 0) return { error: 'Informe um KM de saída válido.' };

  car.inTrip = true;
  car.kmOut = kmOut;
  car.kmIn = null;
  car.lastDriver = driver;

  state.vehicleHistory.push({
    id: Date.now(),
    type: 'CARRO_EMPRESA',
    plate: car.plate,
    label: car.name,
    action: 'SAIDA',
    km: kmOut,
    user,
    driver,
    dateTime: nowIso()
  });

  return { car };
}

export function registerCompanyCarReturn(carId, kmIn, user) {
  const car = state.companyCars.find((c) => c.id === carId);
  if (!car || !car.inTrip) return { error: 'Veículo não está em viagem.' };
  if (!Number.isFinite(kmIn) || kmIn <= car.kmOut) return { error: 'KM de retorno deve ser maior que o KM de saída.' };

  car.inTrip = false;
  car.kmIn = kmIn;

  state.vehicleHistory.push({
    id: Date.now(),
    type: 'CARRO_EMPRESA',
    plate: car.plate,
    label: car.name,
    action: 'RETORNO',
    km: kmIn,
    user,
    driver: car.lastDriver,
    dateTime: nowIso()
  });

  return { car };
}

export function queryHistory(document, plate) {
  const d = (document || '').trim();
  const p = (plate || '').trim().toUpperCase();

  const visitResults = state.visitHistory.filter((v) => {
    const byDoc = d ? (v.document || '').includes(d) : false;
    const byPlate = p ? (v.plate || '').toUpperCase().includes(p) : false;
    return d || p ? byDoc || byPlate : true;
  }).map((v) => ({ kind: 'VISITA', ...v }));

  const vehicleResults = state.vehicleHistory.filter((v) => {
    const byPlate = p ? (v.plate || '').toUpperCase().includes(p) : false;
    return p ? byPlate : !d;
  }).map((v) => ({ kind: 'VEICULO', ...v }));

  return [...visitResults, ...vehicleResults];
}
