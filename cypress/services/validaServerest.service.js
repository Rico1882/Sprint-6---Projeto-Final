
export default class ValidaServerest {
    //Validações das ações que podemos realizar
    static validarBuscaDeUsuarios(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validaLoginComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    static validarBuscaDeProdutos(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')  
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarCadastroDeProdutoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }
    static validarBuscaDeCarrinhos(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validaLoginSemSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.eq('Email e/ou senha inválidos')
    }

    static validarCarrinhoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body._id).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('_id')
        expect(resposta.body.message).to.string('Cadastro realizado com sucesso')
        Cypress.env('idCarrinhoCadastrado', resposta.body._id)
    }
}