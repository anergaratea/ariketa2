var express = require('express');
var router = express.Router();
const users = require('../public/js/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Views' });
});
router.get('/form.html', function(req, res, next) {
  res.render('form', { errorMessage: '' });
});


router.get('/protected', (req, res) => {
  if (req.session.userid) {
    res.send(`Welcome User <a href='/logout'>click to logout</a>`);
  } else {
    // Render the form.html page with an error message
    res.render('form', { errorMessage: '' });
  }
});

router.post('/user', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.userid = user.username;
    console.log(req.session);
    res.redirect('/protected');
  } else {
    // Render the form.html page with an error message
    res.render('form', { errorMessage: 'Invalid username or password' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
