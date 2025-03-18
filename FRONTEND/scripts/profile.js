const carregarDadosUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }
  
      const response = await fetch('http://localhost:5000/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao carregar dados do usuário');
      }
  
      const data = await response.json();
      console.log('Dados do usuário:', data);
      return data;
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      throw error;
    }
  };

  export { carregarDadosUsuario };