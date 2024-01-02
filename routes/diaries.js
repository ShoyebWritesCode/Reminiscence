const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth.middleware');
const diariesController = require('../controller/diariesController');

router.get('/add', ensureAuth, diariesController.addDiary);
router.post('/', ensureAuth, diariesController.createDiary);
router.get('/', ensureAuth, diariesController.getPublicDiaries);
router.get('/edit/:id', ensureAuth, diariesController.editDiary);
router.post('/edit/:id', ensureAuth, diariesController.updateDiary);
router.get('/:id', ensureAuth, diariesController.showDiary);
router.delete('/:id', ensureAuth, diariesController.deleteDiary);
router.get('/search/:query', ensureAuth, diariesController.searchDiaries);

module.exports = router;
