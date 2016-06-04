describe('Connection', function() {

  var
    requestUser, requestRepos,
    onSuccess = jasmine.createSpy('onSuccess'),
    onFailure = jasmine.createSpy('onFailure'),
    urlUser   = 'http://example-user.com',
    urlRepos  = 'http://example-repos.com',
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
    Connection.get(urlUser, urlRepos, {
      onSuccess: onSuccess,
      onFailure: onFailure
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

    beforeEach(function() {
      requestUser.respondWith(testResponsesUser.results.success);
      requestRepos.respondWith(testResponsesRepos.results.success);
    });

    xit('calls the onSuccess callback', function() {
      expect(onSuccess).toHaveBeenCalled();
    });

  });

  describe('on failure', function() {

    beforeEach(function() {
      requestUser.respondWith(testResponsesUser.results.failure);
      requestRepos.respondWith(testResponsesRepos.results.failure);
    });

    xit('calls the onFailure callback', function() {
      expect(onFailure).toHaveBeenCalled();
    });

  });

});
