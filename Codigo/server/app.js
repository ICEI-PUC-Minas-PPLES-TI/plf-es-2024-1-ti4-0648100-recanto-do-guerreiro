const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const routes = require("./routes");
const database = require("./database/indexdb");
const session = require("express-session");
const Reserva = require("./models/Reserva"); // Certifique-se de que o caminho está correto

const router = express.Router();

// // Rota para criar nova reserva
// router.post("/reserva", async (req, res) => {
//   const { data } = req.body;

//   // Verificar se já existe uma reserva para a data
//   const existingReserva = await Reserva.findOne({ where: { data } });
//   if (existingReserva) {
//     return res
//       .status(400)
//       .json({ error: "Já existe uma reserva para esta data!" });
//   }

//   // Se não existir reserva para a data, inserir a nova reserva
//   const reserva = await Reserva.create(req.body);
//   return res.json(reserva);
// });

// // Rota para atualizar reserva
// router.put("/reserva/:id", async (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   // Verificar se já existe uma reserva para a data
//   const existingReserva = await Reserva.findOne({
//     where: {
//       data,
//       id: {
//         [Sequelize.Op.ne]: id, // Exclui a reserva atual da busca
//       },
//     },
//   });

//   if (existingReserva) {
//     return res
//       .status(400)
//       .json({ error: "Já existe uma reserva para esta data!" });
//   }

//   // Se não existir reserva para a data, atualizar a reserva
//   const reserva = await Reserva.update(req.body, { where: { id } });
//   return res.json(reserva);
// });

//PARTE 2

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(express.static("tmp"));
    this.server.use(cors({}));
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(
      session({
        secret: "segredo",
        resave: false,
        saveUninitialized: true,
      })
    );
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
