const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuario já cadastrado');
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
        
            return novoUsuario;    
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário');
        }
        
    }

    async buscar() {
        const usuariosCadastrados = await database.usuarios.findAll();
        return usuariosCadastrados;
    }

    async buscarPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })

        if (!usuario) {
            throw new Error('Usuário informado não cadastrado')
        }

        return usuario;
    }

    async editar(dto) {
        const usuario = await this.buscarPorId(dto.id);

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email

            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuário')
        }
    }
}

module.exports = UsuarioService