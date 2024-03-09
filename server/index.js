const e = require("express");
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
app.use(express.json());

// GET Customers
app.get("/api/customers", async (req, res, next) => {
  try {
    res.send(await fetchCustomers());
  } catch (ex) {
    // error handling
    res.status(500).json({ error: "Failed to load customers" });
    next(ex);
  }
});

// GET Resturants
app.get("/api/resturants", async (req, res, next) => {
  try {
    res.send(await fetchResturants());
  } catch (ex) {
    // error handling
    res.status(500).json({ error: "Failed to load resturants" });
    next(ex);
  }
});

// GET Reservations
app.get("/api/reservations", async (req, res, next) => {
  try {
    res.send(await fetchReservations());
  } catch (ex) {
    // error handling
    res.status(500).json({ error: "Failed to load reservations" });
    next(ex);
  }
});

// POST Customer's Reservations
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    res.status(201).send(await createReservation(req.body));
  } catch (ex) {
    // error handling
    res.status(500).json({ error: "Failed to add reservations" });
    next(ex);
  }
});
// DELETE Customers Reservations
app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      await destroyReservation(req.params.id);
      res.sendStatus(204);
    } catch (ex) {
      // error handling
      res
        .status(500)
        .json({ error: "Failed to delete customer's reservation" });
      next(ex);
    }
  }
);

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
  console.log(await fetchCustomers());
  console.log(await fetchResturants());

  // Promise.all to create 3 Reservations
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
  ]);
  const reservations = await fetchReservations();
  await destroyReservation(reservations[0].id);
  console.log(await fetchReservations());

  // Listening to port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
