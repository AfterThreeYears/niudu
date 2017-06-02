const cheerio = require('cheerio');

function getListData(text) {
  const $ = cheerio.load(text, { decodeEntities: false });
  const title = $('h1').html();
  const lastReply = $('.header .gray').html();
  const markdown = $('.topic_content').html();
  const table = $('.box').eq(1).find('table');
  const once = $('[name=once]').val();
  const replier = [].slice.call(table).map((item) => {
    const $table = $(item);
    return {
      avatar: $table.find('.avatar').attr('src'),
      dark: $table.find('.dark').html(),
      small: $table.find('.small').html(),
      replyContent: $table.find('.reply_content').html(),
    };
  });
  const result = {
    content: {
      title,
      lastReply,
      markdown,
      once,
    },
    replier,
  };
  return result;
}

module.exports = getListData;
