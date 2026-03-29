# SIGA TOFFANO

Sistema inteligente de gestão de acesso (protótipo).

## Módulos disponíveis

- Login obrigatório por usuário e senha.
- Tela principal (resumo operacional clicável).
- Tela de **cadastros** com cards (Pessoa/Visita, Entrega, Veículo), onde cada card abre modal específico para evitar poluição visual.
- Entregas (com destaque de atrasadas em vermelho).
- Visitantes (entrevistas x outras visitas, com entrada automática).
- Veiculos (caminhões recorrentes, carros de funcionários, carros da empresa com KM).
- Consulta por CPF/placa com histórico consolidado.

## Regras de negócio implementadas

- Entrada automática de visitante agendado com gravação de usuário e horário.
- Registro de saída de visitante com histórico.
- Registro de entrega com observação obrigatória.
- Fluxos rápidos para caminhões recorrentes (açúcar e entrega SP).
- Funcionário: entrada/saída simplificada do carro.
- Carro da empresa: exige KM de saída e retorno, validando retorno > saída.
- Principal mantém resumos e abre telas de seção por clique.
