const {DataTypes, Model} = require('sequelize');
const {sequelize} = require ('../config/db');

class Schedule extends Model {}

Schedule.init(
	{
		day: {
			type: DataTypes.ENUM('lunes','martes','miércoles','jueves','viernes','sábado', 'domingo'),
			allowNull: false
		},
		startTime:{
			type: DataTypes.STRING,
			allowNull: false
		},
		endTime: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	},
	{
		sequelize,
		modelName: 'Schedule'
	}

);

//definir relacion con grupos
Schedule.associate= (models)=>{
	Schedule.belongsTo(models.Group,{
		foreignKey: 'group_id',
		as: 'group'
	});
};

module.exports= Schedule;