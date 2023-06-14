const database = require('../models')
const uuid = require('uuid')

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (permissao) {
            throw new Error('Permissao já cadastrada');
        }

        try {
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newPermissao;
        } catch (error) {
            throw new Error('Erro ao cadastrar permissão')
        }
    }

    async buscar() {
        const permissoes = await database.permissoes.findAll();
        return permissoes;
    }

    async buscarPorId(id) {
        const permissao = await database.permissoes.findOne({
            where: {
                id: id
            }
        })

        if (!permissao) {
            throw new Error('Permissao informada não cadastrada')
        }

        return permissao;
    }

    async editar(dto) {
        const permissao = await this.buscarPorId(dto.id)
        
        try {
            permissao.nome = dto.nome,
            permissao.descricao = dto.descricao

            await permissao.save()
            return permissao
        } catch (error) {
            throw new Error('Erro ao editar permissao')
        }
    }

    async deletar(id) {
        const permissao = await this.buscarPorId(id)

        try {
            await database.permissoes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar permissão')
        }
    }
}

module.exports = PermissaoService