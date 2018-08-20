var express = require('express');
var router = express.Router();

const loginCtrl = require('../controllers/login');

router.get('/', async (req, res) => {
    res.render('login', {
        title: 'Express'
    });
});

router.post('/', async (req, res) => {
    try {
        const result = await loginCtrl.login(req.body);
        console.log("result-1", result);

        if (result && result.success) {
            res.redirect('admin');
            return;
        }
        else if (result && !result.success) {
            res.render('login', {
                msgslogin: result.message
            });
            return;
        }
        else {
            throw "err";
        }
        throw "err";
    }
    catch (err) {
        console.error("err", err);
        res.render('login');
    }
});

module.exports = router;
