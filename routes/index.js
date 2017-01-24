let express = require('express');
let apiai = require('apiai');
let router = express.Router();
let apiAiService = apiai('4869a2ed9f3f4374b2eb5a2af2663d33', {language: 'en', requestSource: 'fb'});
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World Edu Bot');
});

router.get('/unknown/', (req, res, next) => {
  console.log('Communicating with apiai => ' + req.query.fbId);
  let apiairequest = apiAiService.textRequest(req.query.q, {sessionId: req.query.fbId});
  apiairequest.on('response', (apiaiRes) => {
    console.log('Got Response: ', JSON.stringify(apiaiRes));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      messages: [
        {text: req.query.q + ' => ' + apiaiRes.result.fulfillment.speech}
      ]
    }));
  });
  apiairequest.on('error', (err) => {
    console.error('Error communicating with apiai', err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      messages: [
        {text: 'Error Happened! sorry!!!'}
      ]
    }));
  });
  apiairequest.end();
});

module.exports = router;
