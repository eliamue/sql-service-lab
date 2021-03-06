DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS breweries;

CREATE TABLE accounts (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL
);

CREATE TABLE quotes (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      quote TEXT
);

CREATE TABLE breweries (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      bid INT,
      "name" TEXT,
      city TEXT,
      "state" TEXT,
      website TEXT
);