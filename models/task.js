const taskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskDescription: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    priority: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User);
  };

  return Task;
};

export default taskModel;
