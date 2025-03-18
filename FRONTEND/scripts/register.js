document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nome, email, password: senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso! Faça seu Login!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Erro ao cadastrar. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
});