const Schedule = require('../models/Schedule');

// Crear horario
const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear horario', error });
  }
};

// Obtener todos los horarios
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horarios', error });
  }
};

// Obtener horario por ID
const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener horario', error });
  }
};

// Actualizar horario
const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar horario', error });
  }
};

// Eliminar horario
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }
    res.status(200).json({ message: 'Horario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar horario', error });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
};