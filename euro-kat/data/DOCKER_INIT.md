# Setup the MySQL server

Set the ``MYSQL_ROOT_PASSWORD`` inside of the Dockerfile to the same password used in the schema generation.
### <--this should be changed to only set the variable once

Run these command to set the container up
```bash
docker build -t mysql-euro-kat .
docker run -d -p 3306:3306 --name mysql-euro-kat mysql-euro-kat
```

It is possible that schema.js doesnt run correctly after this setup. Just wait a bit and then run schema.js again