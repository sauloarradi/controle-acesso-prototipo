# Sistema de Controle de Acesso (Portaria)

Protótipo funcional com foco operacional para portaria, entrevistas, entregas e veículos da Rodoin.

## Módulos disponíveis

- Tela principal (resumo operacional clicável).
- Tela de entregas (com destaque de entregas atrasadas em vermelho).
- Tela de visitantes (dividida em entrevistas e outras visitas, com entrada automática por visitante agendado).
- Tela de veículos (caminhões recorrentes, carros de funcionários e carros da empresa com controle de KM).
- Tela de consulta por CPF/placa com histórico consolidado.

## Regras de negócio implementadas

- Entrada automática de visitante agendado com gravação de usuário e horário.
- Registro de saída de visitante com histórico.
- Registro de entrega com observação obrigatória.
- Fluxos rápidos para caminhões recorrentes (açúcar e entrega SP).
- Funcionário: entrada/saída simplificada do carro.
- Carro da empresa: exige KM de saída e retorno, validando retorno > saída.

## Estrutura

```text
index.html
src/
  app.js
  data/mock-data.js
  modules/dashboard.js
  services/audit-service.js
  services/state.js
  styles/tokens.css
  styles/layout.css
  styles/components.css
