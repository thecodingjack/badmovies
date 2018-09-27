DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
  id INTEGER NOT NULL unique,
  title VARCHAR(255) NOT NULL,
  release_date VARCHAR(20),
  vote_average DOUBLE,
  poster_path VARCHAR(255)
);

-- postgres
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

\c badmovies;

CREATE TABLE movies (
  id INTEGER NOT NULL unique,
  title VARCHAR(255) NOT NULL,
  release_date VARCHAR(20),
  vote_average NUMERIC(3,1),
  poster_path VARCHAR(255)
);