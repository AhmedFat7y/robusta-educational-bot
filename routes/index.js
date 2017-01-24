let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World Edu Bot');
});

router.get('/unknown/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    messages: [
      {text: 'Unknown! sorry! => ' + JSON.stringify(req.query)}
    ]
  }));
});

module.exports = router;
