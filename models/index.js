import Sequelize from "sequelize";

const sequelize = new Sequelize("pulkitasri", "pulkitasri", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  define: {
    underscored: true,
  },
});

const models = {
  User: require("./user").default(sequelize, Sequelize.DataTypes),
  Task: require("./task").default(sequelize, Sequelize.DataTypes),
};
//if there are some associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    console.log("here");
    models[modelName].associate(models);
  }
});

//Testing the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
