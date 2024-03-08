const {
  client,
  createTables,
  createCustomer,
  createResturant,
  fetchCustomers,
  fetchResturants,
} = require("./db");

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");

  // Promise.all to create 3 Customers and 4 Resturants
  const [Edwin, Liz, Kavin, Rome_Cafe, NYC_Cafe, LA_Cafe, Paris_Cafe] =
    await Promise.all([
      createCustomer("Edwin"),
      createCustomer("Liz"),
      createCustomer("Kavin"),
      createResturant("Rome_Cafe"),
      createResturant("NYC_Cafe"),
      createResturant("LA_Cafe"),
      createResturant("Paris_Cafe"),
    ]);
  console.log(`Edwin has an id of ${Edwin.id}`);
  console.log(`Kavin has an id of ${Liz.id}`);
  console.log(`Kavin has an id of ${Kavin.id}`);
  console.log(await fetchCustomers());
  console.log(await fetchResturants());
};

init();
