/// <reference types="cypress" />

import Factory from '../fixtures/factory'
import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos os usuarios cadastrados na serverest', () => {
       Serverest.buscarUsuarios().then( res => {
        cy.log('Será validado o contrato')
        cy.contractValidation(res, "get-usuarios", 200)
        ValidaServerest.validarBuscaDeUsuarios(res) 
            
        })      
    })

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then( res => {
            cy.contractValidation(res, "post-usuarios", 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })      
    })

    it('Deve realizar login com suscesso', () => {
        Serverest.buscarUsuariosParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res=> {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
           })
        }) 
       
    })

    it('Deve buscar e salvar um usuário em um arquivo json', () => {
            Serverest.buscarUsuarios().then(res => {
            let qtd_usuarios = res.body.quantidade
            let inteiro = Factory.gerarInteiroAleatorio()
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[inteiro])
            ValidaServerest.validarBuscaDeUsuarios(res) 
                
            })
    })


    it('Deve buscar o usuário de uma arquivo json', () => {
       cy.fixture('usuario.json').then(json => {
        let usuario = {
            email: json.email,
            password: json.password
        }
       

        }) 
    })
})
 

