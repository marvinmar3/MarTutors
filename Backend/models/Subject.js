const {DataTypes, Model} = require('sequelize');
const {sequelize}= require('../config/db');

class Subject extends Model{}

Subject.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		code: {
		type: DataTypes.STRING,
		unique: true
		},
		faculty: {
			type: DataTypes.STRING,
			allowNull: false
		},
		career:{
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn('NOW')
		}
	},
	{
		sequelize,
		modelName:'Subject'
	}
);

// definir las relaciones

Subject.associate= (models)=> {
	Subject.belongsToMany(models.User, {
		through: 'users_subjects_learning',
		as: 'learningUsers',
		foreignKey: 'subject_id'
	});
};

module.exports = Subject;