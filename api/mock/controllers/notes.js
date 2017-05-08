const { roll } = require('../utils');
const notes = require('../models/notes');

const getNotes = (ctx) => {
  ctx.body = roll(notes, 20);
};

module.exports = {
  getNotes,
};
