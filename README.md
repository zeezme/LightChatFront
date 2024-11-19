# LightChat

LightChat é um projeto que visa facilitar o atendimento de pequenos e grandes negócios. O projeto é totalmente baseado no modelo de "Conversa de Utilidade", onde o cliente toma a iniciativa de entrar em contato com o estabelecimento. Com essa abordagem, a plataforma pode operar sem necessariamente gerar custos operacionais relacionados ao licenciamento da API oficial do WhatsApp.

## O que já foi implementado

### Gerenciamento de Estado
- **Classe de Gerenciamento de Estado Reativo**: Deve ser criado um arquivo chamado `storage.ts` na pasta do módulo(tela)
  - A classe de gerenciamento de estado deve ser instanciada, inicializada e exportada.
  - O objeto exportado permite alterar e obter o estado de forma centralizada.
- **Input Padrão**: Componente reutilizável que recebe o objeto do gerenciamento de estado da tela e lida com a inserção de dados.

### Autenticação e Login
- **Tela de Login**: Interface conectada ao Supabase para autenticação e validação de usuários.
- **Helper de Login**: Conjunto de funções que facilitam o gerenciamento de sessões:
  - `signIn`: Autentica o usuário.
  - `signOut`: Finaliza a sessão.
  - `getUser`: Recupera informações do usuário autenticado.

### UX
- **Sistema de Toasts**: Sistema de notificação com storage próprio, funciona por cima do resto dos componentes.
- **Loading**: Componente de loading com storage próprio. Basta chamar:
  - `Loading.start()`: Inicia o carregamento.
  - `Loading.stop()`: Para o carregamento.
  - `Loading.get()`: Recupera o estado atual do carregamento.

### Style Padrão
- **Troca de Tema**: Botão no layout principal para alternar entre os temas claro e escuro.

---

### Tecnologias Utilizadas

- **Svelte**: Framework para construção da interface.
- **Supabase**: Backend-as-a-Service para autenticação e gerenciamento de usuários.
- **Whatsapp Business API**: API oficial do whatsapp.

---

### Próximos Passos

- [ ] Finalizar a implementação do login empresarial do Facebook.
- [ ] Implementar a integração completa com a API do WhatsApp.

---

Contribuições e sugestões são bem-vindas!
