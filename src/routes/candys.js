const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', async(req, res) => {
    let listCandies = await pool.query('SELECT * FROM candies');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCandies: listCandies
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let candy = await pool.query('Select * from candies where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        candy: candy
    });
});




router.post('/create', async(req, res) => {
    const { name, price, expiration, isSalad } = req.body;

    const today = new Date();

    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;

    const date_registered = y + '-' + m + '-' + d;
    const date_created = y + '-' + m + '-' + d;
    const status = 1;
    const candy = {

        name,
        price,
        expiration,
        isSalad,
        date_registered,
        date_created,
        status
    };

    await pool.query('INSERT INTO candies set ?', [candy]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        candy: candy
    });
});


router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    const { name, price, expiration, isSalad } = req.body;

    const candy = { name, price, expiration, isSalad };

    await pool.query('UPDATE candies set ? where id = ?', [candy, id]);

    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        candy: candy
    });
});


router.post('/delete/:id', async(req, res) => {
    const { id } = req.params;

    await pool.query('UPDATE candies set status = 0 where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });

})


module.exports = router;