import Factory from '../fixtures/factory'

const URL_USUARIOS  = '/usuarios'
const URL_lOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    static buscarUsuarios(){
        return cy.rest('GET', URL_USUARIOS)
    }

    static buscarUsuariosParaLogin() {
        cy.request (URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
                
            })
    }
    static logar(usuario){
        return cy.rest('POST', URL_lOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
       
    }

    //produtos//

    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProdutoComSucesso() {
       let produto = Factory.gerarProduto()
       return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
        
    }
    static buscarCarrinhos(){
        return cy.rest('GET', URL_CARRINHOS)
    }

 
    static deletarProdutoCadastrado () {
        return cy.request({
            method: 'DELETE',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            auth: {
                bearer: Cypress.env("bearer")
            }

        })
    }
    static deletarCarrinhoCadastrado_concluir () {
        return cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/concluir-compra`,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    } 

    static deletarCarrinhoCadastrado_cancelar   () {
        return cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/cancelar-compra`,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    } 

    static cadastrarCarrinhoComSucesso() {
             return cy.request({
             method: 'POST',
             url: URL_CARRINHOS,
             body:{
                "produtos": [
                  {
                    "idProduto": "BeeJh5lz3k6kSIzA",
                    "quantidade": 8
                  },
                  {
                    "idProduto": "K6leHdftCeOJj8BJ",
                    "quantidade": 7
                  }
                ]
            },
            failOnStatusCode: false,
            auth: {
            bearer: Cypress.env("bearer")
                }
                  
             })

             }
         
         
            }
