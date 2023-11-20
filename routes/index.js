var express = require('express');
var router = express.Router();
const users = require('../public/js/database');

router.get("/", (req, res) => {
  res.send("Hello World");
})

router.get('/form.html', function(req, res, next) {
  res.render('form');
});


router.get('/protected', (req, res) => {
  if (req.session.userid) {
    res.send(`Welcome User <a href='/logout'>click to logout</a>`);
  } else {
    res.render('form');
  }
});

router.post('/user', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.userid = user.username;
    console.log("bat");

    res.json({ success: true, redirectUrl: '/protected' });
  } else {
    console.log("bi");
    res.status(401).json({ success: false, errorMessage: 'Invalid username or password' });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
