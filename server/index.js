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

  // Promise.all to create 3 Customers and 4 Resturants
  const [Edwin, Liz, Kavin, Rome_Cafe, NYC_Cafe, LA_Cafe, Paris_Cafe] =
    await Promise.all([
      createUser("Edwin"),
      createUser("Liz"),
      createUser("Kavin"),
      createPlace("Rome_Cafe"),
      createPlace("NYC_Cafe"),
      createPlace("LA_Cafe"),
      createPlace("Paris_Cafe"),
    ]);
  console.log(`Edwin has an id of ${Edwin.id}`);
  console.log(`Kavin has an id of ${Kavin.id}`);
};

init();
