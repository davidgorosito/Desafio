var express = require("express");
var router = express.Router();
var fs = require("fs");



const database_operaciones =fs.readFileSync('./database.json','utf-8') // traigo la base de datos 
const operaciones = JSON.parse(database_operaciones);// la leemos


const UltimasOperaciones = operaciones.slice(-11);// ultimas 10 operaciones ,funciona pero va una operacion atrasada y no se porque 
 // balance de operaciones
const Ingresos = operaciones.forEach(operacion => { 
     let  Ingreso = operacion.Tipo=== "Ingreso";
      return Ingreso 
     });
const Egresos = operaciones.forEach(operacion => {
     let Egreso = operacion.Tipo ==="Egreso";
       return Egreso
    });    
const Balance = Ingresos-Egresos;
// no funca el balance 

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "administrador",});
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
       fs.writeFileSync("./database.json", json_operaciones, "utf-8");

    // hasta aca funciona , hora quiero mostrar las lista en el home 
  
       res.render("operaciones", { title:"administrador",operaciones,UltimasOperaciones,Balance});

});
/* GET operaciones page.*/
router.get("/operaciones", function (req, res, next) {
  res.render("operaciones", { title: "administrador",json_operaciones});
});

module.exports = router;
