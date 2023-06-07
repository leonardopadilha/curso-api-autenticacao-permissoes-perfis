const database = require('../models');
const uuid = require('uuid')

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (role) {
            throw new Error('Role já cadastrada')
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return newRole
        } catch (error) {
            throw new Error('Role informada não cadastrada')
        }
    }

    async buscar() {
        const roles = await database.roles.findAll()
        return roles;
    }

    async buscarPorId(id) {
        const role = await database.roles.findOne({
            where: {
                id: id
            }
        })

        if (!role) {
            throw new Error('Role informada não cadastrada')
        }

        return role;
    }

    async editar(dto) {
        const role = await this.buscarPorId(dto.id)

        try {
            role.nome =  dto.nome,
            role.descricao = dto.descricao

            await role.save()
            return role
        } catch (error) {
            throw new Error('Erro ao editar role')
        }
    }

    async deletar(id) {
        await this.buscarPorId(id)

        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao deletar role')
        }
    }
}

module.exports = RoleService