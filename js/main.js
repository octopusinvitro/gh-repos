$(function() {
  var
    urlUser  = 'https://api.github.com/users/octocat',
    urlRepos = 'https://api.github.com/users/octocat/repos',
    callbacks = {
      ifFulfilled: Connection.ifFulfilled,
      ifRejected: Connection.ifRejected
    };

  function updateUI() {
    UI.fillUserBox(Connection.user, Validator);
    UI.fillReposBox(Connection.repos, Validator);
  }

  Connection.get(urlUser, urlRepos, callbacks).then(updateUI);

});
