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
router.
// DELETE endpoint

module.exports = router;