import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite", // Specify the database dialect as "sqlite"
  storage: "euro-kat.db", // Provide the path to your SQLite database file
});

class 