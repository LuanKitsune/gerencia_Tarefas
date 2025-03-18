// Função para carregar tarefas do backend
export async function carregarTarefas(token) {
    try {
        const response = await fetch('http://localhost:5000/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar tarefas.');
        }

        const tasks = await response.json();
        return tasks; // Retorna as tarefas para serem usadas no lobby.js
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas.');
        return []; // Retorna uma lista vazia em caso de erro
    }
}

// Código existente para manipulação do modal e tarefas
document.addEventListener("DOMContentLoaded", () => {
    const novaTarefaBtn = document.getElementById("novaTarefaBtn");
    const modalNovaTarefa = document.getElementById("modalNovaTarefa");
    const closeModal = document.querySelector(".close");
    const salvarTarefa = document.getElementById("salvarTarefa");

    novaTarefaBtn.addEventListener("click", () => {
        modalNovaTarefa.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modalNovaTarefa.style.display = "none";
    });

    salvarTarefa.addEventListener("click", () => {
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const prazo = document.getElementById("prazo").value;
        const privacidade = document.getElementById("privacidade").value;
        
        if (titulo.trim() === "") {
            alert("O título da tarefa não pode estar vazio!");
            return;
        }

        const novaTarefa = {
            titulo,
            descricao,
            prazo,
            privacidade,
            status: "pendente"
        };

        adicionarTarefa(novaTarefa);
        modalNovaTarefa.style.display = "none";
    });

    function adicionarTarefa(tarefa) {
        const lista = document.getElementById("pendentesLista");
        const item = document.createElement("li");
        item.textContent = tarefa.titulo;
        item.addEventListener("click", () => moverParaAndamento(item));
        lista.appendChild(item);
    }

    function moverParaAndamento(item) {
        const andamentoLista = document.getElementById("andamentoLista");
        andamentoLista.appendChild(item);
        item.removeEventListener("click", moverParaAndamento);
        item.addEventListener("click", () => moverParaConcluido(item));
    }

    function moverParaConcluido(item) {
        const concluidoLista = document.getElementById("concluidasLista");
        concluidoLista.appendChild(item);
        item.removeEventListener("click", moverParaConcluido);
    }
});