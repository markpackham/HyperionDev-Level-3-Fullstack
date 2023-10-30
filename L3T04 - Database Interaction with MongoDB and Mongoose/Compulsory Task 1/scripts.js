// Convert to single line for terminal
// https://lingojam.com/TexttoOneLine

db.cars.insertMany([
  {
    Model: 2005,
    Make: "Ford Fiesta",
    Owner: "Sue Bailey",
    Registration: "ABC 123 GP",
    Address: "13 Main Road, Johannesburg, South Africa",
  },
  {
    Model: 2001,
    Make: "Very Slow Car",
    Owner: "Jim Smith",
    Registration: "123",
    Address: "123 Street, London, England",
  },
  {
    Model: 2002,
    Make: "Slow Car",
    Owner: "Jane Smith",
    Registration: "345",
    Address: "345 Street, London, England",
  },
  {
    Model: 2003,
    Make: "Fast Car",
    Owner: "Paul Smith",
    Registration: "678",
    Address: "678 Street, London, England",
  },
  {
    Model: 2004,
    Make: "Sports Car",
    Owner: "Dave Sporty Carman",
    Registration: "910",
    Address: "910 Street, London, England",
  },
  {
    Model: 2005,
    Make: "Family Car",
    Owner: "Greg McFamily",
    Registration: "999",
    Address: "999 Street, London, England",
  },
]);

db.cars.find().pretty();

db.cars.updateOne({ Owner: "Sue Bailey" }, { $set: { Address: "21 Maureen Street, Bluewater Bay, Port Elizabeth, South Africa" } });

db.cars.updateOne({ Owner: "Sue Bailey" }, { $set: { Owner: "Sue Smith" } });

db.cars.find( { Model: { $lt: 2018 } } ).pretty()

db.cars.insertOne({Model: 2015, Make: "Ford Fiesta", Owner: "Sue Smith",  Registration: "FAKE SUE GP", Address: "FAKE SUE SMITH Street, Manchester",})

db.cars.deleteOne({})

// target the Object id (kind of like SQL Primary Keys) and not the name so only the correct Sue is removed
db.cars.deleteOne( { "_id" : ObjectId("653f70e9740510cd44a47ff4") } );