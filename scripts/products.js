const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');

(() => {
  const product = () => {
    return {
      id: faker.random.alphaNumeric(5),
      image: 'https://api.lorem.space/image/shoes?w=300&h=300&s='+faker.datatype.number(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number({min: 50200, max: 102000}),
      expires_at: faker.date.future().toISOString().split('T')[0],
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription().replaceAll(',', '')
    };
  };
  const products = []
  for (let i = 100; i > 0; i--) {
    products.push(product());
  }

  const p1 = new Parser();
  const path = '../output/products';

  fs.writeFile(path+'/products.csv', p1.parse(products), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
})();
