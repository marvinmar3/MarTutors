const express= require ('express');
const router = express.Router();
const userController= require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//obtener materias que enseña o aprende el usuario
router.get('/:id/subjects-teaching', userController.getSubjectsTeaching);
router.get('/:id/subjects-learning', userController.getSubjectsLearning);

module.exports = router;