const router = require('express').Router();
let News = require('../models/News'); // Importar el modelo News

// Ruta para obtener todas las noticias
// GET /api/news/
router.route('/').get((req, res) => {
  News.find()
    .then(news => res.json(news)) // Devuelve las noticias encontradas como JSON
    .catch(err => res.status(400).json('Error: ' + err)); // Maneja errores
});

// Ruta para crear una nueva noticia
// POST /api/news/add
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const category = req.body.category;
  const featured = req.body.featured || false; // Valor por defecto si no se envía
  
  // createdAt y updatedAt se establecen automáticamente por el schema/middleware

  const newNews = new News({
    title,
    content,
    imageUrl,
    category,
    featured,
  });

  newNews.save()
    .then(() => res.json('Noticia agregada!')) // Mensaje de éxito
    .catch(err => res.status(400).json('Error: ' + err)); // Maneja errores
});

// Agrega aquí rutas para obtener una noticia por ID, actualizar y eliminar más adelante

module.exports = router; 