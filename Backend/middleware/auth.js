const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(req, res, next){
	//ibtener el token del encabezado
	const token = req.header('x-auth-token');

	//verif si no hay token
	if(!token){
		return res.status(401).json({msg: 'No hay token, autorización denegada'});
	}

	//verificar si hay token
	try{
		const decoded= jwt.verify(token,config.jwtSecret);
		req.user= decoded.user;
		next();
	}catch(err){
		res.status(401).json({msg: 'Token no válido'} );
	}
};