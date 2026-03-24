# Sistema de Controle de Acesso (Portaria)

Este repositório evoluiu de um protótipo monolítico para uma estrutura modular de frontend, visando caminho profissional e reaproveitamento para outras empresas.

## Decisão de tecnologia (sem AdvPL)

Para maximizar escalabilidade e portabilidade multiempresa:

- **Frontend atual**: HTML + CSS + JavaScript modular (ES Modules), sem dependência de framework.
- **Roadmap recomendado**: React + TypeScript no frontend, API em Node.js/NestJS ou .NET, banco PostgreSQL.
- **Motivo**: separação de responsabilidades, facilidade de manutenção, onboarding rápido e possibilidade de SaaS multi-tenant.

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
