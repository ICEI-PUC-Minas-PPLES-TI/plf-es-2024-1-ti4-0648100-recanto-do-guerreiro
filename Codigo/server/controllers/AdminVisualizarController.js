const { where } = require("sequelize");
const adminVisualizar = require(".../models/adminVisualizar");

class adminVisualizarController {
  async getDados(req, res) {
    try {
      
      const adminVisualizar = await adminVisualizar.findAll({
        where: {
          nome: nome,
          email: email,
          telefone: telefone,
          marcaCarroDesejado: marcaCarroDesejado,
          modeloCarroDesejado: modeloCarroDesejado,
          mensagemAdicional: mensagemAdicional
        }
      });

      return res.status(200).json(adminVisualizar);
    } catch (error) {
      console.error("Erro ao buscar os dados do relatorio:", error);
      return res.status(500).json({ error: "Erro ao buscar os dados do relatorio" });
    }
  }
}

module.exports = new adminVisualizarController();
