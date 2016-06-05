describe('Validator', function() {

  var data, nullData = Validator.NULLREPODATA;

  describe('when it validates repo data', function() {

    beforeEach(function() {
      data = $.extend(true, {}, REPOSDATA[0]);
    });

    it('detects if data is correct', function() {
      expect(Validator.checkRepo(data)).toEqual(data);
    });

    it('fails if data does not contain a valid link to user profile', function() {
      data.html_url = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.html_url;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid name', function() {
      data.name = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.name;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid description', function() {
      data.description = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.description;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid contributors link', function() {
      data.contributors_url = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.contributors_url;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid fork', function() {
      data.fork = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.fork;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid languages link', function() {
      data.languages_url = 1;
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.languages_url;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

    it('fails if data does not contain a valid update date', function() {
      data.updated_at = '';
      expect(Validator.checkRepo(data)).toEqual(nullData);
      delete data.updated_at;
      expect(Validator.checkRepo(data)).toEqual(nullData);
    });

  });

});
