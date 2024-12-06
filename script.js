const url = "http://localhost:3000";
listarDespesas();

async function listarDespesas() {
  try {
    // Requisição para obter despesas e categorias
    const [despesasResponse, categoriasResponse] = await Promise.all([
      axios.get(`${url}/despesa`),
      axios.get(`${url}/categoria-despesa`),
    ]);

    const despesas = despesasResponse.data;
    const categorias = categoriasResponse.data;

    // Mapeando IDs de categorias para nomes
    const categoriasMap = categorias.reduce((map, categoria) => {
      map[categoria.id_categoria_despesa] = categoria.nome; // Substitua "nome" pelo campo correto
      return map;
    }, {});

    const table = document.getElementById("tbodyDesp");
    table.innerHTML = ""; // Limpa a tabela antes de adicionar os dados

    // Preenchendo a tabela com as despesas e os nomes das categorias
    despesas.forEach((despesa) => {
      const row = document.createElement("tr");

      // Criação dinâmica das células
      const id = document.createElement("td");
      id.textContent = despesa.id_despesa || "-";
      row.appendChild(id);

      const descricao = document.createElement("td");
      descricao.textContent = despesa.descricao || "-";
      row.appendChild(descricao);

      const valor = document.createElement("td");
      valor.textContent = `R$${despesa.valor.toFixed(2)}`;
      row.appendChild(valor);

      const data = document.createElement("td");
      if (despesa.data) {
        const dataObj = new Date(despesa.data);
        const dia = String(dataObj.getDate()).padStart(2, "0");
        const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
        const ano = dataObj.getFullYear();
        data.textContent = `${dia}/${mes}/${ano}`;
      } else {
        data.textContent = "-";
      }
      row.appendChild(data);

      const categoria = document.createElement("td");
      categoria.textContent =
        categoriasMap[despesa.id_categoria_despesa] || "Categoria desconhecida";
      row.appendChild(categoria);

      const status = document.createElement("td");
      status.textContent = despesa.status || "-";
      row.appendChild(status);

      const pagamento = document.createElement("td");
      pagamento.textContent = despesa.forma_pagamento || "-";
      row.appendChild(pagamento);

      // Célula para ações (botões)
      const botoes = document.createElement("td");

      // Botão Editar
      const editar = document.createElement("button");
      editar.textContent = "Editar";
      editar.className = "buttonAcoes edit-button";
      editar.onclick = () => openEditModal(despesa);
      botoes.appendChild(editar);

      // Botão Excluir
      const excluir = document.createElement("button");
      excluir.textContent = "Excluir";
      excluir.className = "buttonAcoes delete-button";
      excluir.onclick = () =>
        excluirProduto(despesa.id_despesa, despesa.descricao);
      botoes.appendChild(excluir);

      row.appendChild(botoes);

      // Adiciona a linha completa à tabela
      table.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao listar despesas: ", error);
    alert("Ocorreu um erro ao buscar as despesas.");
  }
}

function addDespesa() {
  // Verifica se o formulário é válido
  const form = document.getElementById("formDespesa");
  if (!form.checkValidity()) {
    form.reportValidity(); // Mostra mensagens de erro nativas do navegador
    return;
  }
  const dateValue = document.getElementById("expenseDate").value; // formato YYYY-MM-DD
  const dateObj = new Date(dateValue);
  const isoDate = dateObj.toISOString(); // formato ISO 8601

  // Coletando dados do formulário
  const formDados = {
    descricao: document.getElementById("expenseDescription").value,
    valor: parseFloat(document.getElementById("expenseValue").value),
    data: isoDate,
    forma_pagamento: document.getElementById("expensePay").value,
    status: document.getElementById("expenseStatus").value,
    id_categoria_despesa: parseInt(
      document.getElementById("expenseCategory").value
    ),
  };

  // Enviando dados via POST para a API
  axios
    .post(`${url}/despesa`, formDados)
    .then((response) => {
      alert("Produto adicionado com sucesso!");
      form.reset(); // Limpa o formulário após o envio
      console.log("Resposta:", response.data);
    })
    .catch((error) => {
      alert("Erro ao adicionar produto:", error);
      console.error("Erro ao adicionar produto:", error);
    });
}

function editarDespesa() {
  // Verifica se o formulário é válido
  const form = document.getElementById("formEditDespesa");
  if (!form.checkValidity()) {
    form.reportValidity(); // Mostra mensagens de erro nativas do navegador
    return;
  }

  const dateValue = document.getElementById("editExpenseDate").value; // formato YYYY-MM-DD
  const dateObj = new Date(dateValue);
  const isoDate = dateObj.toISOString(); // formato ISO 8601

  // Coletando dados do formulário
  const id = document.getElementById("editExpenseId").value; // Corrigido
  const formDados = {
    descricao: document.getElementById("editExpenseDescription").value, // Corrigido
    valor: parseFloat(document.getElementById("editExpenseValue").value), // Corrigido
    data: isoDate, // Corrigido
    forma_pagamento: document.getElementById("editExpensePay").value, // Corrigido
    status: document.getElementById("editExpenseStatus").value, // Corrigido
    id_categoria_despesa: parseInt(
      document.getElementById("editExpenseCategory").value // Corrigido
    ),
  };

  // Enviando dados via PUT para a API
  axios
    .put(`${url}/despesa/${id}`, formDados)
    .then((response) => {
      alert("Despesa editada com sucesso!");
      form.reset(); // Limpa o formulário após o envio
      listarDespesas(); // Atualiza a tabela após edição
    })
    .catch((error) => {
      alert("Erro ao editar despesa:", error);
      console.error("Erro ao editar despesa:", error);
    });
}

function excluirProduto(id, nome) {
  const confirmar = confirm(
    'Tem certeza que deseja excluir o produto: "' + nome + '"?'
  );
  if (confirmar) {
    axios
      .delete(`${url}/despesa/${id}`)
      .then((response) => {
        alert('Produto: "' + nome + '" excluído com sucesso!');
        listarDespesas(); // Atualiza a tabela após exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir produto:", error);
        alert("Ocorreu um erro ao excluir o produto.");
      });
  }
}
