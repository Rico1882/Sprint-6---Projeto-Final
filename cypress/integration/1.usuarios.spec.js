/// <reference types="cypress" />


import Factory from '../fixtures/factory'
import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos os usuarios cadastrados', () => {
       Serverest.buscarUsuarios().then( res => {
        cy.contractValidation(res, "get-usuarios", 200)
        ValidaServerest.validarBuscaDeUsuarios(res) 
            
        })      
    })
   
        
    it('Deve cadastrar um usuário com sucesso', () => {
        let usuario = Factory.gerarUsuario()
        Serverest.cadastrarUsuario(usuario).then( res => {
            cy.contractValidation(res,'post-usuarios', 201)
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Cypress.env('idUsuarioCadastrado', res.body._id)
        })
    })

    it('Deve buscar usuários por Id', () => {
        Serverest.buscarUsuariosPorId().then( res => {
         cy.contractValidation(res, "get-usuarios_Id", 200)
         ValidaServerest.validarBuscaDeUsuariosPorId(res) 
             
         })      
     })

    it('Deve cadastrar um usuário sem sucesso', () => {
        Serverest.BuscarUsuarioExistente()
        cy.get('@usuarioExistente').then( usuario => {
            Serverest.cadastrarUsuario(usuario).then( res=> {
            cy.contractValidation(res,'post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
            
    })
    })
})
})
 

