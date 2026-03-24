import { initialState } from '../data/mock-data.js';

const state = structuredClone(initialState);

export function getState() {
  return state;
}

export function autoCheckinFirstScheduled() {
  if (!state.scheduledVisits.length) return null;

  const visit = state.scheduledVisits.shift();
  state.internalVisitors.push({
    id: Date.now(),
    name: visit.name,
    entryTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    duration: '0h 00min',
    sector: visit.sector
  });

  return visit;
}

export function registerDeliveredItem() {
  state.deliveredCount += 1;
}
