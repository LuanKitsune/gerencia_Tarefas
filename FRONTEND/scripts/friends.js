export async function carregarAmigos(token) {
    try {
        const response = await fetch('http://localhost:5000/friends', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar amigos.');
        }

        const friends = await response.json();
        const listaAmigos = document.getElementById('listaAmigos');
        listaAmigos.innerHTML = friends.map(friend => `
            <li>
                ${friend.name} 
                <button class="convidar" onclick="convidarParaTarefa('${friend._id}')">Convidar para Tarefa</button>
            </li>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar amigos:', error);
        alert('Erro ao carregar amigos.');
    }
}