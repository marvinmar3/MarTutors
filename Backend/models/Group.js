const {DataTypes, Model}= require('sequelize');
const {sequelize}= require ('../config/db');

class Group extends Model{}

Group.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		maxStudents: {
			type: DataTypes.INTEGER,
			defaultValue: 10
		},
		description: {
			type: DataTypes.STRING
		},
		createdAt:{
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	},

	{
		sequelize,
		modelName: 'Group'
	}
);

// definir las relaciones
Group.associate= (models)=>{
	// 1 grupo pertenece a una materia
	Group.belongsTo(models.Subject, {
		foreignKey: 'subject_id',
		as: 'subject'
	});

	//1 grupo tiene un tutor
	Group.belongsTo(models.User, {
		foreignKey: 'tutor_id',
		as: 'tutor'
	});

	//1 grupo puede tener varios estudiantes (m:n)
	Group.belongsToMany(models.User, {
		through: 'groups_students',
		as: 'students',
		foreignKey: 'group_id'
	});

	// 1 grupo puede tener varios horarios
	Group.hasMany(models.Schedule, {
		foreignKey: 'group_id',
		as: 'schedule'
	});

};

module.exports= Group;