import axios from 'axios';

const fileTypeMap = {
  'image/gif': '.gif',
  'image/jpeg': '.jpeg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'text/html': '.html',
  'video/quicktime': '.mov',
  'video/mp4': '.mp4',
};

export const getToken = file =>
  new Promise((resolve, reject) => {
    const key = fileTypeMap[file.type.toLowerCase()] || '';
    axios.get('/cms/system/token/with/suffix', {
      params: {
        suffix: key,
      },
      headers: {
        contentType: 'application/json;charset=utf-8',
      },
    }).then(({ data }) => {
      if (data instanceof Array) {
        resolve(data[0]);
      } else {
        reject();
      }
    })
    .catch(reject);
  });

// 上传文件 upload
export default file =>
  new Promise((resolve, reject) => {
    getToken(file).then((options) => {
      const {
        uploadAddress, token, downloadAddress,
      } = options;
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('token', token);
      axios.post(uploadAddress, formdata, {
        method: 'post',
        url: uploadAddress,
        skipResponseInterceptor: true,
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false,
      })
      .then(json => resolve(`${downloadAddress}/${json.data.key}`))
      .catch((err) => {
        reject(err.message);
      });
    });
  });

export const uploadInChunks = (file, { events }) => {
  // 每片大小
  const shardSize = 4 * 1024 * 1024;
  // 总片数
  const shardCount = Math.ceil(file.size / shardSize);
  const onProgress = events.onProgress ? events.onProgress : () => {};
  let uploadAddress;
  let token;
  let downloadAddress;
  let i = 0;
  const ctxs = [];
  const mkfile = (data, resolve, reject) => {
    axios.post(`${uploadAddress}/mkfile/${file.size}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `UpToken ${token}`,
        withCredentials: false,
      },
      skipResponseInterceptor: true,
    }).then((d) => {
      if (d.status === 200 && d.data) {
        onProgress(100);
        resolve(`${downloadAddress}/${d.data.key}`);
      }
    }).catch(reject);
  };
  const mkblk = (idx, resolve, reject) => {
    // 文件名
    // `${file.name}创建分块并上传第${idx + 1}个分片`;
    // 计算每一片的起始与结束位置
    const start = idx * shardSize;
    const end = Math.min(file.size, start + shardSize);

    // fetch提交
    axios.post(`${uploadAddress}/mkblk/${end - start}`, file.slice(start, end), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `UpToken ${token}`,
      },
      skipResponseInterceptor: true,
    }).then((json) => {
      const data = json.data;
      if (!data || json.status !== 200) {
        reject(data);
      } else {
        ctxs.push(data.ctx);
        // console.log('jindu', (idx * 100) / shardCount);
        onProgress(((idx + 1) * 100) / shardCount);
        i += 1;
        if (i >= shardCount) {
          mkfile(ctxs.join(','), resolve, reject);
          // return false;
        } else {
          // bput(data);
          mkblk(i, resolve, reject);
        }
      }
    }).catch(reject);
  };

  return new Promise((resolve, reject) => {
    getToken().then((options) => {
      token = options.token;
      downloadAddress = options.downloadAddress;
      uploadAddress = options.uploadAddress;
      mkblk(0, resolve, reject);
    });
  });
};
