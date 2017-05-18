const cheerio = require('cheerio');

const getId = str => (/\/t\/(\d+)#reply/.exec(str) || [])[1];

function getListData(text) {
  const $ = cheerio.load(text);
  const list = $('div.cell.item');
  const result = [];
  list.each((index, item) => {
    const avatar = $(item).find('img.avatar').attr('src');
    const count = $(item).find('.count_livid').text();
    const replier = count ? $(item).find('.small').last().text() : '';
    const title = $(item).find('.item_title').text();
    const id = getId($(item).find('.item_title a').attr('href'));
    const obj = {};
    replier.split('•').forEach((reply, idx) => {
      const rep = (reply || '').trim();
      if (idx === 0) obj.node = rep;
      if (idx === 1) obj.author = rep;
      if (idx === 2) obj.last_time = rep;
      if (idx === 3) obj.last_reply = rep;
    });
    result.push(Object.assign({
      id,
      avatar,
      title,
      count,
    }, obj));
  });
  return result;
}

module.exports = getListData;
