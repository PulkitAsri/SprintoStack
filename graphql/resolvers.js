import models from "../models";

const resolvers = {
  Query: {
    getTask: async (_parent, { id }, { models }) => {
      const thatTask = await models.Task.findOne({ where: { id } });
      return thatTask;
    },
    allTasks: async (_parent, { id }, { models }) => {
      const taskList = await models.Task.findAll();
      return taskList;
    },
    test: (_parent, _args, _context) => "Hi There This is a test",
  },

  Mutation: {
    createTask: async (_parent, _args, { models }) => {
      const newUser = await models.Task.create(_args);
      return newUser;
    },
    deleteTask: async (_parent, { id }, {models}) => {
      const deletedTask = await models.Task.findOne({ where: { id } });
      await models.Task.destroy({
        where: { id },
      });
      return deletedTask;
    },
    updateTask: async (_parent, _args, _context) => {
      
      await models.Task.update(_args, {
        where: {
          id: _args.id
        }
      });
      const updatedTask = await models.Task.findOne({ where: { id: _args.id } });
      console.log(updatedTask);
      return updatedTask;
    },
  },
};

export default resolvers;