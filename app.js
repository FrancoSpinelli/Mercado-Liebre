const express = require ('express');
const app = express();
const path = require ('path');
const methodOverride = require ('method-override');

// Configuración de EJS

app.set ('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'))


// Configuración de METODOS 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


// Configuración puerto en Heroku

app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en el puerto 3000')
});


// Configuración ruta absoluta a la carpeta PUBLIC

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));


// Rutas hacia los módulos 

let rutasMain = require ('./src/routes/main.js');
let rutasUsers = require ('./src/routes/users.js');
let rutasProducts = require ('./src/routes/products.js');

// Respuestas con los prefijos '/...'

app.use('/', rutasMain);
app.use('/users', rutasUsers);
app.use('/products', rutasProducts)



