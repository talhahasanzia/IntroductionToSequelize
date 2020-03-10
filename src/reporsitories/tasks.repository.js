const tasks = require('../models/tasks.model');
const { states, stateHirarchy } = require('../constants/taskStates');

async function findAll() {
  const task = await tasks.findAll({});
  return task;
}

async function find(searchBy = {}) {
  // const byId = searchBy.id;
  // const byTitle = searchBy.title;
  // const byDetails = searchBy.details;
  // const byDueDate = searchBy.dueDate;
  // const byState = searchBy.state;

  // let task = tasks;
  // if (byId) task = task.filter(u => u.id == byId);
  // if (byTitle) task = task.filter(u => u.title == byTitle);
  // if (byDetails) task = task.filter(u => u.details == byDetails);
  // if (byDueDate) task = task.filter(u => u.dueDate == byDueDate);
  // if (byState) task = task.filter(u => u.state == byState);

  const task = await tasks.findAll({ where: searchBy });

  if (!task.length) {
    throw new Error('task not found');
  }
  return task;
}

function findOne(name) {
  const task = tasks.find(u => u.name === name);
  if (!task.length) {
    throw new Error('task not found');
  }
  return task;
}

async function insert(task) {
  // const id = Math.max(...tasks.map(u => u.id)) + 1;
  // const newtask = {
  //   id,
  //   ...task
  // };
  // tasks.push(newtask);
  // return tasks;

  return await tasks.build(task).save();
}

async function update(task) {
  const entity = await tasks.findOne({ where: { id: task.id } });
  if (!entity) throw new Error('ID_NOT_FOUND');

  _validateState(entity.state, task.state);

  entity.title = task.title;
  entity.details = task.details;
  entity.dueDate = task.dueDate;
  entity.state = task.state;

  entity.save();

  return task;
}

async function deleteById(id) {
  // const delIdx = tasks.findIndex(u => u.id == id);
  // if (delIdx === -1) throw new Error('ID_NOT_FOUND');
  // tasks.splice(delIdx, 1);
  // return tasks;

  const entity = await tasks.findOne({ where: { id } });
  if (!entity) throw new Error('ID_NOT_FOUND');

  return await entity.destroy();
}

function _validateState(previousState, newState) {
  if (!states[newState]) throw new Error('STATE_NOT_FOUND');
  if (!states[previousState]) throw new Error('STATE_NOT_FOUND');

  if (states[newState] === states[previousState]) return;

  if (stateHirarchy[previousState].findIndex(u => u == states[newState]) === -1)
    throw new Error('STATE_NOT_VALID');
}

module.exports = {
  deleteById,
  findAll,
  find,
  findOne,
  insert,
  update
};
