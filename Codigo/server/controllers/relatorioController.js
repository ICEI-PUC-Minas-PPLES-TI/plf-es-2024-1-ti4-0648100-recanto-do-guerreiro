const { where } = require("sequelize");
const Carro = require("../models/Carro");
const Manutencao = require("../models/manutencao");

class RelatorioController {
  async getById(req, res) {
    try {
      const { id } = req.params;
      const manutencao = await Manutencao.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Carro,
            as: "carro",
            attributes: [
              "imagem",
              "marca",
              "modelo",
              "ano",
              "preco",
              "placa",
              "chassi",
              "cor",
              "motor",
              "status",
            ],
          },
        ],
      });

      if (!manutencao) {
        return res.status(404).json("Manutenção não encontrada");
      }

      return res.status(200).json(manutencao);
    } catch (erro) {
      return res.status(500).json("Erro ao buscar a manutenção: " + erro);
    }
  }
}

module.exports = new RelatorioController();
