const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(res.locals.dividers);
  res.render('index');
});
router.use('/public', express.static('public'));

module.exports = router;
