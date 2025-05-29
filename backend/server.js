const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Puedes usar el puerto que prefieras

// Middleware
app.use(cors()); // Permite solicitudes desde tu frontend (origen cruzado)
app.use(express.json()); // Permite al servidor aceptar JSON en el cuerpo de las solicitudes

// Conexión a MongoDB
const uri = 'mongodb://localhost:27017/notiControlDB'; // Reemplaza si tu URI es diferente

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar las rutas de noticias
const newsRouter = require('./routes/news');

// Usar las rutas de noticias para las solicitudes que empiecen con /api/news
app.use('/api/news', newsRouter);

// Ejemplo de ruta básica (puedes borrarla o modificarla después):
// app.get('/', (req, res) => {
//   res.send('Backend de NotiControl funcionando!');
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
}); 