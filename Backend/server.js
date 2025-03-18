const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const groupRoutes = require('./routes/groupRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const tutorRequestRoutes = require('./routes/tutorRequestRoutes');

//inicializar la aplicación express
const app = express();

//conectr a la base de datos
connectDB();

//midelware
app.use(cors({ origin: 'http://localhost:3030'})); // permite solicitudes de origen cruzadp
app.use(express.json());

//rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/tutor-requests', tutorRequestRoutes);

//ruta de pruebas
app.get('/', (req, res)=> {
	res.send('API está funcionando');
});

const PORT = process.env.PORT || 3030;

//definir el puerto
app.listen(PORT, () => {
	console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
