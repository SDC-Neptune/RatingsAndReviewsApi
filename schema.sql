CREATE DATABASE sdc_reviews;


CREATE TABLE reviews (
  id INT PRIMARY KEY,
  product_id INT,
  rating INT NOT NULL,
  date date,
  summary VARCHAR(250) NOT NULL,
  body VARCHAR(500) NOT NULL,
  recommend boolean NOT NULL,
  reported boolean NOT NULL,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR(250)
  helpfulness INT,
);

CREATE TABLE reviews_photos (
  id INT PRIMARY KEY,
  review_id INT,
  url VARCHAR(250) NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(50)
);

CREATE TABLE characteristic_reviews (
  id INT,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE reviewMeta (
  product_id INT,
  ratingAverage INT,
  recommendedAverage INT
)