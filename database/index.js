const { pool } = require('../config.js')

const getProduct = () => {
  let pgsq = 'SELECT product_id FROM reviews LIMIT 20'
  return pool.query(pgsq);
}

const getReviews = (body) => {
  console.log('body', body)
  let product_id = body.product_id;
  let page = body.page || 1;
  let count = body.count || 5;
  let pgsq = `SELECT r.*, (SELECT json_agg(p.*) FROM reviews_photos p WHERE(p.review_id = r.id)) AS photos FROM reviews r where product_id = ${product_id} LIMIT ${count}
  OFFSET ${count * (page - 1)}`
  let pgReturn = pool.query(pgsq)
  return pgReturn
}

// reviews - id, product_id, recommend

const getReviewsMeta = (query) => {
  let pgsq = `
    SELECT
      reviews.recommend,
      reviews.rating,
      characteristic_reviews.value,
      characteristics.name, characteristics.id AS characteristic_id
    FROM
      reviews
        LEFT JOIN characteristic_reviews ON reviews.id = characteristic_reviews.review_id
        LEFT JOIN characteristics ON characteristic_reviews.characteristic_id = characteristics.id
    WHERE
      reviews.product_id = ${query.product_id}
    AND
      reviews.reported = false
  `
  return pool.query(pgsq);
}

const getCharacteristics = () => {
  let pgsq = `SELECT
  id,
  product_id,
  name
  FROM characteristics LIMIT 5`
  return pool.query(pgsq);
}

const reviewHelpful = (id) => {
  let pgsq = `UPDATE reviews SET reported = true WHERE id = ${id}`
  return pool.query(pgsq)
}

const reportReview = (id) => {
  let pgsq = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id}`
  return pool.query(pgsq)
}

const addReview = ( body ) => {
  let args = [body.product_id, body.rating, body.summary, body.body, body.recommend, body.reviewer_name, body.reviewer_email, Date.now()]
  console.log('args:', args)
  let pgsq = `INSERT INTO reviews (
    product_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    reviewer_email,
    date
   ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
   RETURNING id`
    return pool.query(pgsq, args)
}

const addReviewPhotos = ( id, photos ) => {
  let args = [id, photos]
  let pgsq = `INSERT INTO reviews_photos (
      review_id,
     url
   ) VALUES ($1, $2)`
  return pool.query(pgsq, args)
}

const addCharacteristics = (charId, review_id, value) => {
  let args = [charId, review_id, value]
  let pgsq = `INSERT INTO characteristic_reviews (
    characteristic_id,
    review_id,
    value
   ) VALUES ($1, $2, $3)`
  return pool.query(pgsq, args)
}

module.exports = {
  getProduct,
  getReviews,
  getCharacteristics,
  getReviewsMeta,
  reportReview,
  reviewHelpful,
  addReviewPhotos,
  addReview,
  addCharacteristics
}

