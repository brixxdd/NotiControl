const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  // Aquí definimos la estructura de los documentos de noticias
  // Basándonos en la interfaz News que ya tienes en el frontend
  title: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio y final
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
  // Mongoose añade automáticamente un campo _id como identificador único
});

// Opcional: Middleware para actualizar updatedAt antes de guardar
newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Crear el modelo a partir del schema
const News = mongoose.model('News', newsSchema);

module.exports = News; 