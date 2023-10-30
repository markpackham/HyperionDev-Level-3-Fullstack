// Convert to single line for terminal
// https://lingojam.com/TexttoOneLine

// Insert all the cars using the same attributes that Sue has
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

// Show all cars
db.cars.find().pretty();

// Update Sue's address
db.cars.updateOne({ Owner: "Sue Bailey" }, { $set: { Address: "21 Maureen Street, Bluewater Bay, Port Elizabeth, South Africa" } });

// Update Sue's surname
db.cars.updateOne({ Owner: "Sue Bailey" }, { $set: { Owner: "Sue Smith" } });

// Find cars older than 5 years
db.cars.find( { Model: { $lt: 2018 } } ).pretty()

// Insert another Sue with the same surname to cause confusion
db.cars.insertOne({Model: 2015, Make: "Ford Fiesta", Owner: "Sue Smith",  Registration: "FAKE SUE GP", Address: "FAKE SUE SMITH Street, Manchester",})

// Target the unique Object id (kind of like an SQL Primary Key) and not the name so only the correct Sue is removed
db.cars.deleteOne( { "_id" : ObjectId("653f70e9740510cd44a47ff4") } );

// Add list of previous owners to a car
db.cars.updateOne(
  { "_id" : ObjectId("653f70e9740510cd44a47ff9") },
  { $set: { "Previous Owners": ["Jane Smith", "Paul Smith", "Billy Corgan", "Hulk Hogan", "Vince Russo"] } }
)

// Show the previous owners
db.cars.find({_id : ObjectId("653f70e9740510cd44a47ff9")});

