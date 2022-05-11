const axios = require('axios');

const getHostedURL = function(file, cb = () => {}) {
  const uploadURL = 'https://api.cloudinary.com/v1_1/dmb8pc511/image/upload';

  var data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'yoqsoi4s');

  return axios.post(uploadURL, data)
    .then((response) => {
      cb(null, response.data.url);
      // return response.data.url;
    })
    .catch(err => console.log(err));
};

module.exports = getHostedURL;