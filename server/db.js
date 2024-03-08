const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://localhost/the_acme_reservation_planner"
);
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

module.exports = {
  client,
  createTables,
};
