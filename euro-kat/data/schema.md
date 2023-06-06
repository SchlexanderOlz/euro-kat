### Table: Figure

| Column      | Type            | Constraints                           |
| ----------- | --------------- | ------------------------------------- |
| FigureId    | INTEGER         | Primary Key, Not Null, Auto Increment |
| MPG_Nr      | INTEGER         | Unique, Not Null                      |
| FigureName  | STRING(255)     | Nullable                              |
| Fake        | TINYINT(1)      | Not Null                              |
| Sticker     | TINYINT(1)      |                                       |
| Identifier  | STRING(255)     |                                       |
| Comment     | TEXT("medium")  |                                       |
| SubSeriesId  | INTEGER         | Foreign Key (SubSeries.SubSeriesId)    |
| PackageInsertId  | INTEGER         | Foreign Key (PackageInsert.PackageInsertId) |


--> Add Variations which reference Figure with n:m

### Table: Series

| Column      | Type            | Constraints                           |
| ----------- | --------------- | ------------------------------------- |
| SeriesId    | INTEGER         | Primary Key, Not Null, Auto Increment |
| IdLetters   | STRING(5)       | Unique                                |
| Year        | DATE            |                                       |

### Table: SubSeries

| Column         | Type            | Constraints                           |
| -------------- | --------------- | ------------------------------------- |
| SubSeriesId    | INTEGER         | Primary Key, Not Null, Auto Increment |
| SerialName     | STRING(255)     | Not Null                              |
| ReleaseYear    | DATE            | Not Null                              |
| Thanks         | STRING(255)     |                                       |
| SeriesId       | INTEGER         | Foreign Key (Series.SeriesId)         |

--> Add a reference to a country here

### Table: PackageInsert

| Column            | Type            | Constraints                           |
| ----------------- | --------------- | ------------------------------------- |
| PackageInsertId   | INTEGER         | Primary Key, Not Null, Auto Increment |
| Description       | STRING(255)     |                                       |
| FigureId          | INTEGER         | Foreign Key (Figure.FigureId)         |

--> should have a pictureId referenced
--> Remove the current Primary Key and make the table have a composite key of Figure- and PictureId

### Table: Packaging

| Column         | Type            | Constraints                           |
| -------------- | --------------- | ------------------------------------- |
| PackagingId    | INTEGER         | Primary Key, Not Null, Auto Increment |
| Description    | STRING(255)     |                                       |
| SubSeriesId    | INTEGER         | Foreign Key (SubSeries.SubSeriesId)    |

### Table: PackagingPicture

| Column              | Type            | Constraints                           |
| ------------------- | --------------- | ------------------------------------- |
| PackagingPictureId  | INTEGER         | Primary Key, Not Null, Auto Increment |
| PackagingId         | INTEGER         | Foreign Key (Packaging.PackagingId)    |

### Table: Country

| Column        | Type            | Constraints                           |
| ------------- | --------------- | ------------------------------------- |
| CountryId     | INTEGER         | Primary Key, Not Null, Auto Increment |
| CountryName   | STRING(255)     | Not Null, Unique                      |

### Table: CountryVariation

| Column             | Type            | Constraints                           |
| ------------------ | --------------- | ------------------------------------- |
| CountryVariationId | INTEGER         | Primary Key, Not Null, Auto Increment |
| Year               | DATE            |                                       |
| Note               | STRING(255)     |                                       |
| SubSeriesId        | INTEGER         | Foreign Key (SubSeries.SubSeriesId)    |

--> Make this have a foreign key to a country

### Table: Variation

| Column         | Type            | Constraints                           |
| -------------- | --------------- | ------------------------------------- |
| VariationId    | INTEGER         | Primary Key, Not Null, Auto Increment |
| Variation      | STRING(2000)    | Not Null                              |

--> Add a foreign key to a picture here
--> Add a foreign key to a figure here (so many Variations can be associated with a figure)

### Table: Picture

| Column        | Type            | Constraints                           |
| ------------- | --------------- | ------------------------------------- |
| PictureId     | INTEGER         | Primary Key, Not Null, Auto Increment |
| Picture       | BLOB("medium")  |                                       |

### Table: FigureInOtherCountries

| Column                  | Type            | Constraints                           |
| ----------------------- | --------------- | ------------------------------------- |
| FigureInOtherCountriesId| INTEGER         | Primary Key, Not Null, Auto Increment |
| FigureId                | INTEGER         | Foreign Key (Figure.FigureId)         |

--> Add a foreign key to CountryVariations
--> Add a foreign key to Pictures
--> Remove current PK and make new PK from Country VariationId and FigureId
