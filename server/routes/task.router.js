const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// GET endpoint
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks"`;
    pool.query(queryText)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('GET /tasks failed', err);
            res.send(500);
        });
});

// POST endpoint

router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    let queryText = `
        INSERT INTO "tasks"
            ("task")
        VALUES
            ($1)
    `;
    let queryParams = [
        req.body.task
    ];
    console.log('queryText is', queryText);
    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST failed', err);
            res.sendStatus(500);
        })
});

// PUT endpoint
router.put('/status/:id', (req, res) => {
    console.log('status is', req.body.status);
    console.log('id is', req.params.id);
    let queryText = `
    UPDATE "tasks" 
    SET "status" = 'True' 
    WHERE "id" = $1`;
    let queryParams = [
        req.params.id
    ];
    
    pool.query(queryText, queryParams)
      .then(() => {
          res.sendStatus(204);
      })
      .catch((err) => {
          console.log('PUT failed', err);
          res.sendStatus(500);
      });

})
// DELETE endpoint
router.delete('/:id', (req, res) => {
    console.log('id is', req.params.id);

    let queryText = `
        DELETE from "tasks"
        WHERE id = $1;
    `;
    let queryParams = [
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then((result) => {
            console.log('Delete task#', queryParams);
            res.sendStatus(204);
        }).catch((err) => {
            console.log('DELETE failed', err);
            res.sendStatus(500);
        })
});

module.exports = router;