preencherCategorias();
preencherCategoriasEdit();
// Função para abrir e fechar modais
function Modal(modalType) {
  const categoryModal = document.getElementById("categoryModal");
  const expenseModal = document.getElementById("expenseModal");

  if (modalType === "category") {
    categoryModal.style.display = "flex";
  } else if (modalType === "expense") {
    expenseModal.style.display = "flex";
  }

  // Fechar o modal ao clicar fora do conteúdo
  window.onclick = (event) => {
    if (event.target === categoryModal) {
      categoryModal.style.display = "none";
    }
    if (event.target === expenseModal) {
      expenseModal.style.display = "none";
    }
  };
}

// Funções para fechar modais ao clicar no botão "x"
document.getElementById("closeCategoryModal").onclick = () => {
  document.getElementById("categoryModal").style.display = "none";
};

document.getElementById("closeExpenseModal").onclick = () => {
  document.getElementById("expenseModal").style.display = "none";
};

function formatISODate(isoDate) {
  const date = new Date(isoDate);

  // Extraindo dia, mês e ano
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

async function preencherCategorias() {
  try {
    // Faz a requisição para obter as categorias
    const response = await axios.get(`${url}/categoria-despesa`);
    const categorias = response.data;

    // Obtém o elemento select
    const select = document.getElementById("expenseCategory");

    // Limpa o select antes de adicionar os itens
    select.innerHTML =
      '<option value="" disabled selected>Selecione uma categoria</option>';

    // Adiciona cada categoria como uma opção no select
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.id_categoria_despesa; // Define o ID como valor da opção
      option.textContent = categoria.nome; // Define o nome como texto visível
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar categorias: ", error);
    alert("Ocorreu um erro ao carregar as categorias.");
  }
}

function openEditModal(despesa) {
  // Preenche os campos do modal com os dados da despesa selecionada
  document.getElementById("editExpenseId").value = despesa.id_despesa;
  document.getElementById("editExpenseDescription").value = despesa.descricao;
  document.getElementById("editExpenseValue").value = despesa.valor;

  // Formata a data para o formato YYYY-MM-DD
  const data = new Date(despesa.data);
  document.getElementById("editExpenseDate").value = data
    .toISOString()
    .split("T")[0];

  document.getElementById("editExpenseCategory").value =
    despesa.id_categoria_despesa;
  document.getElementById("editExpenseStatus").value = despesa.status;
  document.getElementById("editExpensePay").value = despesa.forma_pagamento;

  // Mostra o modal de edição
  document.getElementById("editExpenseModal").style.display = "flex";
}

// Fecha o modal de edição
document.getElementById("closeEditExpenseModal").onclick = function () {
  document.getElementById("editExpenseModal").style.display = "none";
};

function openCatModal(cat) {
  // Preenche os campos do modal com os dados da despesa selecionada
  document.getElementById("catExpenseId").value = cat.id_categoria_despesa;
  document.getElementById("editCategoryName").value = cat.nome;
  document.getElementById("editCategoryDescription").value = cat.descricao;
  // Mostra o modal de edição
  document.getElementById("editCategoryModal").style.display = "flex";
}

// Fecha o modal de edição
document.getElementById("closeEditCategoryModal").onclick = function () {
  document.getElementById("editCategoryModal").style.display = "none";
};

async function preencherCategoriasEdit() {
  try {
    // Faz a requisição para obter as categorias
    const response = await axios.get(`${url}/categoria-despesa`);
    const categorias = response.data;

    // Obtém o elemento select
    const select = document.getElementById("editExpenseCategory");

    // Limpa o select antes de adicionar os itens
    select.innerHTML =
      '<option value="" disabled selected>Selecione uma categoria</option>';

    // Adiciona cada categoria como uma opção no select
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.id_categoria_despesa; // Define o ID como valor da opção
      option.textContent = categoria.nome; // Define o nome como texto visível
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar categorias: ", error);
    alert("Ocorreu um erro ao carregar as categorias.");
  }
}
