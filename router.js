const express = require('express');
const router = express.Router();


router.use('/public', express.static('public'));
router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router;
