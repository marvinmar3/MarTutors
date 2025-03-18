const express = require('express');
const router = express.Router();
const tutorRequestController = require('../controllers/tutorRequestController');

router.post('/', tutorRequestController.createTutorRequest);
router.get('/', tutorRequestController.getTutorRequests);
router.get('/:id', tutorRequestController.getTutorRequestById);
router.put('/:id', tutorRequestController.updateTutorRequest);
router.delete('/:id', tutorRequestController.deleteTutorRequest);

module.exports = router;