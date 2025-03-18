// controllers/subjectController.js
const { Subject } = require('../models'); // Asegúrate de que tienes el modelo de Subject

// Crear una nueva materia
exports.createSubject = async (req, res) => {
    try {
        const { name, code, faculty, career, description } = req.body;

        const newSubject = await Subject.create({ 
            name, 
            code, 
            faculty, 
            career, 
            description 
        });

        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la materia', error: error.message });
    }
};

// Obtener todas las materias
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll(); // Asumiendo que tienes un modelo Subject
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las materias', error: error.message });
    }
};

// Obtener una materia por ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ msg: 'Materia no encontrada' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la materia', error: error.message });
    }
};

// Actualizar una materia por ID
exports.updateSubject = async (req, res) => {
    try {
        const { name, code, faculty, career, description } = req.body;
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ msg: 'Materia no encontrada' });
        }

        subject.name = name || subject.name;
        subject.code = code || subject.code;
        subject.faculty = faculty || subject.faculty;
        subject.career = career || subject.career;
        subject.description = description || subject.description;

        await subject.save();

        res.json(subject);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la materia', error: error.message });
    }
};

// Eliminar una materia por ID
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ msg: 'Materia no encontrada' });
        }

        await subject.destroy();
        res.json({ msg: 'Materia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar la materia', error: error.message });
    }
};
