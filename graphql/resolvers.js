import models from "../models";

const resolvers = {
  Query: {
    test: (_parent, _args, _context) => "Hi There This is a test",
    getTask: async (_parent, { id }, { models }) => {
      const thatTask = await models.Task.findOne({ where: { id } });
      return thatTask;
    },
    allTasks: async (_parent, {}, { models }) => {
      const taskList = await models.Task.findAll({
        order: [
          ["dueDate", "ASC"],
          ["id", "ASC"],
        ],
      });

      // const allUsersMap = {};
      // const userList = await models.User.findAll({
      //   order: [["id", "ASC"]],
      // });

      // userList.forEach((user) => {
      //   allUsersMap[user.id] = user;
      // });

      // taskList.forEach((task) => {
      //   task["user"] = allUsersMap[task.userId];
      // });
      // console.log(taskList);

      return taskList;
    },
    allUsers: async (_parent, {}, { models }) => {
      const userList = await models.User.findAll({
        order: [["id", "ASC"]],
      });

      return userList;
    },
  },

  Mutation: {
    createTask: async (_parent, _args, { models }) => {
      const newTask = await models.Task.create(_args);
      return newTask;
    },
    deleteTask: async (_parent, { id }, { models }) => {
      const deletedTask = await models.Task.findOne({ where: { id } });
      await models.Task.destroy({
        where: { id },
      });
      return deletedTask;
    },
    updateTask: async (_parent, _args, _context) => {
      await models.Task.update(_args, {
        where: {
          id: _args.id,
        },
      });
      const updatedTask = await models.Task.findOne({
        where: { id: _args.id },
      });
      return updatedTask;
    },

    createUser: async (_parent, _args, { models }) => {
      const newUser = await models.User.create(_args);
      return newUser;
    },
  },
};

export default resolvers;
