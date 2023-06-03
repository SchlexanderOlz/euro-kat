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
  Fake: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
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
  SeriesId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  IdLetters: {
    type: Sequelize.STRING(5),
    unique: true,
  },
  Year: {
    type: Sequelize.DATE,
  },
});

const SubSeries = sequelize.define("SubSeries", {
  SubSeriesId: {
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
  PackageInsertId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Description: {
    type: Sequelize.STRING(255),
  },
});

const Packaging = sequelize.define("Packaging", {
  PackagingId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Description: {
    type: Sequelize.STRING(255),
  },
});

const PackagingPicture = sequelize.define("PackagingPicture", {
  PackagingPictureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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

const CountryVariation = sequelize.define("CountryVariation", {
  CountryVariationId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Year: {
    type: Sequelize.DATE,
  },
  Note: {
    type: Sequelize.STRING(255),
  },
});

const Variation = sequelize.define("Variation", {
  VariationId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Variation: {
    type: Sequelize.STRING(2000),
    allowNull: false,
  },
});

const Picture = sequelize.define("Picture", {
  PictureId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Picture: {
    type: Sequelize.BLOB("medium"),
  },
});

const FigureInOtherCountries = sequelize.define(
  "FigureInOtherCountries",
  {
    FigureInOtherCountriesId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  }
);

Series.hasMany(SubSeries);
SubSeries.belongsTo(Series);

SubSeries.hasMany(Packaging);
Packaging.belongsTo(SubSeries);

SubSeries.belongsToMany(Country, { through: "SubSeriesCountries" });
Country.belongsToMany(SubSeries, { through: "SubSeriesCountries" });

Packaging.hasMany(PackagingPicture);
PackagingPicture.belongsTo(Packaging);

PackagingPicture.belongsTo(Picture);
Picture.hasMany(PackagingPicture);

SubSeries.hasMany(Figure);
Figure.belongsTo(SubSeries);

Figure.belongsToMany(Picture, { through: "FigurePictures" });
Picture.belongsToMany(Figure, { through: "FigurePictures" });

Figure.belongsTo(Variation);
CountryVariation.hasMany(FigureInOtherCountries);
FigureInOtherCountries.belongsTo(Figure);
FigureInOtherCountries.belongsTo(Picture);

CountryVariation.hasMany(PackageInsert);
PackageInsert.belongsTo(Picture);

CountryVariation.belongsTo(SubSeries);
CountryVariation.belongsTo(Country);

sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });
