export async function carregarNotificacoes(token) {
    try {
        const response = await fetch('http://localhost:5000/notifications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar notificações.');
        }

        const notifications = await response.json();
        document.getElementById('notificacaoNumero').textContent = notifications.length;
    } catch (error) {
        console.error('Erro ao carregar notificações:', error);
        alert('Erro ao carregar notificações.');
    }
}