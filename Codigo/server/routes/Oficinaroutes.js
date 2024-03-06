const express = require("express");
const router = express.Router();
const oficina = require("../controllers/oficinaController");
const verificacao = require('../requireAuth');

router.post("/oficina", verificacao, oficina.create);
router.get("/oficina", verificacao, oficina.index);
router.get("/oficineFilterId/:id", verificacao, oficina.filterId)
router.put("/oficinaPut/:id", verificacao, oficina.update);
router.delete("/oficina/:id", verificacao, oficina.delete);

module.exports = router;