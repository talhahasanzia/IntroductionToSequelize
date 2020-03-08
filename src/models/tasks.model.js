const { states } = require('../constants/taskStates');

const tasks = [
  {
    id: 1,
    title: 'task 1',
    details: 'task 1 details',
    dueDate: '2020/01/01',
    state: states.completed
  },
  {
    id: 2,
    title: 'task 2',
    details: 'task 2 details',
    dueDate: '2020/01/01',
    state: states.new
  },
  {
    id: 3,
    title: 'task 3',
    details: 'task 3 details',
    dueDate: '2020/01/01',
    state: states.new
  },
  {
    id: 4,
    title: 'task 4',
    details: 'task 4 details',
    dueDate: '2020/01/01',
    state: states.inProgress
  }
];

module.exports = tasks;
