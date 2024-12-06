# Frontend para o Sistema de Monitoramento de Despesas

Este projeto é a interface frontend para o gerenciamento de despesas, desenvolvido em conjunto com o backend disponível no repositório [API-Despesas](https://github.com/jeiel2013/API-Despesas). A aplicação conecta-se ao backend para cadastrar, listar e gerenciar despesas de forma eficiente.

---

## Pré-requisitos

Para executar o projeto localmente, é necessário:

- **Navegador web moderno** (Google Chrome, Mozilla Firefox, etc.);
- Backend configurado e em execução ([API-Despesas](https://github.com/jeiel2013/API-Despesas));
- Conexão com a API utilizando o endereço e a porta adequados, conforme configuração do backend.

---

## Estrutura do Projeto

O projeto contém os seguintes arquivos:

- **index.html**: Ponto de entrada principal da aplicação.
- **style.css**: Arquivo de estilos que define o design da interface.
- **script.js**: Gerencia a lógica do frontend e a integração com o backend.
- **utilities.js**: Contém funções auxiliares utilizadas no projeto.
- **cat.js**: Arquivo com lógica específica para funcionalidades adicionais.

---

## Configuração

1. **Clonar o repositório do backend**:
   ```bash
   git clone https://github.com/jeiel2013/API-Despesas.git
   cd API-Despesas
   npm install
   npm start
   ```

2. **Clonar este repositório (Frontend)**:
   Extraia os arquivos enviados para uma pasta no seu sistema.

3. **Configurar o endpoint da API**:
   No arquivo `script.js`, atualize a URL base para a API, se necessário:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000';
   ```

4. **Abrir o projeto no navegador**:
   - Navegue até o arquivo `index.html` e abra-o no navegador.

---

## Uso

Após configurar o backend e o frontend:

- Acesse a página principal e realize ações como listar, cadastrar e remover despesas.
- As interações são feitas em tempo real com o backend.

---

## Personalização

Para ajustar o design ou a funcionalidade:

- Modifique o arquivo `style.css` para alterar o layout e as cores.
- Atualize os arquivos JavaScript para implementar novas funcionalidades.

---

## Tecnologias Utilizadas

- HTML5 e CSS3
- JavaScript
- API REST

---

## Contato

Desenvolvido por Jeiel Jedson Leão Alves. Para mais informações, acesse meu [GitHub](https://github.com/jeiel2013).