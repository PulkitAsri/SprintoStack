import Sequelize, { DataTypes } from "sequelize";


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const sequelize = new Sequelize("pulkitasri", "pulkitasri", "postgres", {
  host: "localhost",
  dialect: "postgres",
  define: {
    underscored: true,
  },
});

//if there are some associations
// Object.keys(models).forEach((modelName) => {
//   if ("associate" in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

testConnection();

const models = {
  Task: require('./task').default(sequelize, Sequelize.DataTypes),
};
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
