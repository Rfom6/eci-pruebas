//Es lo que se encarga de las funciones de servidor
const express = require('express');
const hbs     = require('hbs');

var app = express();

//Se ejecutan por orden de lectura, si quieres filtrar esto, sin que se pueda acceder a ninguna otra ruta, la func tiene que estar la primera
app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

//registrar funcion de middleWare (Como filtros en Java)
app.use(express.static(__dirname + '/public'))

//Primer argumento el nombre de la variable , la 2 la funcion que queremos hacer
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

//motor de vistas, (clave, valor)
app.set('view engine', 'hbs');

//con __dirname coges el nombre del directorio raiz
hbs.registerPartials(__dirname + '/views/partials')


app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})


//argumentos de la funcion: ruta , funcion
app.get('/', (req, res) => {
  //***devuelve html***
  // res.send('Hello express!');
  // res.send('<h1>Hello express!</h1>')
  //***devuelve html***

  //***devuelve JSON***
  // res.send({
  //   name: "Claudio",
  //   likes: [
  //     "GoT",
  //     "Node",
  //     "Java"
  //   ]
  // });
  //***devuelve JSON***

//**Sin el hbs.registerHelper
  // res.render('home.hbs', {
  //   pageTitle: 'About page',
  //   message: 'Welcome to my site',
  //   currentYear: new Date().getFullYear(),
  // });
//**

//**Con el hbs.registerHelper
  res.render('home.hbs', {
    pageTitle: 'Home page',
    message: 'Welcome to my site',
  });
//**

});

//En vez de la raiz, es llamando a esa pagina localhost:3000/about
app.get('/about', (req, res) => {
    //res.send('About page');
    //2 argumentos, nombre de la Plantilla, y variables que queremos cambiar
    res.render('about.hbs', {
      pageTitle: 'About page',
      currentYear: new Date().getFullYear(),
    });
})

//Puerto por defecto 3000 de express
app.listen(3000);

//Probar en chrome localhost:3000 y habrir las developer tool para ver las cosas
