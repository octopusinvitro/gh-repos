var UI = (function() {
  var
    ui = {
      userbox:  'user-info',
      avatar:   'user__image',
      username: 'user__name'
    },
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function buildAvatar(avatar_url, alt_text) {
    return ['<img class="', ui.avatar, '" src="', avatar_url, '" alt="',  alt_text, '" width="230" height="230">'].join('');
  }

  function buildUserName(html_url, name) {
    return ['<h2 class="', ui.username, '"><a href="', html_url, '">', name, '</a></h2>'].join('');
  }

  function buildCompany(company, location) {
    return ['<p>', company, ', ', location, '</p>'].join('');
  }

  function buildBlog(blog) {
    return ['<p><strong>Web:</strong> <a href="', blog, '">', blog, '</a></p>'].join('');
  }

  function buildCounters(public_repos, public_gists) {
    return ['<p><strong>Repos:</strong> <span class="circle-border">', public_repos, '</span> <strong>Gists:</strong> <span class="circle-border">', public_gists, '</span></p>'].join('');
  }

  function buildDate(created_at) {
    var d = new Date(created_at);
    return [monthNames[d.getMonth()], ' ', d.getDate(), ', ', d.getFullYear()].join('');
  }

  function buildMemberSince(created_at) {
    return ['<p><strong>Member since:</strong> ', buildDate(created_at), '</p>'].join('');
  }

  function buildUserBox(data) {
    return [
      buildAvatar(data.avatar_url, data.name),
      '<div class="user__info">',
      buildUserName(data.html_url, data.name),
      buildCompany(data.company, data.location),
      buildBlog(data.blog),
      buildCounters(data.public_repos, data.public_gists),
      buildMemberSince(data.created_at),
      '</div>'
    ].join('');
  }

  ui.fillUserBox = function(data, validator) {
    var userbox = '.' + ui.userbox;
    data = validator.check(data);
    $(userbox).html(buildUserBox(data));
  };

  return ui;
})();
