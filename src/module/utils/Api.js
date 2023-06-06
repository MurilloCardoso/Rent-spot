
class Api {


    static async InsertApi() {
        const novoJSON = { nome: "Homem-Aranha", poder: "Agilidade" };


        fetch('http://localhost:2000/inserirDados', {
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
      
        static ReadApi() {
            const url = 'http://localhost:2000/lerDados';
          
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao obter os dados');
                }
                return response.json();
              })
              .then(data => {
                console.log('Dados obtidos:', data);
                // Faça o processamento dos dados ou retorne-os para onde desejar
              })
              .catch(error => {
                console.error('Erro ao obter os dados:', error);
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
          
                  
        
}

export default Api;
