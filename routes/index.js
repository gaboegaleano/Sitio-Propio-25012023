var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var mail = req.body.mail;
  var mensaje = req.body.mensaje;

  //Abrir var obj
  var obj = {
    to: 'gabogaleano@gmail.com',
    dubject: 'Proyecto Propio',
    html: nombre + " " + apellido + " // " + mail + " //  Mensaje: " + mensaje + ".-"
  }
  //Cierre var Obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: `Mensaje enviado correctamente`,
  })

})

module.exports = router;
