import SuporteSolicitacao from '../models/suporte_solicitacao.js';

export default class SuporteSolicitacaoController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    const { name: nome, email, message: mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: ' Obrigatório nome, e-mail, e mensagem' });
    }

    try {
        const solicitacao = await this.service.create({ nome, email, mensagem });
        res.status(201).json({ message: 'Solicitaçāo de suporte criada com sucesso', solicitacao });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
  }

  list = async (req, res) => {
    try {
        const solicitacoes = await this.service.list();
        res.status(200).json({ 'solicitacoes': solicitacoes });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
  }

  updateStatus = async (req, res) => {
    const newStatus = req.body.status;
    const { id } = req.params;

    if (!['open', 'in progress', 'closed'].includes(newStatus)) {
        return res.status(400).json({ error: 'Valor de status inválido' });
    }

    try {
        const updated = await this.service.updateStatus(id, newStatus);
        res.status(200).json({ statu: updated });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
  }
}
