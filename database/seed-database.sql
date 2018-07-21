DROP DATABASE IF EXISTS bookmark;

CREATE DATABASE bookmark;

DROP TABLE IF EXISTS bookmarks;

CREATE TABLE bookmarks(
  id serial PRIMARY KEY,
  title VARCHAR NOT NULL,
  rating INT,
  url VARCHAR NOT NULL,
  description VARCHAR
);


INSERT INTO bookmarks (title, rating, url, description) VALUES
('Facebook Homepage', 2, 'https://www.facebook.com', 'Where you see pics of your friends kids'),
('HBO', 5, 'https://www.hbo.com', 'n/a')
;



------------ SCRATCH QUERIES -------------
-- SELECT * FROM bookmarks WHERE