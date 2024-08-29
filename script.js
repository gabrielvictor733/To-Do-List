const pesquisar = document.getElementById("pesquisa");
const listar = document.getElementById("lista");


const inputs = {
    data: {
        type: 'date',
        id: 'data',
        placeholder: 'Data'
    },
    hora: {
        type: 'time',
        id: 'hora',
        placeholder: 'Hora'
    }
};


function criarInputs() {
    const containerPesquisa = document.querySelector('.pesquisa');

    for (let key in inputs) {
        let input = document.createElement('input');
        let config = inputs[key];


        input.type = config.type;
        input.id = config.id;
        input.placeholder = config.placeholder;


        containerPesquisa.appendChild(input);
    }
}


criarInputs();

function AdicionarTarefa() {
    const inputData = document.getElementById("data");
    const inputHora = document.getElementById("hora");
    const tarefa = pesquisar.value.trim();
    const data = formatarData(inputData.value);
    const hora = inputHora.value;

    if (tarefa === '') {
        alert("Digite uma tarefa");
    } else {
        let li = document.createElement("li");


        li.innerHTML = `${tarefa}`;
        if (data || hora) {
            li.innerHTML += ` - <small>${data ? data : ''} ${hora ? hora : ''}</small>`;
        }

        listar.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    pesquisar.value = "";
    inputData.value = "";
    inputHora.value = "";

    SalvarTarefas();
}


function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

listar.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        SalvarTarefas();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        SalvarTarefas();
    }
}, false);

function SalvarTarefas() {
    localStorage.setItem("tarefa", listar.innerHTML);
}

function MostrarTarefas() {
    listar.innerHTML = localStorage.getItem("tarefa") || '';
}

MostrarTarefas();


pesquisar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        AdicionarTarefa();
    }
});
