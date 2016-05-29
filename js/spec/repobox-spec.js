describe('UI', function() {

  var
    data,
    validator,
    reposbox = s(UI.reposbox);

  function s(selector) {
    return '.' + selector;
  }

  beforeEach(function() {
    setFixtures('<section class="' + UI.reposbox + '"><ul></ul></section>');
    validator = { checkRepo: function(data) { return data; }};
  });

  describe('when it builds one repobox', function() {
    var
      forktag    =   UI.repofork,
      repotitle  = s(UI.repotitle),
      repolangs  = s(UI.repolangs),
      repofooter = s(UI.repofooter);

    beforeEach(function() {
      data         = [REPOSDATA[0]];
      data[0].lang = [];
    });

    it('shows the name of the repo', function() {
      data[0].name = 'osom-repo';
      UI.fillReposBox(data, validator);
      expect($(repotitle).text()).toEqual('osom-repo');
    });

    it('links to the repo', function() {
      data[0].html_url = 'http://example.com';
      UI.fillReposBox(data, validator);
      expect($(repotitle + ' a').attr('href')).toEqual('http://example.com');
    });

    it('shows the description', function() {
      data[0].description = 'Lorem ipsum dolor sit amet';
      UI.fillReposBox(data, validator);
      expect($(reposbox).html()).toContain('Lorem ipsum dolor sit amet');
    });

    // it('shows the number of contributors', function() {
    //   data[0].contributors_url = 'https://github.com/codebar/planner/graphs/contributors';
    //   UI.fillReposBox(data, validator);
    //   expect($(reposbox).html()).toContain();
    // });

    it('shows the fork tag if it is a fork', function() {
      data[0].fork = true;
      UI.fillReposBox(data, validator);
      expect($(reposbox).html()).toContain(forktag);
    });

    it('does not show the fork tag if it is not a fork', function() {
      data[0].fork = false;
      UI.fillReposBox(data, validator);
      expect($(reposbox).html()).not.toContain(forktag);
    });

    describe('when the repo has languages', function() {

      it('shows the languages', function() {
        data[0].lang = ['CSS', 'HTML'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>CSS<');
        expect($(repolangs).html()).toContain('>HTML<');
      });

      it('does not affect short language names', function() {
        data[0].lang = ['Qt'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>Qt<');
      });

      it('shortens long language names with less than minimum capitals', function() {
        data[0].lang = ['Scala'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>Scal<');
      });

      it('shortens long language names with more than minimum capitals', function() {
        data[0].lang = ['JavaScript'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>JS<');
      });

      it('shortens long language names with more capitals than maximum language length', function() {
        data[0].lang = ['LongNameWithMoreThanMaxCapitals'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>LNWM<');
      });

      it('shortens long language names with special characters', function() {
        data[0].lang = ['Objective-C', 'TurboGears2'];
        UI.fillReposBox(data, validator);
        expect($(repolangs).html()).toContain('>O-C<');
        expect($(repolangs).html()).toContain('>TG2<');
      });

    });

    it('shows the last update', function() {
      data[0].created_at = '2014-03-28T17:55:38Z';
      UI.fillReposBox(data, validator);
      expect($(repofooter).text()).toContain('April 26, 2016');
    });
  });

  describe('when it builds several repoboxes', function() {

    beforeEach(function() {
      data         = [REPOSDATA[0], REPOSDATA[1]];
      data[0].lang = ['CSS', 'HTML'];
      data[1].lang = [];
    });

    it('uses an unordered list to show the repos', function() {
      UI.fillReposBox(data, validator);
      var listSelector = reposbox + ' > ul';
      expect($(listSelector).length).toEqual(1);
    });

    it('shows all the repos', function() {
      UI.fillReposBox(data, validator);
      var listItemsSelector = reposbox + ' > ul > li';
      expect($(listItemsSelector).length).toEqual(data.length);
    });

  });

});
