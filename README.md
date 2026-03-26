# Sistema de Controle de Acesso (Portaria)

Protótipo funcional com foco operacional para portaria, entrevistas, entregas e veículos da Rodoin.

## Módulos disponíveis

- Tela principal (resumo operacional clicável).
- Tela de **cadastros**:
  - Pessoas (funcionário, visitante, fornecedor + foto URL)
  - Visitas agendadas (incluindo entrevistas)
  - Veículos
  - Usuários
- Tela de entregas (com destaque de atrasadas em vermelho).
- Tela de visitantes (entrevistas x outras visitas, com entrada automática).
- Tela de veículos (caminhões recorrentes, carros de funcionários, carros da empresa com KM).
- Tela de consulta por CPF/placa com histórico consolidado.

## Regras de negócio implementadas

- Entrada automática de visitante agendado com gravação de usuário e horário.
- Registro de saída de visitante com histórico.
- Registro de entrega com observação obrigatória.
- Fluxos rápidos para caminhões recorrentes (açúcar e entrega SP).
- Funcionário: entrada/saída simplificada do carro.
- Carro da empresa: exige KM de saída e retorno, validando retorno > saída.
- Principal mantém resumos e abre telas de seção por clique.
