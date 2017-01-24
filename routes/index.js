let express = require('express');
let apiai = require('apiai');
let router = express.Router();
let apiAiService = apiai('4869a2ed9f3f4374b2eb5a2af2663d33', {language: 'en', requestSource: 'fb'});
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World Edu Bot');
});

router.get('/unknown/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  apiAiService.textRequest(req.query.q, {
    sessionId: req.query.fbId
  }, (err, apiaiRes) => {
    let message;
    if (err) {
      console.error('Error communicating with apiai', err);
      message = {
        messages: [
          {text: 'Error Happened! sorry!!!'}
        ]
      }
    } else {
      message = {
        messages: [
          {text: req.query.q + ' => ' + apiaiRes.result.fulfillment.speech}
        ]
      }
    }
    res.send(JSON.stringify(message));
  });
});

module.exports = router;
