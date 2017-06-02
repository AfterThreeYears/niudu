const cheerio = require('cheerio');

const getId = str => (/\/t\/(\d+)#reply/.exec(str) || [])[1];

function getListData(text) {
  const $ = cheerio.load(text);
  const list = $('div.cell.item');
  const result = [];
  list.each((index, item) => {
    const avatar = $(item).find('img.avatar').attr('src');
    const count = $(item).find('.count_livid').text() || 0;
    const title = $(item).find('.item_title').text();
    const id = getId($(item).find('.item_title a').attr('href'));
    const node = $(item).find('.node').text();
    const author = $(item).find('.node').next().find('a')
                  .text();
    const timeArr = (($(item).find('strong')[0].next || {}).data || '').split('•');
    const last_time = (timeArr[1] || '无回复').trim();
    const last_reply = $(item).find('strong').next('strong').find('a')
                        .text() || '无人回复';
    result.push(Object.assign({
      id,
      avatar,
      title,
      count,
      node,
      author,
      last_time,
      last_reply,
    }));
  });
  return result;
}

module.exports = getListData;
