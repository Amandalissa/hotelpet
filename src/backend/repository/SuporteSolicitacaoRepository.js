import SuporteSolicitacao from '../models/suporte_solicitacao.js';

class SuporteSolicitacaoRepository {

	async create(data) {
    try {
      const newSolicitacao = await SuporteSolicitacao.create(data);
      return newSolicitacao;
    } catch (error) {
      throw new Error(`Erro ao criar solicitacao: ${error.message}`);
    }
  }

  async findAll(sortBy = 'criado_em', order = 'ASC') {
    try {
      const requests = await SuporteSolicitacao.findAll({
        order: [[sortBy, order]],
      });
      return requests;
    } catch (error) {
      throw new Error(`Erro ao listar solicitações: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await SuporteSolicitacao.findByPk(id);
    } catch (error) {
      throw new Error(`Erro ao buscar solicitacao por ID: ${error.message}`);
    }
  }
}

export default SuporteSolicitacaoRepository;
