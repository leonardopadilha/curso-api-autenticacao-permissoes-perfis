const database = require('../models')
const uuid = require('uuid')

class PermissaoService {
    static async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if (permissao) {
            throw new Error('Permissao já cadastrada');
        }

        try {
            const newPermissao = await database.permissao.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newPermissao;
        } catch (error) {
            throw new Error('Erro ao cadastrar permissão')
        }
    }
}

module.exports = PermissaoService