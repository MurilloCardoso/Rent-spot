
class Api {


  static async LoginUserApi(novoJSON) {
    try {
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoJSON)
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.nome);

        // Redirecionar para a página protegida ou fazer outras ações necessárias
        console.log(data);
      } else {

        throw new Error('Erro ao inserir os dados');
      }
    } catch (error) {
      console.error('Erro ao inserir os dados:', error);
      // Lide com o erro adequadamente
    }
  }
  
        static async LerTesteID(id) {
          try {
            const url = 'http://localhost:2000/lerTeste/' + id;
        
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Erro ao obter os dados');
            }
        
            const data = await response.json();
            console.log('Dados obtidos:', data);
        
            return data; // Retorne os dados obtidos para onde desejar
          } catch (error) {
         
            console.error('Erro ao obter os dados:', error);
            throw error; // Lança o erro para que possa ser tratado em outro lugar, se necessário
          }
        }
        
        static async LerTesteCriados() {
          try {
            const url = 'http://localhost:2000/lerTestesCriados';
          
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Erro ao obter os dados');
            }
          
            const data = await response.json();
            console.log('Dados obtidos:', data);
         
            return data; // Retorne os dados obtidos para onde desejar
          } catch (error) {
         
            console.error('Erro ao obter os dados:', error);
            throw error; // Lança o erro para que possa ser tratado em outro lugar, se necessário
          }
        }
        static async LerResultados() {
          try {
            const url = 'http://localhost:2000/lerResultados';
          
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Erro ao obter os dados');
            }
          
            const data = await response.json();
            console.log('Dados obtidos:', data);
          
            return data; // Retorne os dados obtidos para onde desejar
          } catch (error) {
            
       
            console.error('Erro ao obter os dados:', error);
            throw error; // Lança o erro para que possa ser tratado em outro lugar, se necessário
          }
        }
        static async InsertUserApi(novoJSON) {
    
    
          fetch('http://localhost:2000/inserirUsuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoJSON)
          })
            .then(async response => {
              if (response.ok) {  
                
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.nome);
        
                // Redirecionar para a página protegida ou fazer outras ações necessárias
                console.log(data);
                return response.json();
              } else {
                throw new Error('Erro ao inserir os dados');
              }
            })
            .then(data => {
              
              console.log(data); // Mensagem de sucesso do servidor
              // Faça o que for necessário após a inserção dos dados
            })
            .catch(error => { 
              console.error('Erro ao inserir os dados:', error);
              // Lide com o erro adequadamente
            });
          }
          static async InsertNovoTesteApi(novoJSON) {
    
            fetch('http://localhost:2000/inserirTeste', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(novoJSON)
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Erro ao inserir os dados');
                }
              })
              .then(data => {
                console.log(data); // Mensagem de sucesso do servidor
                // Faça o que for necessário após a inserção dos dados
              })
              .catch(error => { 
                console.error('Erro ao inserir os dados:', error);
                // Lide com o erro adequadamente
              });
            }

            
            static async InsertRespostaApi(novoJSON) {
    
    
              fetch('http://localhost:2000/inserirResposta', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoJSON)
              })
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Erro ao inserir os dados');
                  }
                })
                .then(data => {
                  console.log(data); // Mensagem de sucesso do servidor
                  // Faça o que for necessário após a inserção dos dados
                })
                .catch(error => {
                  console.error('Erro ao inserir os dados:', error);
                  // Lide com o erro adequadamente
                });
              }
              static async UpdateTesteApi(id, novoJSON) {
                try {
                  const response = await fetch(`http://localhost:2000/updateTeste/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoJSON)
                  });
              
                  if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Success message from the server
                    // Perform any necessary actions after data update
                  } else {
                    throw new Error('Failed to update data');
                  }
                } catch (error) {
             
                  console.error('Error while updating data:', error);
                  // Handle the error appropriately
                }
              }
              
              
              static async DeleteTesteApi(id) {
                try {
                  const response = await fetch('http://localhost:2000/deletarTeste/' + id, {
                    method: 'DELETE',
                  });
              
                  if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Mensagem de sucesso do servidor
                    // Faça o que for necessário após a exclusão do documento
                  } else {
                    throw new Error('Erro ao excluir o documento');
                  }
                } catch (error) {
                  console.error('Erro ao excluir o documento:', error);
                  // Lide com o erro adequadamente
                }
              }
}

export default Api;
