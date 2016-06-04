var Connection = (function(connection) {

  connection.user;
  connection.repos;

  function getData(url) {
    return $.get(url).promise();
  }

  // The promises will return:
  // dataFromRequest = [ data, statusText, jqXHR ]
  function ifFulfilled(userData, reposData) {
    connection.user  = userData[0];
    connection.repos = reposData[0];
  }

  function ifRejected() {
    connection.user  = {};
    connection.repos = {};
  }

  connection.get = function(urlUser, urlRepos) {
    $.when(
      getData(urlUser),
      getData(urlRepos)
    ).then(ifFulfilled, ifRejected);
  };

  return connection;

}(Connection || {}));

