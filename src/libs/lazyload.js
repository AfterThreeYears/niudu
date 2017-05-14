import Vue from 'vue';
import debounce from 'lodash.debounce';
import { isNumber, isArray } from '@/helpers/lang';
import logger from '@/helpers/logger';

const originalAttr = 'data-original-src';
const viewportDistance = 888;
const debounceInterval = 100;

let lazyNodes = [];
let isGlobalEventListened = false;
const loadedImageUrls = {}; // [url]: true
const loadingImageUrls = {}; // [url]: [lazyNode, lazyNode, ....]

const inViewport = (el) => {
  const { bottom, top, right, left } = el.getBoundingClientRect();

  if (bottom === 0 && top === 0 && right === 0 && left === 0) {
    return false;
  }

  return bottom + viewportDistance > 0 &&
    top - viewportDistance < document.documentElement.clientHeight &&
    right + viewportDistance > 0 &&
    left - viewportDistance < document.documentElement.clientWidth;
};

const preloadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener('load', resolve, false);
  image.addEventListener('error', reject, false);
  image.addEventListener('abort', reject, false);
  image.src = src;
});

const setLazyNodesImageUrl = (nodes, url) => {
  if (!nodes || nodes.length === 0) return;

  const finalNodes = Array.isArray(nodes) ? nodes : [nodes];
  finalNodes.forEach((node) => {
    node.classList.add('LazyLoad-Loaded');

    if (node.hasAttribute('lazy-bg')) {
      node.style.backgroundImage = `url(${url})`;
    } else {
      node.src = url;
    }
  });
};

const traverseImages = () => {
  console.log('****************');
  logger.debug('Begin Traverse Image', lazyNodes.length);
  for (let i = 0; i < lazyNodes.length; i += 1) {
    const lazyNode = lazyNodes[i];
    if (!inViewport(lazyNode)) continue; // eslint-disable-line no-continue

    const url = lazyNode.getAttribute(originalAttr);

    // loaded, skip
    if (loadedImageUrls[url]) {
      logger.debug('Hit Cache: ', url);
      setLazyNodesImageUrl(lazyNode, url);
      continue; // eslint-disable-line no-continue
    }

    // loading, add handler
    if (loadingImageUrls[url]) {
      logger.debug('Hit Repeat: ', loadingImageUrls[url].length);
      loadingImageUrls[url].push(lazyNode);
      continue; // eslint-disable-line no-continue
    }

    // flag current url loading, save lazyNode
    loadingImageUrls[url] = [lazyNode];

    preloadImage(url).then(() => {
      setLazyNodesImageUrl(loadingImageUrls[url], url);
      logger.debug('Load original Success: ', url);

      // flag current url loaded
      loadedImageUrls[url] = true;
      // delete current url loading
      delete loadingImageUrls[url];
    }).catch(() => {
      // delete current url loading
      delete loadingImageUrls[url];
      logger.debug('Load original Error: ', url);
      // retry once
      // TODO: retry
    });
  }
};

const debounceTraverseImages = debounce(traverseImages, debounceInterval);

export const addImg = (elements = []) => {
  if (!isArray(elements)) {
    elements = [elements];
  }

  const list = [].slice.call(elements);
  lazyNodes = lazyNodes.concat(list);
};

export const isImageLoaded = url => loadedImageUrls[url];

const doLazyload = () => {
  lazyNodes = [].slice.call(document.querySelectorAll(`[${originalAttr}]`));

  debounceTraverseImages();

  if (!isGlobalEventListened) {
    window.addEventListener('scroll', debounceTraverseImages, false);
    document.addEventListener('touchmove', debounceTraverseImages, false);
    isGlobalEventListened = true;
  }
};

const lazyload = (delay) => {
  if (delay != null && !isNumber(delay)) {
    throw new Error('`delay` must be number');
  }

  if (isNumber(delay) && delay > 0) {
    setTimeout(doLazyload, delay);
  } else {
    Vue.nextTick(doLazyload);
  }
};

export default lazyload;
