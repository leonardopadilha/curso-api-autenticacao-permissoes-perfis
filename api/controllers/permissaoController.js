const PermissaoService = require('../services/permissaoService')
const permissaoService = new PermissaoService()

class PermissaoController {
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao })
            res.status(201).send(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        try {
            const permissoes = await permissaoService.buscar()
            res.status(200).send(permissoes)
        } catch (error) {
            res.status(404).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController