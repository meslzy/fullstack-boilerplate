import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelAttributes, Sequelize } from "sequelize";

class Index extends Model<InferAttributes<Index>, InferCreationAttributes<Index>> {
	declare uid: CreationOptional<string>;

	declare username: string;
	declare email: string;

	declare passwordHash: string;
	declare passwordSalt: string;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare checkPassword: (password: string) => void;
}

const attributes: ModelAttributes<Index, InferAttributes<Index>> = {
	uid: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false
	},
	passwordSalt: {
		type: DataTypes.STRING,
		allowNull: false
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
};

const users = (sequelize: Sequelize, tableName: string) => {
	const user = Index.init(attributes, {
		sequelize,
		tableName
	});

	user.prototype.checkPassword = function (password: string) {
		console.log(password, this);
	};

	return user;
};

export default users;