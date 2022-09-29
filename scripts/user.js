const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');

const status = ['user', 'in-progress', 'done'];
const assignedTo = ['confidence@appsmith.com', 'vihar@appsmith.com'];

(() => {
  const user = () => {
    return {
      id: faker.random.alphaNumeric(5),
      name: faker.name.firstName() +' '+ faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      job: faker.name.jobTitle(),
      phone: faker.phone.phoneNumber(),
    };
  };
  const users = []
  for (let i = 20; i > 0; i--) {
    users.push(user());
  }

  const p1 = new Parser();
  const path = '../output/users';

  fs.writeFile(path+'/users.csv', p1.parse(users), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
})();
