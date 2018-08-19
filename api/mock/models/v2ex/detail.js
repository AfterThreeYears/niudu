const cheerio = require('cheerio');

function getListData(text, pageIndex = 1) {
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
  /**
   * (26 回复  |  直到 2018-08-12 21:38:53 +08:00) --获取--> 26
   */
  const execResults = /^(\d*)\s回复/.exec($('.cell .gray').text()) || [];
  const isNoMoreData = (execResults[1] || 0) <= pageIndex * 100;
  const result = {
    content: {
      title,
      lastReply,
      markdown,
      once,
    },
    replier,
    isNoMoreData,
  };
  return result;
}

module.exports = getListData;
