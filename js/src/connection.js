var Connection = (function(connection) {

  connection.user;
  connection.repos;

  function getData(url) {
    return $.get(url).promise();
  }

  // The promises will return:
  // dataFromRequest = [ data, statusText, jqXHR ]
  connection.ifFulfilled = function(userData, reposData) {
    connection.user  = userData[0];
    connection.repos = reposData[0];
  };

  connection.ifRejected = function() {
    connection.user  = {};
    connection.repos = {};
  };

  connection.get = function(urlUser, urlRepos, callbacks) {
    return $.when(
      getData(urlUser),
      getData(urlRepos)
    ).then(
      callbacks.ifFulfilled,
      callbacks.ifRejected
    ).promise();
  };

  return connection;

}(Connection || {}));

