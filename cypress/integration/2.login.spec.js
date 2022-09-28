/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /login da API Serverest', () => {

    it('Deve realizar login com email e senha corretos', () => {
        Serverest.buscarUsuariosParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res=> {
                cy.contractValidation(res, "post-login", 200)
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
           })
        })    
     
})

    it('Não deve realizar login com email e senha incorretos', () => {
            cy.loginSemSucesso().then( res=> {
            cy.contractValidation(res, "post-login", 400)   //login com email e senha invalidos          
            ValidaServerest.validaLoginSemSucesso(res)
               
           })
            
        })      
              
        it('Não deve realizar login com email e senha em branco', () => {
            cy.loginComEmailBranco().then( res=> {
            cy.contractValidation(res, "post-login", 400)   //login com email e senha invalidos          
            expect(res.body.message).to.be.undefined
               
           })
            
        })      
        
        })                

    
