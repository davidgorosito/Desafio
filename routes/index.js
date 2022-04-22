var express = require("express");
var router = express.Router();
var fs = require("fs");
var path =require("path");




const database_operaciones =fs.readFileSync('./database.json','utf-8') // traigo la base de datos 
const operaciones = JSON.parse(database_operaciones);// la leemos


const UltimasOperaciones = operaciones.slice(-11);// ultimas 10 operaciones ,funciona bien parece

 // balance de operaciones
const Ingresos = operaciones.forEach(operacion => { 
     let  Ingreso = parseInt(operacion.Tipo.Ingreso);
     //console.log(Ingreso);
     }); // Trato de obtener los ingresos y pasarlos a numeros enteros pero no funca
const Egresos = operaciones.forEach(operacion => {
     let Egreso = parseInt(operacion.Tipo.Egreso);
     //console.log(Egreso); 
    }); // trato de obtener los egeresos  y pasarlos a numeros enteros  pero no funca   
const Balance = Ingresos-Egresos;
// no funca el balance 

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "administrador",UltimasOperaciones,operaciones,Balance});
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
  res.render("operaciones", { title: "administrador"});
});

module.exports = router;
