const express = require('express');
const router= express.Router();
const {register, login, getMe}= require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Registrar usuario
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Autenticar usuario
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Obtener información del usuario autenticado
// @access  Private
router.get('/me', auth, getMe);

module.exports= router;