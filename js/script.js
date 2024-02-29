const input = document.getElementById("inputTarefa");
const card = document.querySelector(".card");
// querySelector pega o elemento ol
const listaOl = document.querySelector("#lista");

let tarefasListadas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarDadosNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefasListadas));
}

function criarLista(novaTarefa){
  // Adcionando as classes do bootstrap para o elemento LI
  novaTarefa.classList.add(
    "list-group-item",
    "list-group-item-action",
    "fw-medium"
  );
  // Adiciona o elemento LI na ol
  listaOl.appendChild(novaTarefa);
}

function click(novaTarefa){
  novaTarefa.addEventListener("click", () => {
    novaTarefa.classList.add(
      "text-muted",
      "bg-success-subtle",
      "text-decoration-line-through"
    );
  });

  novaTarefa.addEventListener("dblclick", () => {
    listaOl.removeChild(novaTarefa);
    tarefasListadas.splice(tarefasListadas.indexOf(novaTarefa.innerHTML), 1);
    salvarDadosNoStorage();
  });
}

function removerSpans() {
  let todosSpans = document.querySelectorAll("span");
  for (let i = 0; i < todosSpans.length; i++) {
    todosSpans[i].remove();
  }
}

for (let i = 0; i < tarefasListadas.length; i++) {
  const novaTarefa = document.createElement("li");
  novaTarefa.innerHTML = tarefasListadas[i];
  criarLista(novaTarefa)
  click(novaTarefa)
}

document.getElementById("botaoCadastrar").addEventListener("click", () => {
  if (input.value !== "") {
    const novaTarefa = document.createElement("li");
    tarefasListadas.push(input.value);
    criarLista(novaTarefa)

    // Adicionando o valor do input no elemento LI
    novaTarefa.innerHTML = input.value;

    // Limpa o input
    input.value = "";

    // Adiciona eventos de click e duplo click
    click(novaTarefa)

    // Limpar mensagens de erro caso existam
    removerSpans();

    // Salva os novos dados no banco de dados
    salvarDadosNoStorage();
  } else {
    removerSpans();

    let span = document.createElement("span");
    span.classList.add("alert", "alert-warning");
    let msg = document.createTextNode("Você precisa informar a tarefa!");
    span.appendChild(msg);
    card.appendChild(span);
  }
});




