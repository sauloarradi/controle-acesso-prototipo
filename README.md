# Sistema de Controle de Acesso (Portaria)

Protótipo funcional alinhado ao documento de requisitos da portaria.

## O que está funcionando nesta versão

- Tela principal com:
  - Visitas programadas;
  - Visitas em andamento (nome, horário de entrada, tempo de permanência e setor);
  - Entregas do dia atual (com filtro por data/período);
  - Botão de entrada automática e saída com auditoria.
- Cadastro de pessoas: funcionário, fornecedor e visitante (com campo de foto URL).
- Cadastro de veículos: próprio/terceiro e vínculo com funcionário.
- Cadastro de entregas: data única ou período, com registro de recebimento.
- Cadastro de usuários.
- Tela de consulta por CPF/RG ou placa para histórico de visitas (entrada/saída).

## Estrutura do projeto

```text
.
├── index.html
└── src
    ├── app.js
    ├── data
    │   └── mock-data.js
    ├── modules
    │   ├── dashboard.js
    │   └── modals.js
    ├── services
    │   ├── audit-service.js
    │   └── state.js
    └── styles
        ├── components.css
        ├── layout.css
        └── tokens.css
