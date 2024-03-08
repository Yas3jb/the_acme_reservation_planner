const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://localhost/the_acme_reservation_planner"
);
const uuid = require("uuid");
// Create Tables
const createTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS reservations;
  DROP TABLE IF EXISTS customer;
  DROP TABLE IF EXISTS resturant;
  
  CREATE TABLE customer(
    id UUID PRIMARY KEY,
    name VARCHAR(25)
  );
  CREATE TABLE resturant(
    id UUID PRIMARY KEY,
    name VARCHAR(50)
  );
  CREATE TABLE reservations(
    id UUID PRIMARY KEY,
    reservation_date DATE NOT NULL,
    party_count INTEGER NOT NULL,
    resturant_id UUID REFERENCES resturant(id) NOT NULL,
    customer_id UUID REFERENCES customer(id) NOT NULL,
  );
    `;
  await client.query(SQL);
};

// Create Customer
const createCustomer = async (name) => {
  const SQL = `
      INSERT INTO customer(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

// Create Resturant
const createResturant = async (name) => {
  const SQL = `
      INSERT INTO resturant(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

// Create Reservation
const createReservation = async ({
  resturant_id,
  customer_id,
  party_count,
  reservation_date,
}) => {
  const SQL = `
      INSERT INTO reservations(id, resturant_id, customer_id, party_count reservation_date) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    resturant_id,
    customer_id,
    party_count,
    reservation_date,
  ]);
  return response.rows[0];
};

// Fetches Customers
const fetchCustomers = async () => {
  const SQL = `
  SELECT *
  FROM customer
    `;
  const response = await client.query(SQL);
  return response.rows;
};

// Fetch Resturants
const fetchResturants = async () => {
  const SQL = `
  SELECT *
  FROM resturant
    `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  client,
  createTables,
  createCustomer,
  createResturant,
  fetchCustomers,
  fetchResturants,
  createReservation,
};
