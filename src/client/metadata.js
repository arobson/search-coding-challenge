function getResource (axios, href) {
  return axios.options(href)
    .then(response => response.data);
}

function getResources (axios) {
  return axios.options('/')
    .then(async function (response) {
      const list = response.data.links.map(link => {
        return getResource(axios, link.href);
      });
      return Promise.all(list)
        .then(x => {
          return x.reduce((acc, y) => {
            acc[y.type] = y;
            return acc;
          }, {});
        });
    });
}

module.exports = function (axios) {
  return {
    getResources: getResources.bind(null, axios)
  };
};
