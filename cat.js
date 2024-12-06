listarCat();

function listarCat() {
  // Requisição GET para listar os produtos
  axios
    .get(`${url}/categoria-despesa`)
    .then((response) => {
      const data = response.data;
      const table = document.getElementById("tbodyCat");
      table.innerHTML = ""; // Limpa a tabela antes de adicionar os dados

      // Adiciona uma linha para cada produto
      data.forEach((cat) => {
        const row = document.createElement("tr");

        // Cria cada célula (td) dinamicamente
        const id = document.createElement("td");
        id.textContent = cat.id_categoria_despesa || "-";
        row.appendChild(id);

        const nome = document.createElement("td");
        nome.textContent = cat.nome || "-";
        row.appendChild(nome);

        const descricao = document.createElement("td");
        descricao.textContent = cat.descricao || "-";
        row.appendChild(descricao);

        // Célula para ações (botões)
        const botoes = document.createElement("td");

        // Botão Editar
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "buttonAcoes edit-button";
        editar.onclick = () => openCatModal(cat); // Passa o ID do produto para a função editar
        botoes.appendChild(editar);

        // Botão Excluir
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "buttonAcoes delete-button";
        excluir.onclick = () => excluirCat(cat.id_categoria_despesa, cat.nome); // Passa o ID e o NOME do produto para a função excluir
        botoes.appendChild(excluir);

        row.appendChild(botoes);

        // Adiciona a linha completa à tabela
        table.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro ao listar produtos: ", error);
      alert("Ocorreu um erro ao buscar os produtos.");
    });
}

function addCat() {
  // Verifica se o formulário é válido
  const form = document.getElementById("formCat");
  if (!form.checkValidity()) {
    form.reportValidity(); // Mostra mensagens de erro nativas do navegador
    return;
  }

  // Coletando dados do formulário
  const formDados = {
    nome: document.getElementById("categoryName").value,
    descricao: document.getElementById("categoryDescription").value,
  };

  // Enviando dados via POST para a API
  axios
    .post(`${url}/categoria-despesa`, formDados)
    .then((response) => {
      alert("Categoria adicionada com sucesso!");
      form.reset(); // Limpa o formulário após o envio
      console.log("Resposta:", response.data);
    })
    .catch((error) => {
      alert("Erro ao adicionar categoria:", error);
      console.error("Erro ao adicionar categoria:", error);
    });
}

function excluirCat(id, nome) {
  const confirmar = confirm(
    'Tem certeza que deseja excluir o produto: "' + nome + '"?'
  );
  if (confirmar) {
    axios
      .delete(`${url}/categoria-despesa/${id}`)
      .then((response) => {
        alert('Produto: "' + nome + '" excluído com sucesso!');
        listarCat(); // Atualiza a tabela após exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir produto:", error);
        alert("Ocorreu um erro ao excluir o produto.");
      });
  }
}

function editarCat() {
  // Verifica se o formulário é válido
  const form = document.getElementById("formEditCat");
  if (!form.checkValidity()) {
    form.reportValidity(); // Mostra mensagens de erro nativas do navegador
    return;
  }

  // Coletando dados do formulário
  const id = document.getElementById("catExpenseId").value; // Corrigido
  const formDados = {
    nome: document.getElementById("editCategoryName").value,
    descricao: document.getElementById("editCategoryDescription").value,
  };

  // Enviando dados via PUT para a API
  axios
    .put(`${url}/categoria-despesa/${id}`, formDados)
    .then((response) => {
      alert("Despesa editada com sucesso!");
      document.getElementById("categoryModal").style.display = "none"; // Fecha o modal
      form.reset(); // Limpa o formulário após o envio
      listarCat(); // Atualiza a tabela após edição
    })
    .catch((error) => {
      alert("Erro ao editar despesa:", error);
      console.error("Erro ao editar despesa:", error);
    });
}
