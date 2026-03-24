import { initialState } from '../data/mock-data.js';

const state = structuredClone(initialState);

function nowTime() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function nowIso() {
  return new Date().toISOString();
}

function isTodayOrInPeriod(start, end, today) {
  const s = new Date(start);
  const t = new Date(today);
  if (!end) return s.toDateString() === t.toDateString();
  const e = new Date(end);
  return t >= s && t <= e;
}

export function getState() {
  return state;
}

export function getTodayDeliveries() {
  const today = new Date();
  return state.deliveries.filter((d) => d.status === 'AGENDADA' && isTodayOrInPeriod(d.expectedStart, d.expectedEnd, today));
}

export function scheduleVisit(visit) {
  state.scheduledVisits.push({ id: Date.now(), ...visit });
}

export function autoCheckinFirstScheduled() {
  if (!state.scheduledVisits.length) return null;
  const next = state.scheduledVisits.shift();
  state.ongoingVisits.push({
    id: Date.now(),
    name: next.name,
    sector: next.sector,
    responsible: next.responsible,
    entryAt: nowTime(),
    duration: '0h 00min',
    document: next.document,
    vehiclePlate: next.vehiclePlate
  });
  return next;
}

export function registerVisitExit(visitId, user) {
  const idx = state.ongoingVisits.findIndex((v) => v.id === visitId);
  if (idx < 0) return null;
  const visit = state.ongoingVisits.splice(idx, 1)[0];
  state.visitHistory.push({
    id: Date.now(),
    name: visit.name,
    document: visit.document || '',
    plate: visit.vehiclePlate || '',
    entryAt: visit.entryAt,
    exitAt: nowTime(),
    sector: visit.sector,
    user,
    createdAt: nowIso()
  });
  return visit;
}

export function addPerson(payload) {
  state.people.push({ id: Date.now(), ...payload });
}

export function addVehicle(payload) {
  state.vehicles.push({ id: Date.now(), ...payload });
}

export function addUser(payload) {
  state.users.push({ id: Date.now(), ...payload, active: true });
}

export function addDelivery(payload) {
  state.deliveries.push({ id: Date.now(), ...payload, status: 'AGENDADA', receivedAt: '', receivedBy: '' });
}

export function registerDelivery(deliveryId, observation, user) {
  const delivery = state.deliveries.find((d) => d.id === deliveryId);
  if (!delivery) return null;
  delivery.status = 'RECEBIDA';
  delivery.observation = observation;
  delivery.receivedAt = nowIso();
  delivery.receivedBy = user;
  return delivery;
}

export function queryHistory(cpfOrRg, plate) {
  const documentQuery = (cpfOrRg || '').trim();
  const plateQuery = (plate || '').trim().toUpperCase();

  return state.visitHistory.filter((item) => {
    const docMatch = documentQuery ? item.document.includes(documentQuery) : false;
    const plateMatch = plateQuery ? (item.plate || '').toUpperCase().includes(plateQuery) : false;
    if (!documentQuery && !plateQuery) return true;
    return docMatch || plateMatch;
  });
}
