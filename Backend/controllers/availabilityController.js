const Availability = require('../models/Availability');

// Crear disponibilidad
const createAvailability = async (req, res) => {
  try {
    const availability = new Availability(req.body);
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear disponibilidad', error });
  }
};

// Obtener todas las disponibilidades
const getAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await Availability.find();
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener disponibilidades', error });
  }
};

// Obtener disponibilidad por ID
const getAvailabilityById = async (req, res) => {
  try {
    const availability = await Availability.findById(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: 'Disponibilidad no encontrada' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener disponibilidad', error });
  }
};

// Actualizar disponibilidad
const updateAvailability = async (req, res) => {
  try {
    const availability = await Availability.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!availability) {
      return res.status(404).json({ message: 'Disponibilidad no encontrada' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar disponibilidad', error });
  }
};

// Eliminar disponibilidad
const deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findByIdAndDelete(req.params.id);
    if (!availability) {
      return res.status(404).json({ message: 'Disponibilidad no encontrada' });
    }
    res.status(200).json({ message: 'Disponibilidad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar disponibilidad', error });
  }
};

module.exports = {
  createAvailability,
  getAllAvailabilities,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability
};