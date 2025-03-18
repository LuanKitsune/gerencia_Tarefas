import { carregarDadosUsuario } from './profile.js';
import { carregarTarefas } from './task.js';
import { carregarAmigos } from './friends.js';
import { carregarNotificacoes } from './notification.js';
import { carregarChat, enviarMensagem } from './chat.js';

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');

    try {
        console.log(token);
        const user = await carregarDadosUsuario(token);
        document.getElementById('nomeUsuario').textContent = user.name;

        const tasks = await carregarTarefas(token);
        const listaTarefas = document.getElementById('listaTarefas');
        listaTarefas.innerHTML = tasks.map(task => `
            <li>
                ${task.title} - 
                <span class="${task.completed ? 'concluida' : 'pendente'}">
                    ${task.completed ? 'Concluída' : 'Pendente'}
                </span>
            </li>
        `).join('');

        const friends = await carregarAmigos(token);
        const listaAmigos = document.getElementById('listaAmigos');
        listaAmigos.innerHTML = friends.map(friend => `
            <li>
                ${friend.name} 
                <button class="convidar" onclick="convidarParaTarefa('${friend._id}')">Convidar para Tarefa</button>
            </li>
        `).join('');

        const notifications = await carregarNotificacoes(token);
        document.getElementById('notificacaoNumero').textContent = notifications.length;

        const messages = await carregarChat(token);
        const mensagensChat = document.getElementById('mensagensChat');
        mensagensChat.innerHTML = messages.map(msg => `
            <li>${msg.from}: ${msg.message}</li>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados.');
    }
});

document.getElementById('enviarMensagem').addEventListener('click', async () => {
    const mensagem = document.getElementById('mensagem').value;
    if (!mensagem) {
        alert('Digite uma mensagem.');
        return;
    }

    try {
        await enviarMensagem(localStorage.getItem('token'), mensagem);
        document.getElementById('mensagem').value = '';

        const messages = await carregarChat(localStorage.getItem('token'));
        const mensagensChat = document.getElementById('mensagensChat');
        mensagensChat.innerHTML = messages.map(msg => `
            <li>${msg.from}: ${msg.message}</li>
        `).join('');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem.');
    }
});

const perfilContainer = document.querySelector(".perfil-container");
const perfilMenu = document.querySelector("#perfilMenu");
const notificacoesContainer = document.querySelector(".notificacoes-container");
const notificacoesMenu = document.createElement("div");

notificacoesMenu.classList.add("notificacoes-menu");
notificacoesMenu.innerHTML = `
    <p>Notificações</p>
    <ul id="listaNotificacoes">
        <li>Você tem uma nova mensagem!</li>
        <li>Seu amigo enviou um convite.</li>
    </ul>
`;
notificacoesContainer.appendChild(notificacoesMenu);

perfilContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    fecharOutrosMenus(perfilMenu);
    perfilMenu.classList.toggle("show");
});

notificacoesContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    fecharOutrosMenus(notificacoesMenu);
    notificacoesMenu.classList.toggle("show");
});

document.addEventListener("click", function () {
    perfilMenu.classList.remove("show");
    notificacoesMenu.classList.remove("show");
});

function fecharOutrosMenus(menuAberto) {
    document.querySelectorAll(".perfil-menu, .notificacoes-menu").forEach(menu => {
        if (menu !== menuAberto) {
            menu.classList.remove("show");
        }
    });
}