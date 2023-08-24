/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "56nsajeu4mc3ots",
    "created": "2023-08-22 08:39:29.591Z",
    "updated": "2023-08-22 08:39:29.591Z",
    "name": "CountryVariation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nbiitgt9",
        "name": "year",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("56nsajeu4mc3ots");

  return dao.deleteCollection(collection);
})
