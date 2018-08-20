var express = require('express');
var router = express.Router();

const skillsCtrl = require('../controllers/skills');

router.get('/', async (req, res) => {
    try {
        const skills = await skillsCtrl.getSkills();

        res.render('index', {
            title: 'Express' ,
            skills: skills,
            products: []
        });
    }
    catch (err) {
        console.error("err", err);
        res.render('index', {
            title: 'Express' ,
            skills: [],
            products: []
        });
    }
});

module.exports = router;
