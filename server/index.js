const {
  client,
  createTables,
  createCustomer,
  createResturant,
} = require("./db");

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");
};

init();
