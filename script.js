const pesquisar = document.getElementById("pesquisa")
const listar = document.getElementById("lista")

function AdicionarTarefa() {
    if (pesquisar.value === '') {
        alert("Digite uma tarefa");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = pesquisar.value;
        listar.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    pesquisar.value = "";
    SalvarTarefas();
}

listar.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        SalvarTarefas();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        SalvarTarefas();
    }
}, false);

function SalvarTarefas() {
    localStorage.setItem("tarefa", listar.innerHTML);
}

function MostrarTarefas() {
    listar.innerHTML = localStorage.getItem("tarefa");
}
MostrarTarefas();