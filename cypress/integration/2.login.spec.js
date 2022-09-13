/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /login da API Serverest', () => {

    it('Deve realizar login com suscesso', () => {
        Serverest.buscarUsuariosParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res=> {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
           })
        })    
     
})

    it('Deve realizar login sem suscesso', () => {
            cy.loginSemSucesso().then( res=> {
            cy.contractValidation(res, "get-login", 401)   //login com email e senha invalidos          
            ValidaServerest.validaLoginSemSucesso(res)
               
           })
            
              
         })      
        })    

    
