var express = require("express");
var router = express.Router();
var fs = require("fs");

let operaciones = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "administrador", operaciones });
});

/* GET operaciones page.*/
router.get("/operaciones", function (req, res, next) {
  res.render("operaciones", { title: "administrador" });
});
// guardar datos del formulario
router.post("/", (req, res, next) => {
  let nuevaOperacion = {
    // recibo los datos del formulario y los asigno para guardarlos en la base de datos
    Concepto: req.body.Concepto,
    Monto: req.body.Monto,
    Fecha: req.body.Fecha,
    Tipo: req.body.Tipo,
  };
  // agrego a la base de datos  el nuevo ingreso
  operaciones.push(nuevaOperacion);
  // lectura y escritura de la nueva base de datos en json
  const json_operaciones = JSON.stringify(operaciones);
  fs.writeFileSync("/database.json", json_operaciones, "utf-8");

  // trate de ver que manda el formulario pero no renderisa nada solo un objeto vacio
  res.send(req.body);
});

module.exports = router;
