const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const password = process.env.EURO_KAT_PASSWORD;

if (!password) {
  throw new Error("Please set the EURO_KAT_PASSWORD environment variable");
}

const sequelize = new Sequelize("euro-kat-db", "root", password, {
  host: "localhost",
  port: 3306,
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

const Picture = sequelize.define("Picture", {
  PictureId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Picture: {
    type: Sequelize.BLOB("medium"),
  },
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
  Description: {
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

const FigureInOtherCountries = sequelize.define("FigureInOtherCountries", {
  FigureInOtherCountriesId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});


const FigurePicture = sequelize.define("FigurePicture")

Series.hasMany(SubSeries)

Figure.belongsToMany(Picture, { through: FigurePicture });
Picture.belongsToMany(Figure, { through: FigurePicture });
Figure.hasMany(Variation, {foreignKey: 'FigureId', onDelete: 'CASCADE'})
Figure.hasOne(Country, {allowNull: true}) // NOTE: Maybe remove this
Figure.hasMany(PackageInsert)


Variation.hasOne(Picture, { onDelete: 'CASCADE'})

SubSeries.hasMany(Figure, {onDelete: 'CASCADE'})
SubSeries.hasOne(Country)
Packaging.belongsTo(SubSeries);
SubSeries.hasMany(CountryVariation, {onDelete: 'CASCADE'})
SubSeries.hasMany(Packaging, {onDelete: 'CASCADE'})

Packaging.hasMany(PackagingPicture, {onDelete: 'CASCADE'});
PackagingPicture.belongsTo(Picture, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

CountryVariation.hasOne(Country, {onDelete: 'CASCADE'})
CountryVariation.hasMany(FigureInOtherCountries, {onDelete: 'CASCADE'})

FigureInOtherCountries.hasOne(Figure, {onDelete: 'CASCADE'});
FigureInOtherCountries.hasOne(Picture, {onDelete: 'SET NULL'})

PackageInsert.belongsTo(Picture, {onDelete: 'SET NULL'});


sequelize
  .sync({ force: true, individualHooks: true}) // NOTE: Change this because this overrides all tables !!!!!
  .then(() => {
    console.log("Tables created successfully.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });
