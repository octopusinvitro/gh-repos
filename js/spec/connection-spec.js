var x;
describe('Connection', function() {

  var
    requestUser, requestRepos, promise,
    onSuccess = jasmine.createSpy('Connection.ifFulfilled'),
    onFailure = jasmine.createSpy('Connection.ifRejected'),
    urlUser   = 'http://example-user.com',
    urlRepos  = 'http://example-repos.com',
    // urlUser  = 'https://api.github.com/users/octocat',
    // urlRepos = 'https://api.github.com/users/octocat/repos',
    testResponsesUser = {
      results: {
        success : { 'status': 200, 'responseText': '{"hello" : "user"}' },
        failure : { 'status': 404, 'responseText': '' }
      }
    },
    testResponsesRepos = {
      results: {
        success : { 'status': 200, 'responseText': '{"hello" : "repos"}' },
        failure : { 'status': 404, 'responseText': '' }
      }
    };

  beforeEach(function() {
    jasmine.Ajax.install();
    promise = Connection.get(urlUser, urlRepos, {
      ifFulfilled: onSuccess,
      ifRejected:  onFailure
    });
    requestUser  = jasmine.Ajax.requests.first();
    requestRepos = jasmine.Ajax.requests.mostRecent();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('uses the right verb for the user request', function() {
    expect(requestUser.method).toEqual('GET');
  });

  it('uses the right verb for the repos request', function() {
    expect(requestRepos.method).toEqual('GET');
  });

  it('makes a request to the user endpoint', function() {
    expect(requestUser.url).toEqual(urlUser);
  });

  it('makes a request to the repos endpoint', function() {
    expect(requestRepos.url).toEqual(urlRepos);
  });

  describe('on success', function() {

    var dataFromUserRequest, dataFromReposRequest;

    beforeEach(function() {
      requestUser.respondWith(testResponsesUser.results.success);
      requestRepos.respondWith(testResponsesRepos.results.success);
      dataFromUserRequest  = onSuccess.calls.first().args[0];
      dataFromReposRequest = onSuccess.calls.mostRecent().args[0];
    });

    it('calls the onSuccess callback', function() {
      expect(onSuccess).toHaveBeenCalled();
    });

    // The promises will return:
    // dataFromRequest = [ data, statusText, jqXHR ]
    it('returns one response array for each request', function() {
      expect(dataFromUserRequest.length).toEqual(3);
      expect(dataFromReposRequest.length).toEqual(3);
    });

    xit('retrieves the right data', function() {
      expect(dataFromUserRequest[0] ).toEqual({hello : 'user'} );
      expect(dataFromReposRequest[0]).toEqual({hello : 'repos'} );
    });

    it('updates the connection variables', function() {
      function expectation() {
        expect(Connection.user ).toEqual({hello : 'user'} );
        expect(Connection.repos).toEqual({hello : 'repos'} );
      }
      promise.done(expectation);
    });

  });

  describe('on failure', function() {

    beforeEach(function() {
      requestUser.respondWith(testResponsesUser.results.failure);
      requestRepos.respondWith(testResponsesRepos.results.failure);
    });

    it('calls the onFailure callback', function() {
      expect(onFailure).toHaveBeenCalled();
    });

  });

});
