const {
  client,
  createTables,
  createCustomer,
  createResturant,
  fetchCustomers,
  fetchResturants,
  createReservation,
  fetchReservations,
  destroyReservation,
} = require("./db");

// Express Application
const express = require("express");
const app = express();

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");

  // Promise.all to create 4 Customers and 4 Resturants
  const [Edwin, Liz, Kavin, Yasin, Rome_Cafe, NYC_Cafe, LA_Cafe, Paris_Cafe] =
    await Promise.all([
      createCustomer("Edwin"),
      createCustomer("Liz"),
      createCustomer("Kavin"),
      createCustomer("Yasin"),
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

  // Promise.all to create 4 Reservations
  await Promise.all([
    createReservation({
      customer_id: Edwin.id,
      resturant_id: LA_Cafe.id,
      party_count: 4,
      reservation_date: "04/01/2024",
    }),
    createReservation({
      customer_id: Kavin.id,
      resturant_id: Rome_Cafe.id,
      party_count: 3,
      reservation_date: "03/06/2024",
    }),
    createReservation({
      customer_id: Liz.id,
      resturant_id: Paris_Cafe.id,
      party_count: 7,
      reservation_date: "01/13/2024",
    }),
    createReservation({
      customer_id: Yasin.id,
      resturant_id: LA_Cafe.id,
      party_count: 5,
      reservation_date: "08/08/2024",
    }),
  ]);
  console.log(await fetchReservations());
  console.log(vacations);
  await destroyReservation(vacations[0].id);
  console.log(await fetchVacations());

  // Listening to port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
