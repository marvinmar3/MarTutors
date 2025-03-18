const { TutorRequest } = require('../models');

// Crear solicitud de tutoría
const createTutorRequest = async (req, res) => {
  try {
    const { studentId, tutorId, subjectId, scheduleId, status } = req.body;
    const newRequest = await TutorRequest.create({
      studentId,
      tutorId,
      subjectId,
      scheduleId,
      status
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la solicitud', error });
  }
};

// Obtener todas las solicitudes
const getTutorRequests = async (req, res) => {
  try {
    const requests = await TutorRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes', error });
  }
};

// Obtener solicitud por ID
const getTutorRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await TutorRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la solicitud', error });
  }
};

// Actualizar solicitud por ID
const updateTutorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const request = await TutorRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    request.status = status;
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la solicitud', error });
  }
};

// Eliminar solicitud por ID
const deleteTutorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await TutorRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    await request.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la solicitud', error });
  }
};

module.exports = {
  createTutorRequest,
  getTutorRequests,
  getTutorRequestById,
  updateTutorRequest,
  deleteTutorRequest
};