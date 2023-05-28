const UsuarioService = require('../services/usuarioService');
const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        try {
            const usuario = await usuarioService.cadastrar({ nome, email, senha });
            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscar(req, res) {
        try {
            const usuariosCadastrados = await usuarioService.buscar();
            res.status(200).send(usuariosCadastrados);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const usuario = await usuarioService.buscarPorId(id);
            res.status(200).send(usuario);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    }

    static async editar(req, res) {
        const { id } = req.params;
        const { nome, email } = req.body;
        
        try {
            const usuario = await usuarioService.editar({ id, nome, email });
            res.send(200).send(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }
}

module.exports = UsuarioController