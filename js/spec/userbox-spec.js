describe('UI', function() {

  describe('when it builds the userbox', function() {
    var
      data,
      validator,
      userbox  = UI.userbox,
      avatar   = UI.avatar,
      username = UI.username;

    beforeEach(function() {
      setFixtures('<section class="' + userbox + '"></section>');
      validator = { check: function(data) { return data; }};
      data      = USERDATA;
    });

    it('shows the right avatar', function() {
      data.avatar_url = 'octocat.jpeg';
      UI.fillUserBox(data, validator);
      expect($(s(avatar)).attr('src')).toEqual('octocat.jpeg');
    });

    it('adds the right alt text to the avatar', function() {
      data.name = 'The Octocat';
      UI.fillUserBox(data, validator);
      expect($(s(avatar)).attr('alt')).toEqual('The Octocat');
    });

    it('shows the user name', function() {
      data.name = 'The Octocat';
      UI.fillUserBox(data, validator);
      expect($(s(username)).text()).toEqual('The Octocat');
    });

    it('links the user name to their profile', function() {
      data.html_url = 'http://example.com';
      UI.fillUserBox(data, validator);
      expect($(s(username) + ' a').attr('href')).toEqual('http://example.com');
    });

    it('shows company', function() {
      data.company = 'Octocats';
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html()).toContain('Octocats');
    });

    it('shows location', function() {
      data.location = 'Octoplanet';
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html()).toContain('Octoplanet');
    });

    it('shows and links to blog', function() {
      data.blog = 'http://blog-example.com';
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html().split('http://blog-example.com').length - 1).toEqual(2);
    });

    it('shows the number of repos', function() {
      data.public_repos = 1;
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html()).toContain('1</span>');
    });

    it('shows the number of gists', function() {
      data.public_gists = 2;
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html()).toContain('2</span>');
    });

    it('shows member-since date', function() {
      data.created_at = '2011-01-25T18:44:36Z';
      UI.fillUserBox(data, validator);
      expect($(s(userbox)).html()).toContain('January 25, 2011');
    });

    function s(selector) {
      return '.' + selector;
    }
  });

});
