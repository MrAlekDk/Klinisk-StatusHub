const express = require('express');
const db = require('../db/database');

const router = express.Router();

//Routes for API endpoints here


//test route to check if API is working
if (process.env.NODE_ENV == 'development') {
    router.get('/api-test', (req, res) => {
        res.json({ message: 'API is working' });
    });


    router.get('/db-test', (req, res) => {
        try {
            const stmt = db.prepare('SELECT 1');
            const result = stmt.get();
            res.json({ ok: true, result });
        } catch (err) {
            res.status(500).json({ ok: false, error: err.message });
        }
    });
}

module.exports = router;