export const employeesBySector = {
  ti: ['Carlos Mendes', 'Juliana Prado'],
  financeiro: ['Maria Costa', 'Rafael Santos'],
  rh: ['Ana Paula Lima', 'Fernanda Silva'],
  comercial: ['José Souza', 'Roberto Vilela'],
  almoxarifado: ['Lucas Rocha', 'Daniel Farias']
};

export const initialState = {
  scheduledVisits: [
    { id: 1, name: 'Patrícia Oliveira', sector: 'Financeiro', responsible: 'Maria Costa', time: '08:45' },
    { id: 2, name: 'Ricardo Gomes', sector: 'TI', responsible: 'Carlos Mendes', time: '09:30' },
    { id: 3, name: 'Fabiana Prado', sector: 'RH', responsible: 'Ana Paula Lima', time: '11:00' },
    { id: 4, name: 'Eduardo Nunes', sector: 'Comercial', responsible: 'José Souza', time: '14:15' }
  ],
  internalVisitors: [
    { id: 11, name: 'Patrícia Oliveira', entryTime: '08:51', duration: '2h 12min', sector: 'Financeiro' },
    { id: 12, name: 'Ricardo Gomes', entryTime: '09:36', duration: '1h 27min', sector: 'TI' }
  ],
  todayDeliveries: [
    { id: 21, item: 'Mouse sem fio', destination: 'TI', period: '24/03/2026', supplier: 'Mercado Livre' },
    { id: 22, item: 'SEDEX - contrato', destination: 'RH', period: '24/03/2026', supplier: 'Correios' },
    { id: 23, item: '2 notebooks', destination: 'TI', period: '24/03/2026 a 26/03/2026', supplier: 'Trans Lovato' }
  ],
  deliveredCount: 2
};
