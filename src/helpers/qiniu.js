/**
 * @file 七牛云资源路径处理
 */
import axios from 'axios';

/**
 * 获取视频详细信息
 * @param {String} url
 */
export const getAVInfo = url => axios.get(`${url}?avinfo`, {
  withCredentials: false,
  skipResponseInterceptor: true,
});

/**
  模式 说明
    /0/w/<LongEdge>/h/<ShortEdge>
        限定缩略图的长边最多为<LongEdge>，短边最多为<ShortEdge>，进行等比缩放，不裁剪。
        如果只指定 w 参数则表示限定长边（短边自适应），只指定 h 参数则表示限定短边（长边自适应）。
    /1/w/<Width>/h/<Height>
        限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪。
        转后的缩略图通常恰好是 <Width>x<Height> 的大小（有一个边缩放的时候会因为超出矩形框而被裁剪掉多余部分）。
        如果只指定 w 参数或只指定 h 参数，代表限定为长宽相等的正方图。
    /2/w/<Width>/h/<Height>
        限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪。
        如果只指定 w 参数则表示限定宽（长自适应），只指定 h 参数则表示限定长（宽自适应）。
        它和模式0类似，区别只是限定宽和高，不是限定长边和短边。
        从应用场景来说，模式0适合移动设备上做缩略图，模式2适合PC上做缩略图。
    /3/w/<Width>/h/<Height>
        限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，不裁剪。
        如果只指定 w 参数或只指定 h 参数，代表长宽限定为同样的值。
        你可以理解为模式1是模式3的结果再做居中裁剪得到的。
    /4/w/<LongEdge>/h/<ShortEdge>
        限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，不裁剪。
        如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。
        这个模式很适合在手持设备做图片的全屏查看（把这里的长边短边分别设为手机屏幕的分辨率即可）.
        生成的图片尺寸刚好充满整个屏幕（某一个边可能会超出屏幕）。
    /5/w/<LongEdge>/h/<ShortEdge>
        限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，居中裁剪。
        如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。同上模式4，但超出限定的矩形部分会被裁剪。
    注意：

    可以仅指定w参数或h参数。
    新图的宽/高/长边/短边，不会比原图大，即本接口总是缩小图片。
    所有模式都可以只指定w参数或只指定h参数，并获得合理结果。
    在w、h为限定最大值时，未指定某参数等价于将该参数设置为无穷大（自适应）；
    在w、h为限定最小值时，未指定参数等于给定的参数，也就限定的矩形是正方形。
    处理后的图片单边最长不得超过9999，宽和高的乘积最大不得超过2500万。
    处理前的图片w和h参数不能超过3万像素，总像素不能超过1亿5000万像素。
    参数名称 必填 说明
    /format/<Format> 新图的输出格式
    取值范围：jpg，gif，png，webp等，默认为原图格式。
    参考支持转换的图片格式。
    /interlace/<Interlace> 是否支持渐进显示
    取值范围：1 支持渐进显示，0不支持渐进显示(默认为0)。
    适用目标格式：jpg
    效果：网速慢时，图片显示由模糊到清晰。
    /q/<Quality> 新图的图片质量
    取值范围是[1, 100]，默认75。
    七牛会根据原图质量算出一个修正值，取修正值和指定值中的小值。
    注意：
    ● 如果图片的质量值本身大于90，会根据指定值进行处理，此时修正值会失效。
    ● 指定值后面可以增加 !，表示强制使用指定值，如100!。
    ● 支持图片类型：jpg。
    /ignore-error/<ignoreError> 可选
    取值：1
    ● 未设置此参数时，正常返回处理结果。
    ● 设置了此参数时，若图像处理的结果失败，则返回原图。
    ● 设置了此参数时，若图像处理的结果成功，则正常返回处理结果。
    <Quality>修正值算法：min[90, 原图quality*sqrt(原图长宽乘积/结果图片长宽乘积)]
 */

const letPxGo = (s) => {
  s = `${s}`;
  return Math.round(s.replace(/px$/ig, '') - 0);
};

const getPpi = () => {
  if (typeof window === 'undefined') {
    return 2;
  }
  return Math.ceil(Math.min(window.devicePixelRatio, 2.5));
};

/**
 * @deprecated 这个不合适
 */
export class QiniuPath {
  constructor(url = '') {
    this.url = url;
  }

  // 变成https
  toHttps() {
    this.url = this.url.replace(/^http:\/\//i, 'https://');
    return this.url;
  }

  getAVInfoUrl() {
    return `${this.toHttps()}?avinfo`;
  }

  getFrameUrl(index, w, h) {
    w = letPxGo(w);
    h = letPxGo(h);
    const ppi = getPpi();
    w *= ppi;
    h *= ppi;
    const ws = `${w ? `/w/${w}` : ''}`;
    const hs = `${h ? `/h/${h}` : ''}`;
    return `${this.url}?vframe/png/offset/${index}${ws}${hs}`;
  }

  // 剪裁
  cut(w, h, type, quality = 70) {
    w = w ? letPxGo(w) : 0;
    h = h ? letPxGo(h) : 0;
    const ppi = getPpi();
    w *= ppi;
    h *= ppi;
    const ws = w ? `/w/${w}` : '';
    const hs = h ? `/h/${h}` : '';
    const ty = type || 1;
    const imgView = (/\?/).test(this.url) ? '/imageView2' : '?imageView2';

    this.toHttps();

    return `${this.url}${imgView}/${ty}${ws}${hs}/q/${quality}`;

    // let format = '/format/webp';

    // // 排除gif，仅判断URL后缀
    // if (/\.gif$/.test(this.url)) {
    //   format = '';
    // }
    // return `${this.url}${imgView}/${ty}${format}${ws}${hs}/q/${quality}`;
  }

  origin() {
    return this.url;
  }
}
