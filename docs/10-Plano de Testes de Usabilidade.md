
# Plano de Testes de Usabilidade

## 1. Objetivos

Os objetivos a serem alcançados com os testes de usabilidade são:

- Garantir que a navegação pela aplicação seja intuitiva e fácil para todos os usuários.
- Assegurar que as telas sejam simples e compreensíveis, permitindo que os usuários realizem suas tarefas de forma prática e eficiente.
- Identificar quaisquer obstáculos que possam dificultar a execução das tarefas, proporcionando uma experiência positiva.

Por meio desses testes, buscamos responder às seguintes questões:

- Os usuários navegam facilmente pelos diferentes módulos da aplicação?
- Os usuários compreendem as telas acessadas e conseguem executar as tarefas rapidamente?
- Os usuários cometem erros ao realizar as tarefas? Se sim, quais?
- Existem obstáculos que impedem a conclusão das tarefas? Quais são eles?
- Qual é o tempo médio de resposta dos usuários e como eles reagem à aplicação?

## 2. Método e Modelo Utilizado

Para este projeto, optamos pelo modelo remoto e moderado, utilizando métodos de observação e experimentação. Os usuários terão a liberdade de acessar a aplicação de qualquer dispositivo móvel, independentemente da sua localização, criando um ambiente natural para os testes.

Esse modelo é econômico, pois elimina a necessidade de locação de espaço físico e permite testar toda a aplicação sem interferir na velocidade do desenvolvimento. Além disso, proporciona conforto e praticidade para os usuários.

## 3. Participantes

Serão selecionados usuários representativos das personas definidas, que incluem clientes, funcionários de hotéis e administradores do sistema. As características dos participantes são as seguintes:

- Idade entre 18 e 65 anos.
- Homens e mulheres.
- Conexão à internet estável.
- Possuem dispositivos móveis, como smartphones ou tablets.
- E-mail válido e número de telefone.

## 4. Procedimento

Os procedimentos para a realização dos testes incluem:

1. Envio de links de acesso e orientações sobre como participar do teste.
2. Inicialização das ferramentas para gravação e reunião online.
3. Recepção dos participantes e esclarecimentos sobre a privacidade dos dados, com aceitação de termos.
4. Orientação sobre o teste: objetivos, garantia de anonimato e observação por meio de registro de áudio, vídeo e anotações.
5. Execução dos testes: apresentação das tarefas e medições.
6. Debriefing: entrevista após os testes para coletar comentários sobre a experiência.

Requisitos para a realização dos testes:

- Conectividade à internet estável.
- Navegador compatível (Chrome, Firefox, Safari ou Edge).
- Disponibilidade para acessar as ferramentas utilizadas (Google Meet, Webcam e Lookback).

## 5. Tarefas de Teste

Os participantes deverão realizar as seguintes tarefas, que foram definidas para verificar a funcionalidade e usabilidade da aplicação:

### Tarefas Testes

| Caso de Teste         | Perfil                | Objetivo do Teste                                        | Ações Necessárias                                                   |
|-----------------------|----------------------|---------------------------------------------------------|--------------------------------------------------------------------|
| CTU-01 - Cadastro     | Cliente              | Verificar a tela de cadastro de novos usuários          | Acessar a aplicação, clicar em "Cadastrar-se", preencher campos e clicar em "Cadastrar". |
| CTU-02 - Login        | Cliente              | Averiguar a tela de login para clientes                 | Acessar a aplicação, preencher campos e clicar em "Entrar".       |
| CTU-03 - Cadastro do Hotel | Hotel           | Testar a tela de cadastro de um novo hotel             | Acessar a aplicação, clicar em "Cadastrar Hotel", preencher os campos e clicar em "Cadastrar". |
| CTU-04 - Agendamento   | Cliente              | Testar a funcionalidade de agendamento de estadia       | Fazer login, clicar em "Agendar Estadia", seguir instruções e confirmar. |
| CTU-05 - Histórico     | Cliente              | Acessar o histórico de reservas                          | Fazer login, clicar em "Histórico de Reservas" e navegar pela tela. |
| CTU-06 - Suporte      | Cliente              | Verificar o envio de solicitações de suporte            | Fazer login, clicar em "Suporte", preencher e enviar a solicitação. |
| CTU-07 - Gestão Hotel  | Hotel                | Verificar gestão de reservas                             | Fazer login, acessar "Reservas", visualizar e cancelar reservas.   |
| CTU-08 - Acesso Admin | Administrador        | Testar funcionalidades administrativas                   | Fazer login, acessar "Gerenciar Hotéis" e aprovar cadastros.      |

## 6. Cenários de Teste

Os participantes também simularão os seguintes cenários, que refletem situações reais de uso:

### Cenários Testes

| Cenário de Teste         | Perfil                | Objetivo do Teste                                        | Cenário                                                         |
|--------------------------|----------------------|---------------------------------------------------------|----------------------------------------------------------------|
| CTU-09 - Primeira Reserva | Cliente              | Testar agendamento pela primeira vez                   | Como cliente, você deseja agendar uma estadia para seu pet.    |
| CTU-10 - Recuperação     | Cliente              | Verificar recuperação de senha                           | Como cliente, você esqueceu a senha e precisa redefini-la.     |
| CTU-11 - Alteração       | Hotel                | Testar alteração de reservas                             | Como hotel, você precisa alterar uma reserva existente.         |
| CTU-12 - Aprovação       | Administrador        | Testar aprovação de novos hotéis                         | Como administrador, você deve aprovar um novo hotel cadastrado. |

## 7. Análise dos Dados

As métricas a serem coletadas e analisadas incluem:

- Taxa de sucesso: porcentagem de tarefas concluídas sem erro.
- Erros críticos e não críticos: identificação e categorização dos erros cometidos.
- Tempo de execução: tempo médio que cada usuário leva para completar as tarefas.
- Satisfação do usuário: feedback qualitativo sobre a experiência durante os testes.

A tabela abaixo será utilizada para registrar e analisar os dados coletados durante os testes:

| Usuário    | Resposta Emocional | Execução      | Tempo (seg) | Ações/Cliques | Cometeu Erro? | Recuperou do Erro? | Observações         |
|------------|---------------------|---------------|-------------|----------------|----------------|---------------------|----------------------|
| Usuario01  | --------             | --------      | --------     | --------        | --------        | --------        | --------              |
| Usuario02  | --------             | --------   | --------     | --------        | --------        | --------        | --------              |
| Usuario03  | --------             | --------      | --------     | --------        | --------        | --------        | --------              |
| Usuario04  | --------             | --------      | --------     | --------        | --------        | --------        | --------              |
| Usuario05  | --------             | --------   | --------     | --------        | --------        | --------        | --------              |

As informações coletadas ajudarão a identificar pontos de melhoria na interface e nas funcionalidades do aplicativo, com o intuito de oferecer uma melhor experiência ao usuário.

As seguintes informações serão utilizadas para preencher a tabela:

> - Usuário: código de cada usuário;
> - Resposta emocional: confuso, confiante, neutro, satisfeito, insatisfeito, ou estressado;
> - Execução: concluiu ou não concluiu;
> - Tempo (seg): cronometrar e colocar o tempo em segundos utilizado para realização ou não da tarefa;
> - Ações: contabilizar quantos movimentos e cliques foram feitos para realização ou não da tarefa;
> - Cometeu erro?: sim ou não;
> - Se recuperou do erro?: sim, não ou n/a.


---

