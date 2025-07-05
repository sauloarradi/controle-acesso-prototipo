# 🎛️ Sistema de Controle de Acesso Empresarial - Protótipo

> **Protótipo funcional** do sistema integrado de controle de acesso, veículos e entregas para portaria corporativa.

[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Preview-brightgreen?style=for-the-badge&logo=github)](https://sauloarradi.github.io/controle-acesso-prototipo)
[![Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)]()
[![Responsive](https://img.shields.io/badge/Design-Responsive-blue?style=for-the-badge)]()

---

## 🚀 **Demonstração Online**

**[👉 ACESSE O PROTÓTIPO AQUI](https://sauloarradi.github.io/controle-acesso-prototipo)**

*Interface otimizada para demonstração em qualquer dispositivo*

---

## 📋 **Visão Geral**

Este protótipo demonstra a interface completa do **Sistema de Controle de Acesso** que será implementado na empresa. O sistema centraliza em uma única tela todas as operações da portaria:

- ✅ **Controle de Visitantes** - Entrada e saída com dados integrados
- ✅ **Gestão de Veículos** - Controle completo da frota empresarial  
- ✅ **Recebimento de Entregas** - Organização e notificações automáticas
- ✅ **Integração com Câmeras** - Aproveitamento do sistema atual
- ✅ **Interface Multi-Tela** - Layout otimizado para TV grande

---

## 🖥️ **Interface em Quadrantes**

```
┌─────────────────┬─────────────────┐
│   🎛️ CONTROLE  │   📹 CÂMERAS    │
│    Painel de    │   Sistema de    │
│     Ações       │   Segurança     │
├─────────────────┼─────────────────┤
│  👥 VISITANTES │   📦 ENTREGAS & │
│     Ativos      │   🚗 VEÍCULOS  │
│   (Tempo Real)  │   (Dashboard)   │
└─────────────────┴─────────────────┘
```

### **Quadrante Superior Esquerdo - Painel de Controle**
- Ações rápidas com botões grandes
- Relógio digital e data atual
- Status do sistema em tempo real
- Indicadores visuais de alertas

### **Quadrante Superior Direito - Sistema de Câmeras**
- Integração com sistema existente (iframe)
- Manutenção da interface atual
- Controles de navegação preservados
- Zero impacto na operação atual

### **Quadrante Inferior Esquerdo - Visitantes Ativos**
- Lista em tempo real de quem está na empresa
- Tempo de permanência automático
- Alertas visuais para tempo excedido
- Busca rápida por visitante

### **Quadrante Inferior Direito - Entregas e Veículos**
- Entregas pendentes de retirada
- Veículos da empresa em circulação
- Notificações automáticas
- Status consolidado

---

## ⚡ **Funcionalidades Demonstradas**

### **👤 Cadastro de Visitantes**
- Formulário completo com validações
- ComboBoxes integrados (Setores → Funcionários)
- Campos para veículo e motivo da visita
- Foto automática via webcam (simulada)

### **🚗 Controle de Veículos**
- **Saída**: Registro de funcionário, destino e KM
- **Retorno**: Controle de quilometragem e tempo
- Validações automáticas de disponibilidade
- Cálculo automático de KM rodados

### **📦 Gestão de Entregas**
- Registro por transportadora
- Associação automática com setores
- Código de rastreamento
- Notificações para destinatários

### **⌨️ Navegação Otimizada**
- **Ctrl + 1-4**: Ações rápidas
- **F1-F4**: Foco nos quadrantes
- **ESC**: Fechar modais
- Teclas de atalho para agilidade

---

## 🎯 **Como Testar o Protótipo**

### **1. Cadastro de Visitante**
```
1. Clique em "Nova Entrada" OU pressione Ctrl+1
2. Preencha o nome e documento
3. Selecione o setor (carrega funcionários automaticamente)
4. Escolha o funcionário responsável
5. Adicione placa do veículo (opcional)
6. Clique em "Registrar Entrada"
```

### **2. Controle de Veículos**
```
1. Clique em "Controle Veículos" OU pressione Ctrl+3
2. Escolha "Saída" ou "Retorno"
3. Selecione o veículo (filtra por disponibilidade)
4. Informe funcionário e quilometragem
5. Para saída: adicione destino
6. Registre a movimentação
```

### **3. Nova Entrega**
```
1. Clique em "Nova Entrega" OU pressione Ctrl+4
2. Selecione a transportadora
3. Informe código de rastreamento
4. Escolha setor e destinatário
5. Adicione descrição e observações
6. Registre a entrega
```

### **4. Registrar Saída**
```
1. Clique em "Registrar Saída" OU pressione Ctrl+2
2. Selecione o visitante da lista
3. Confirme a saída
```

---

## 🔧 **Tecnologias Utilizadas**

### **Frontend**
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **JavaScript (Vanilla)** - Funcionalidades interativas
- **Grid Layout** - Interface em quadrantes
- **Flexbox** - Componentes responsivos

### **Design System**
- **Gradientes modernos** - Visual profissional
- **Iconografia intuitiva** - Emojis para facilitar uso
- **Tipografia otimizada** - Legibilidade em TV grande
- **Cores acessíveis** - Alto contraste
- **Animações suaves** - Feedback visual

### **Recursos Especiais**
- **Responsividade total** - Adapta a qualquer tela
- **Teclado otimizado** - Navegação sem mouse
- **Notificações visuais** - Feedback em tempo real
- **Validações inteligentes** - Prevenção de erros
- **Interface moderna** - UX/UI profissional

---

## 📊 **Especificações Técnicas**

### **Compatibilidade**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Dispositivos móveis
- ✅ Smart TVs (WebKit)

### **Performance**
- ⚡ Carregamento: < 2 segundos
- ⚡ Responsividade: < 100ms
- ⚡ Tamanho total: < 500KB
- ⚡ Zero dependências externas

### **Recursos do Protótipo**
- 🔄 Atualização automática de relógio
- 🔔 Notificações simuladas em tempo real
- 💾 Dados fictícios para demonstração
- 🎮 Interatividade completa
- 📱 Design responsivo
- ⌨️ Suporte completo a teclado

---

## 🏗️ **Implementação Real**

### **Stack Tecnológico Planejado**
- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + Express.js
- **Banco**: SQL Server (integração com infraestrutura atual)
- **Integração**: WebServices ADVPL para Protheus
- **Câmeras**: Iframe com sistema existente

### **Cronograma de Desenvolvimento**
- **Fase 1**: Fundação (4 semanas)
- **Fase 2**: Interface TV (2 semanas)  
- **Fase 3**: Módulo Visitantes (3 semanas)
- **Fase 4**: Módulo Veículos (2 semanas)
- **Fase 5**: Módulo Entregas (3 semanas)
- **Fase 6**: Testes e Refinamentos (2 semanas)

**Total: 16 semanas**

### **Benefícios Esperados**
- 📈 **Eficiência**: 60% redução no tempo de cadastro
- 🛡️ **Segurança**: 100% rastreabilidade de acessos
- 📊 **Controle**: Visibilidade completa em tempo real
- 💰 **ROI**: Retorno em 6 meses
- 👥 **UX**: Interface intuitiva reduz erros em 80%

---

## 📞 **Informações do Projeto**

### **Desenvolvido por**
- 👨‍💻 **Saulo Arradi**
- 📧 **Contato**: sauloarradi@gmail.com
- 📅 **Data**: Julho 2025
- 🎯 **Objetivo**: Modernização da portaria empresarial

### **Documentação Completa**
- 📋 [Especificação Técnica Detalhada](Entrar em contato)
- 🏗️ [Arquitetura do Sistema](Entrar em contato)
- 💰 [Análise de Investimento](Entrar em contato)
- 📈 [Cronograma Executivo](Entrar em contato)

---

## 🤝 **Como Contribuir**

Este é um protótipo interno para demonstração. Para sugestões ou dúvidas:

1. 💬 Entre em contato
2. 📧 Envie email para sauloarradi@gmail.com
3. 🗓️ Agende uma demonstração presencial

---

## 📜 **Licença**

Este protótipo é propriedade de **[Saulo Arradi]** e destina-se exclusivamente para avaliação interna do projeto de modernização da portaria.

---

<div align="center">

### 🎯 **Sistema de Controle de Acesso Empresarial**
*Modernização, Segurança e Eficiência em uma única plataforma*

**[🚀 Acessar Demonstração](https://sauloarradi.github.io/controle-acesso-prototipo)**

---

*Desenvolvido com ❤️ por Saulo Arradi para otimizar a segurança e eficiência da sua empresa*

</div>
