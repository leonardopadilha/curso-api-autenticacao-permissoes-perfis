const { Router } = require('express');
const router = Router();

const PermissaoController = require('../controllers/permissaoController')

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao', PermissaoController.buscar)
    .get('/permissao/:id', PermissaoController.buscarPorId)
    .delete('/permissao/:id', PermissaoController.deletar)
    .put('/permissao/:id', PermissaoController.editar)

module.exports = router