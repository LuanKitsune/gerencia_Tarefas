export async function carregarChat(token) {
    try {
        const response = await fetch('http://localhost:5000/chat/messages', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar mensagens.');
        }

        const messages = await response.json();
        const mensagensChat = document.getElementById('mensagensChat');
        mensagensChat.innerHTML = messages.map(msg => `
            <li>${msg.from}: ${msg.message}</li>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        alert('Erro ao carregar mensagens.');
    }
}


export async function enviarMensagem(token, mensagem) {
    try {
        const response = await fetch('http://localhost:5000/chat/message', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar mensagem.');
        }

        await carregarChat(token);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem.');
    }
}

document.getElementById('enviarMensagem').addEventListener('click', async () => {
    const mensagem = document.getElementById('mensagem').value;
    if (!mensagem) {
        alert('Digite uma mensagem.');
        return;
    }

    const token = localStorage.getItem('token');
    await enviarMensagem(token, mensagem);
    document.getElementById('mensagem').value = ''; 
});