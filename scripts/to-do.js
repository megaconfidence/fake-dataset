const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');

const status = ['todo', 'in-progress', 'done'];
const assignedTo = ['confidence@appsmith.com', 'vihar@appsmith.com'];

(() => {
  const todo = () => {
    return {
      id: faker.random.alphaNumeric(5),
      status: faker.random.arrayElement(status),
      title: faker.random.words(),
      description: faker.lorem.sentences(
        faker.datatype.number({ min: 1, max: 10 })
      ),
      createdAt: faker.date.recent().toISOString().split('T')[0],
      dueAt: faker.date.future().toISOString().split('T')[0],
      assignedTo: faker.random.arrayElement(assignedTo),
    };
  };
  const todos = []
  for (let i = 20; i > 0; i--) {
    todos.push(todo());
  }

  const p1 = new Parser();
  const path = '../output/todos';

  fs.writeFile(path+'/todos.csv', p1.parse(todos), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
})();
