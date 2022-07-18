const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Task, {
      foreignKey: "userId",
      as: "tasks",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return User;
};

export default userModel;
