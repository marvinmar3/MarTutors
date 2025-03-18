const Group = require('../models/Group');

// Crear grupo
const createGroup = async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear grupo', error });
  }
};

// Obtener todos los grupos
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener grupos', error });
  }
};

// Obtener grupo por ID
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener grupo', error });
  }
};

// Actualizar grupo
const updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar grupo', error });
  }
};

// Eliminar grupo
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    res.status(200).json({ message: 'Grupo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar grupo', error });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};