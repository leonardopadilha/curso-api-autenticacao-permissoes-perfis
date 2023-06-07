const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/role', RoleController.buscar)
    .get('/role/:id', RoleController.buscarPorId)
    .delete('/role/:id', RoleController.deletar)
    .put('/role/:id', RoleController.editar)

module.exports = router