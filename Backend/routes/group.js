const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);
router.get('/', groupController.getGroups);
router.get('/:id', groupController.getGroupById);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

// Obtener estudiantes de un grupo
router.get('/:id/students', groupController.getGroupStudents);

// Asignar estudiante a un grupo
router.post('/:id/students/:studentId', groupController.assignStudentToGroup);

module.exports = router;
