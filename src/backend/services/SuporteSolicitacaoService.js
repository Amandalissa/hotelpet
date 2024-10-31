export default class SuporteSolicitacaoService {
  constructor(repository) {
    this.repository = repository;
  }

  async create({ nome, email, mensagem }) {
    try {
      const newRequest = await this.repository.create({
          nome,
          email,
          mensagem,
          status: 'open',
      });
      return newRequest;
    } catch (error) {
      throw new Error('Erro ao criar solicitaçāo de suporte!' + error.message);
    }
  }

  async list(sortBy = 'criado_em', order = 'ASC') {
    try {
      const requests = await this.repository.findAll(sortBy, order);
      return requests;
    } catch (error) {
      throw new Error('Erro ao listar solicitações de suporte: ' + error.message);
    }
  }

  async updateStatus(id, status) {
    try {
      const solicitacao = await this.repository.findById(id);

      if (!solicitacao) {
        throw new Error('Solicitação não encontrada');
      }

      solicitacao.status = status;
      await solicitacao.save();
      return solicitacao.status;
    } catch (error) {
      throw new Error('Erro ao atualizar status da solicitação: ' + error.message);
    }
  }
}
