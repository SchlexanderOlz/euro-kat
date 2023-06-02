const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const password = process.env.EURO_KAT_PASSWORD;

if (!password) {
  throw new Error("Please set the EURO_KAT_PASSWORD environment variable");
}

const sequelize = new Sequelize("euro-kat-db", "root", password, {
  host: "localhost",
  port: 5000,
  dialect: "mysql",
  dialectModule: mysql2,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const Figure = sequelize.define("Figure", {
  FigureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  MPG_Nr: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  FigureName: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  Sticker: {
    type: Sequelize.TINYINT(1),
  },
  Identifier: {
    type: Sequelize.STRING(255),
  },
  Comment: {
    type: Sequelize.TEXT("medium"),
  },
});

const Series = sequelize.define("Series", {
  SerialId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  SerialName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  ReleaseYear: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  Thanks: {
    type: Sequelize.STRING(255),
  },
});

const PackageInsert = sequelize.define("PackageInsert", {
  PackageId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  FigureId: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING(255),
  },
});

const Packaging = sequelize.define("Packaging", {
  PackageId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING(255),
  },
});

const Country = sequelize.define("Country", {
  CountryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  CountryName: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
});

const Casing = sequelize.define("Casging", {
  CasingId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ExtraInfo: {
    type: Sequelize.TEXT("medium"),
  },
});

const Picture = sequelize.define("Picture", {
  PictureId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Picture: {
    type: Sequelize.BLOB("medium"),
  },
});


const FigurePicture = sequelize.define("FigurePicture", {
  FigureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  PictureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
});

Figure.belongsToMany(Picture, { through: FigurePicture });
Picture.belongsToMany(Figure, { through: FigurePicture });

PackageInsert.belongsTo(Figure);
Figure.belongsTo(Series);
Packaging.belongsTo(Series, { allowNull: true });
Country.belongsTo(Series, { allowNull: true });
Casing.belongsTo(Series);

Picture.belongsTo(PackageInsert);
Picture.belongsTo(Packaging);
Picture.belongsTo(Casing);

sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });
