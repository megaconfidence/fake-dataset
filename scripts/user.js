const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');

const genderArr = ['male', 'female', 'non-binary'];
const assignedTo = ['confidence@appsmith.com', 'vihar@appsmith.com'];

(() => {
  const user = () => {
    const gender = faker.random.arrayElement(genderArr);
    return {
      id: faker.random.alphaNumeric(5),
      name: faker.name.firstName() +' '+ faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      job: faker.name.jobTitle(),
      phone: faker.phone.phoneNumber(),
      gender: gender,
      image: `https://randomuser.me/api/portraits/med/${gender === 'male'?'men':'women'}/${faker.datatype.number({min:0, max: 99})}.jpg`,
    };
  };
  const users = []
  for (let i = 10000; i > 0; i--) {
    users.push(user());
  }

  const p1 = new Parser();
  const path = '../output/users';

  fs.writeFile(path+'/users_large.csv', p1.parse(users), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
})();
