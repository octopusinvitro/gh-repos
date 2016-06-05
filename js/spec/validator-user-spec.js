describe('Validator', function() {

  var data, nullData = Validator.NULLUSERDATA;

  describe('when it validates user data', function() {

    beforeEach(function() {
      data = $.extend(true, {}, USERDATA);
    });

    it('detects if data is correct', function() {
      expect(Validator.checkUser(data)).toEqual(data);
    });

    it('fails if data does not contain a valid avatar', function() {
      data.avatar_url = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.avatar_url;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid name', function() {
      data.name = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.name;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid link to user profile', function() {
      data.html_url = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.html_url;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid company', function() {
      data.company = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.company;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid location', function() {
      data.location = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.location;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid blog', function() {
      data.blog = 1;
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.blog;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid number of repos', function() {
      data.public_repos = '';
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.public_repos;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid number of gists', function() {
      data.public_gists = '';
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.public_gists;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid creation date', function() {
      data.created_at = '';
      expect(Validator.checkUser(data)).toEqual(nullData);
      delete data.created_at;
      expect(Validator.checkUser(data)).toEqual(nullData);
    });

  });

});
