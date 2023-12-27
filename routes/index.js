const router = require('express').Router();

// Import Notes file with route for it
const noteRouter = require('./notes.js');
// path for http://localhost:3001/api/notes
router.use('/notes', noteRouter);
// exporting router
module.exports = router;