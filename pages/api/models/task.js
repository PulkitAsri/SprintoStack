 
 
const taskModel = (sequelize, DataTypes) => {
  
  const Task = sequelize.define('task', {
    taskDescription: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    priority: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Task;
};

export default taskModel;