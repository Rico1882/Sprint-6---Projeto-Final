/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    it('Deve Buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then(res => {
            ValidaServerest.validarBuscaDeProdutos(res)
        })  
    })

    context('Logar com sucesso', () => {
        beforeEach('logar', () => {
            Serverest.buscarUsuariosParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                    Serverest.logar(usuario).then( res=> {
                    ValidaServerest.validaLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
        })
    })

    it('Deve Cadastrar um novo produto com sucesso', () => {
        Serverest.cadastrarProdutoComSucesso().then( res => {
            cy.contractValidation(res, 'post-produtos', 201)
            ValidaServerest.validarCadastroDeProdutoComSucesso(res)
            })  
        })

    it('Deve Buscar produto por id', () => {
        Serverest.buscarProdutoPorId().then( res => {
        cy.contractValidation(res, 'get-produtos', 200)
        ValidaServerest.validarBuscaDeProdutosPorId(res)  
                    
        })  
    })    

    it('Deve Alterar um produto por id', () => {
        Serverest.editarProdutoPorId().then( res => {
        expect(res.body.message).to.be.equal('Registro alterado com sucesso')
    })  
})    

    
})
})