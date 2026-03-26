export const initialState = {
  currentUser: 'Portaria 01',
  people: [
    { id: 1, type: 'FUNCIONARIO', name: 'Carlos Mendes', cpf: '111.111.111-11', rg: '', company: 'Rodoin', photoUrl: '', sector: 'TI' },
    { id: 2, type: 'VISITANTE', name: 'Mariana Souza', cpf: '111.222.333-44', rg: '', company: 'Candidato', photoUrl: '', sector: 'RH' }
  ],
  users: [
    { id: 1, name: 'Saulo Admin', email: 'admin@empresa.com', role: 'ADMIN', active: true },
    { id: 2, name: 'Portaria 01', email: 'portaria@empresa.com', role: 'PORTARIA', active: true }
  ],
  vehicleRegistry: [
    { id: 1, type: 'PROPRIO', plate: 'ABC1D23', model: 'Corolla', owner: 'Rodoin', photoUrl: '', employee: 'Carlos Mendes' }
  ],

  scheduledVisits: [
    { id: 1, name: 'Mariana Souza', document: '111.222.333-44', visitType: 'ENTREVISTA', sector: 'RH', responsible: 'Ana Paula Lima', company: 'Candidato', photoUrl: '', scheduledAt: '08:30' },
    { id: 2, name: 'João Ribeiro', document: '555.666.777-88', visitType: 'ENTREVISTA', sector: 'RH', responsible: 'Fernanda Silva', company: 'Candidato', photoUrl: '', scheduledAt: '09:00' },
    { id: 3, name: 'Carlos Prado', document: '222.333.444-55', visitType: 'FORNECEDOR', sector: 'Compras', responsible: 'Rafael Santos', company: 'TransLovato', photoUrl: '', scheduledAt: '10:30' }
  ],
  ongoingVisits: [],
  visitHistory: [],

  deliveries: [
    { id: 1, keyword: 'Mouse sem fio', destinationSector: 'TI', supplier: 'Mercado Livre', expectedStart: '2026-03-26', expectedEnd: '', status: 'AGENDADA', observation: '' },
    { id: 2, keyword: 'Computadores DELL', destinationSector: 'TI', supplier: 'Trans Lovato', expectedStart: '2026-03-24', expectedEnd: '2026-03-25', status: 'AGENDADA', observation: '' },
    { id: 3, keyword: 'Correspondência SEDEX', destinationSector: 'RH', supplier: 'Correios', expectedStart: '2026-03-26', expectedEnd: '', status: 'AGENDADA', observation: '' }
  ],
  deliveryHistory: [],

  recurringTrucks: [
    { id: 1, label: 'Caminhão Açúcar (Rodoin)', plate: 'ROD1234', route: 'Buscar açúcar', status: 'PARADO' },
    { id: 2, label: 'Caminhão Entrega SP (Rodoin)', plate: 'ROD5678', route: 'Entrega SP', status: 'PARADO' }
  ],

  employeeCars: [
    { id: 1, employee: 'Carlos Mendes', plate: 'ABC1D23', inside: false, lastEntryAt: '', lastExitAt: '' },
    { id: 2, employee: 'Juliana Prado', plate: 'DEF2E34', inside: true, lastEntryAt: '07:55', lastExitAt: '' }
  ],

  companyCars: [
    { id: 1, name: 'Fiorino Entrega Rápida', plate: 'EMP1111', inTrip: false, kmOut: null, kmIn: null, lastDriver: '' },
    { id: 2, name: 'Saveiro Apoio', plate: 'EMP2222', inTrip: true, kmOut: 45210, kmIn: null, lastDriver: 'Paulo Souza' }
  ],

  vehicleHistory: []
};
