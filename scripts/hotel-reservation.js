const fs = require('fs');
const faker = require('faker');
const { Parser } = require('json2csv');

(() => {
  const features = ['Standard Double Room', 'Pirate Themed Room with Park Access', 'King Room', 'Studio with Balcony', 'Superior Apartment', 'Deluxe Twin Room', 'Economy Triple Room'];

  const hotel = () => {
    return {
      id: faker.random.alphaNumeric(5),
      name: faker.company.companyName()+ ' Hotels',
      address: faker.address.streetAddress(true),
      guests: faker.datatype.number({min: 1, max: 5}),
      nights: faker.datatype.number({min: 1, max: 10}),
      price: faker.finance.amount(20),
      description: faker.lorem.sentences(faker.datatype.number({min: 1, max: 10})),
      image: 'https://placeimg.com/640/480/arch?s='+faker.datatype.number({min: 1, max: 1000}),
      feature: faker.random.arrayElement(features),
      rating: faker.datatype.number({min: 1, max: 5}),
    };
  };

  const customer = () => {
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();
    return {
      id: `${fName.toLowerCase()}@mail.com`,
      name: fName + ' ' + lName,
      phone: faker.phone.phoneNumber()
    };
  };

  const booking = (customer, hotel, hotelPrice) => {
    const checkin = faker.date.future();
    const checkout= faker.date.soon(10, checkin);
    const nights = Math.ceil((checkout.getTime()-checkin.getTime())/ (1000 * 3600 * 24))
    return {
      hotel,
      nights,
      customer,
      price: nights*hotelPrice,
      id: faker.random.alphaNumeric(5),
      checkin: checkin.toISOString().split('T')[0],
      checkout: checkout.toISOString().split('T')[0],
      guests: faker.datatype.number({min: 1, max: 10}),
      notes: faker.lorem.sentences(faker.datatype.number({min: 1, max: 5})),
    };
  };

  const hotels = [];
  const customers = [];
  const bookings = [];

  for (let i = 0; i <= 30; i++) {
    hotels.push(hotel());
  }

  for (let i = 20; i > 0; i--) {
    customers.push(customer());
  }

  customers.forEach((u) => {
    for (let i = faker.datatype.number({min: 1, max: 30}); i >= 0; i--) {
      bookings.push(
        booking(u.id, hotels[i].id, hotels[i].price)
      );
    }
  });

  const p1 = new Parser();
  const p2 = new Parser();
  const p3 = new Parser();
  
  const path = '../output/hotel-reservation';

  // fs.mkdir(path, (e) => {if(e)throw(e)})

  fs.writeFile(path+'/hotels.csv', p1.parse(hotels), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile(path+'/customers.csv', p2.parse(customers), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.writeFile(path+'/bookings.csv', p3.parse(bookings), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
})();
