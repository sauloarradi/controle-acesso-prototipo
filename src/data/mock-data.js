export const employeesBySector = {
  TI: ['Carlos Mendes', 'Juliana Prado'],
  Financeiro: ['Maria Costa', 'Rafael Santos'],
  RH: ['Ana Paula Lima', 'Fernanda Silva'],
  Comercial: ['José Souza', 'Roberto Vilela'],
  Almoxarifado: ['Lucas Rocha', 'Daniel Farias']
};

export const initialState = {
  people: [
    { id: 1, type: 'FUNCIONARIO', name: 'Carlos Mendes', cpf: '111.111.111-11', rg: '', company: 'Rodoin', photo: '', sector: 'TI' },
    { id: 2, type: 'FORNECEDOR', name: 'Trans Lovato', cpf: '', rg: '', company: 'Trans Lovato', photo: '', sector: '' },
    { id: 3, type: 'VISITANTE', name: 'Patrícia Oliveira', cpf: '222.222.222-22', rg: 'MG-10.222.111', company: 'Mercado Livre', photo: '', sector: '' }
  ],
  users: [
    { id: 1, name: 'Saulo Admin', email: 'admin@empresa.com', role: 'ADMIN', active: true },
    { id: 2, name: 'Portaria 01', email: 'portaria@empresa.com', role: 'PORTARIA', active: true }
  ],
  vehicles: [
    { id: 1, type: 'PROPRIO', plate: 'ABC1D23', model: 'Corolla', photo: '', owner: 'Rodoin', employee: 'Carlos Mendes' },
    { id: 2, type: 'TERCEIRO', plate: 'XYZ9K88', model: 'Caminhão', photo: '', owner: 'Trans Lovato', employee: '' }
  ],
  scheduledVisits: [
    { id: 1, name: 'Patrícia Oliveira', document: '222.222.222-22', company: 'Mercado Livre', sector: 'Financeiro', responsible: 'Maria Costa', reason: 'Apresentação proposta', vehiclePlate: '', scheduledAt: '09:30' },
    { id: 2, name: 'Eduardo Nunes', document: '333.333.333-33', company: 'DELL', sector: 'TI', responsible: 'Carlos Mendes', reason: 'Entrega notebooks', vehiclePlate: 'TRK1234', scheduledAt: '14:15' }
  ],
  ongoingVisits: [
    { id: 11, name: 'Ricardo Gomes', sector: 'TI', responsible: 'Carlos Mendes', entryAt: '08:50', duration: '2h 05min' }
  ],
  visitHistory: [],
  deliveries: [
    { id: 1, keyword: 'Mouse sem fio', destinationSector: 'TI', supplier: 'Mercado Livre', expectedStart: '2026-03-24', expectedEnd: '', status: 'AGENDADA', observation: '', receivedAt: '', receivedBy: '' },
    { id: 2, keyword: 'Computadores DELL', destinationSector: 'TI', supplier: 'Trans Lovato', expectedStart: '2026-03-24', expectedEnd: '2026-03-27', status: 'AGENDADA', observation: '', receivedAt: '', receivedBy: '' },
    { id: 3, keyword: 'Correspondência SEDEX', destinationSector: 'RH', supplier: 'Correios', expectedStart: '2026-03-24', expectedEnd: '', status: 'AGENDADA', observation: '', receivedAt: '', receivedBy: '' }
  ],
  currentUser: 'Portaria 01'
};
