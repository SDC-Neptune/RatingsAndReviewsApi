const express = require("express");
// import config from '../config.js'
const app = express();
const PORT = 3010;
const db = require('../database/index.js')

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// *** GET REQUESTS *** //

app.get('/reviews', (req, res) => {
  console.log('request----', req.query)
  db.getReviews(req.query)
  .then(data=> {
    data.rows.forEach(row => {
      if (!row.photos) row.photos = [];
    // console.log("data", data)
      reviewFields = {
        "product_id": req.query.product_id || 1,
        "page": req.query.page|| 1,
        "count": req.query.count || 5,
        "results": data.rows
      }
    })
    res.send(reviewFields);
  })
  .catch(err => {
    console.log('error', err)
  });
});


app.get('/reviews/meta', (req, res) => {
  db.getReviewsMeta(req.query)
  .then(data=> {
    let totalRating = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }

    let recommended = {
      true: 0,
      false: 0
    }

    let char = {}
    let charSize = {}

    data.rows.forEach((rating) => {
      let currentRating = rating.rating.toString()
      totalRating[currentRating] ++
    })

    data.rows.forEach((rec) => {
      recommended[rec.recommend] ++
    })

    data.rows.forEach((charac) => {
      if (char[charac.name]) {
        let currentValue = char[charac.name].value += charac.value
        charSize[charac.name] += 1
        char[charac.name] = {
          "id": charac.characteristic_id,
          "value": currentValue
        }
      }
      if (!char[charac.name]) {
        char[charac.name] = {
          "id": charac.characteristic_id,
          "value": charac.value
        }
        charSize[charac.name] = 1
      }
    })

    for (let key in char) {
      char[key].value = char[key].value / charSize[key]
      // console.log('key', key, char[key])
    }

    reviewMetaFields = {
      "product_id": req.query.product_id,
      "ratings": totalRating,
      "recommended": recommended,
      "characteristics": char
    }
    res.send(reviewMetaFields);
  })
  .catch(err => {
    console.log(err)
  });
});

// *** POST REVIEWS *** //

app.post('/reviews', (req, res) => {
  console.log(req.body)
  db.addReview(req.body)
  .then(data=> {
    console.log('data---rows----', data.rows[0].id)
    return data;
  })
  .then(data=> {
    let review_id = data.rows[0].id
    req.body.photos.map((photo) => {
      // console.log('data----', data)
      db.addReviewPhotos(review_id, photo)
    })
    for (let key in req.body.characteristics) {
    db.addCharacteristics(key, review_id, req.body.characteristics[key])
    }
    res.send()
  })
  .catch(err => {
    console.log(err);
  });
})

// *** PUT Requests *** //

app.put('/reviews/:review_id/helpful', (req, res) => {
  db.reviewHelpful(req.params.review_id)
    .then(data => {
      res.send('passed')
    })
    .catch(err => {
      console.log(err)
    });
  });


app.put('/reviews/:review_id/report', (req, res) => {
  db.reportReview(req.params.review_id)
    .then(data => {
      res.send('passed')
    })
    .catch(err => {
      console.log(err)
    });
  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


