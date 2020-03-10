const repo = require('../reporsitories/tasks.repository');
const { states } = require('../constants/taskStates');

const Sequelize = require('Sequelize');

async function findAll() {
  return repo.findAll();
}

async function find(searchBy = {}) {
  return repo.find(searchBy);
}

function findOne(name) {
  return repo.findOne(name);
}

async function insert(task) {
  task.state = states.new;
  return repo.insert(task);
}

async function update(task) {
  return repo.update(task);
}

async function deleteById(id) {
  return repo.deleteById(id);
}

module.exports = {
  deleteById,
  findAll,
  find,
  findOne,
  insert,
  update
};
