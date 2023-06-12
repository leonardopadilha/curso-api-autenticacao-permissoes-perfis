const { Router } = require('express');
const router = Router();

const PermissaoController = require('../controllers/permissaoController')

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao')
    .get('/permissao/:id')
    .delete('/permissao/:id')
    .put('/permissao/:id')

module.exports = router