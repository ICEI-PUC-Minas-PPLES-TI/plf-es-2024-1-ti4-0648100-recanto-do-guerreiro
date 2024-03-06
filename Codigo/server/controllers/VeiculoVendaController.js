const { where } = require("sequelize");
const carro = require("../models/Carro");

class VeiculoVendaController {
  async getById(req, res) {
    try {
      const veiculo = await carro.findByPk(req.params.id);
      if (!veiculo) {
        return res.status(404).json("Veículo não encontrado");
      }
      return res.status(200).json(veiculo);
    } catch (erro) {
      return res.status(500).json("Erro ao obter veículo por ID: " + erro);
    }
  }

  async update(req, res) {
    try {
     
      const statusEnumValues = ["disponivel", "vendido", "reservado"];
      if (!statusEnumValues.includes(req.body.status)) {
        return res.status(400).json("Status inválido");
      }

      await carro.update(
        {
          marca: req.body.marca,
          modelo: req.body.modelo,
          ano: req.body.ano,
          preco: req.body.preco,
          placa: req.body.placa,
          chassi: req.body.chassi,
          cor: req.body.cor,
          motor: req.body.motor,
          status: req.body.status,
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json("Sucesso ao atualizar o status do veiculo");
    } catch (erro) {
      return res.status(500).json("Erro ao atualizar" + erro);
    }
  }
}

module.exports = new VeiculoVendaController();
