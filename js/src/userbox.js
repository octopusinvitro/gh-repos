var UI = (function(ui) {

  ui.userbox  = 'user-info';
  ui.avatar   = 'user__image';
  ui.username = 'user__name';

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function join(array) {
    return array.join('');
  }

  function buildAvatar(avatar_url, alt_text) {
    return join(['<img class="', ui.avatar, '" src="', avatar_url, '" alt="',  alt_text, '" width="230" height="230">']);
  }

  function buildUserName(html_url, name) {
    return join(['<h2 class="', ui.username, '"><a href="', html_url, '">', name, '</a></h2>']);
  }

  function buildCompany(company, location) {
    return join(['<p>', company, ', ', location, '</p>']);
  }

  function buildBlog(blog) {
    return join(['<p><strong>Web:</strong> <a href="', blog, '">', blog, '</a></p>']);
  }

  function buildCounters(public_repos, public_gists) {
    return join(['<p><strong>Repos:</strong> <span class="circle-border">', public_repos, '</span> <strong>Gists:</strong> <span class="circle-border">', public_gists, '</span></p>']);
  }

  function date(created_at) {
    var d = new Date(created_at);
    return join([monthNames[d.getMonth()], ' ', d.getDate(), ', ', d.getFullYear()]);
  }

  function buildMemberSince(created_at) {
    return join(['<p><strong>Member since:</strong> <time datetime="', created_at, '">', date(created_at), '</time>.</p>']);
  }

  function buildUserBox(data) {
    return join([
      buildAvatar(data.avatar_url, data.name),
      '<div class="user__info">',
      buildUserName(data.html_url, data.name),
      buildCompany(data.company, data.location),
      buildBlog(data.blog),
      buildCounters(data.public_repos, data.public_gists),
      buildMemberSince(data.created_at),
      '</div>'
    ]);
  }

  ui.fillUserBox = function(data, validator) {
    var userbox = '.' + ui.userbox;
    data = validator.checkUser(data);
    $(userbox).html(buildUserBox(data));
  };

  ui.join = join;
  ui.date = date;

  return ui;

})(UI || {});
