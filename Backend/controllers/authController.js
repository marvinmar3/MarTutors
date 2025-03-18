//const jwt = require('jsonbreaktoken');
const bcrypt = require('bcryptjs');
const { User, Subject }= require('../models');
const config = require('../config/config');

// @desc Registrar un usuario
// @route POST/api/auth/register
// @access public

exports.register= async (req, res)=>{
	try{
		const {name, email, password, userType, faculty, career}= req.body;

		//verifcar su un usuario ya existr
		let user= await User.findOne({where: {email}});
		if(user){
			return res.status(400).json({msg: 'El usuario ya existe'});

		}

		//hashear contraseña antes de crear el usuario
		const salt= await bcrypt.genSalt(10);
		const hashedPassword= await bcrypt.hash(password, salt);

		//crear un nuevo us
		user= await User.create({
			name,
			email,
			password: hashedPassword,
			userType,
			faculty,
			career
		});

		// crear un token
		const payload={
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			config.jwtSecret,
			{ expiresIn: config.jwtExpire },
			(err, token)=>{
				if(err) throw err;
				res.json({token});
			}
		);
	}catch(err){
		console.error(err.message);
		res.status(500).send('Error del servidor');
	}
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public

exports.login = async (req, res)=>{
	try{
		const {email, password} = req.body;

		// buscar usuario por email
		let user = await User.findOne({where: {email}});
		if (!user) {
			return res.status(400).json({msg: 'Credenciales inválidas'});
		}

		//verificar contraseña
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({msg: 'Credenciales inválidas'});
		}

		//crear token
		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			config.jwtSecret,
			{expiresIn: config.jwtExpire},
			(err, token)=>{
				if (err) throw err;
				res.json({token});
			}
		);
	}catch(err)
	{
		console.error(err.message);
		res.status(500).send('Error del servidor');
	}
};

// @desc    Obtener información del usuario autenticado
// @route   GET /api/auth/me
// @access  Private

exports.getMe= async (req, res)=> {
	try{
		const user = await User.findByPk(req.user.id,{
			attributes: {exclude: ['password']},
			include: [
				{
					model: Subject,
					as: 'subjectTeaching'
				},
				{
					model: Subject,
					as: 'subjectLearning'
				}
			]
		});

		if(!user)
		{
			return res.status(404).json({msg: 'Usuario no encontrado'});
		}

		res.json(user);
	}catch(err)
	{
		console.error(err.message);
		res.status(500).send('Error del servidor');
	}
};