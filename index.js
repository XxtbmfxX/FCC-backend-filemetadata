var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');
const fs = require('fs');

var app = express();


// Configuramos Express para analizar los datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configurar Multer para manejar la carga de archivos
const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

// Ruta para la carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Obtener la información del archivo cargado
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Retornar la información del archivo en formato JSON
  res.json(fileInfo);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});