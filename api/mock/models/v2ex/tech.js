const cheerio = require('cheerio');

function getTechData(text) {
  const $ = cheerio.load(text);
  const list = $('div.cell.item');
  const result = [];
  list.each((index, item) => {
    const avatar = $(item).find('img.avatar').attr('src');
    const count = $(item).find('.count_livid').text();
    const replier = count ? $(item).find('.small').last().text() : '';
    const title = $(item).find('.item_title').text();
    const obj = {};
    replier.split('•').forEach((reply, idx) => {
      const rep = (reply || '').trim();
      if (idx === 0) obj.node = rep;
      if (idx === 1) obj.author = rep;
      if (idx === 2) obj.last_time = rep;
      if (idx === 3) obj.last_reply = rep;
    });
    result.push(Object.assign({
      avatar,
      title,
      count,
    }, obj));
  });
  return result;
}

module.exports = getTechData;
