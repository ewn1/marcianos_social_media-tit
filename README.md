# True is Tough (Social Media)

Uma aplicação de rede social moderna desenvolvida com foco em performance, experiência de usuário fluida (inspirada no twitter/X) e uma arquitetura limpa tanto no Front-end quanto no Back-end.

---

## Tecnologias Utilizadas

### **Front-end**
* **React** (com TypeScript)
* **Styled-Components** (para estilização componentizada e dinâmica)
* **React Router Dom** (para navegação e rotas protegidas)
* **Axios** (para comunicação com a API)

### **Back-end**
* **Python / Django REST Framework (DRF)**
* **JWT Authentication** (SimpleJWT para segurança de sessões)
* **PostgreSQL** (Gerenciado na nuvem via **NeonDB**)
* **Docker & Docker Compose** (Para containerização e isolamento de ambiente)

---

## Funcionalidades Principais

* **Autenticação Segura:** Cadastro, login com tokens JWT e gerenciamento de sessão.
* **Perfil de Usuário:** Personalização de foto de avatar (via upload multipart), edição de nickaname de exibição, bio e alteração de senha.
* **Rede Social Interativa:**
  * Sistema completo de **Seguir / Deixar de seguir** com atualização dinâmica de estado e indicador visual.
  * Modais interativos para visualização das listas de **Seguidores** e **Seguindo**.
* **Feed Dinâmico e Postagens (Tit's):**
  * Criação, listagem e interação com postagens.
  * Sistema de curtidas e comentários integrados.
  * Tela de **Explore** com busca dinâmica de usuários pelo nickname.

---

## 🐳 Como Executar o Projeto com Docker

Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados na sua máquina.

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/SEU_REPO.git](https://github.com/SEU_USUARIO/SEU_REPO.git)
   cd SEU_REPO
