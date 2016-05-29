var UI = (function(ui) {

  ui.reposbox   = 'repos-info';
  ui.repotitle  = 'repo__title';
  ui.repofork   = 'repo__fork';
  ui.forktext   = 'fork',
  ui.repolangs  = 'repo__languages',
  ui.repofooter = 'repo__footer';

  var
    join = ui.join,
    date = ui.date,
    MIN  = 2,
    MAX  = 4;

  function checkCapitals(language) {
    var capitals = language.replace(/[a-z]/g, '');
    return (capitals.length < MIN) ? language : capitals;
  }

  function shorten(language) {
    var shortened = (language.length > MAX) ? checkCapitals(language) : language;
    return shortened.substr(0, MAX);
  }

  function allLanguages(lang) {
    return $.map(lang, function(language) {
      return join(['<li class="circle-lang">', shorten(language), '</li>']);
    });
  }

  function buildTitle(html_url, name) {
    return join(['<h2 class="', ui.repotitle, '"><a href="', html_url, '">', name, '</a></h2>']);
  }

  function buildDescription(description) {
    return join(['<p>', description, '</p>']);
  }

  function buildIcon() {
    return join(['<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#', ui.forktext, '"></use></svg>']);
  }

  function buildFork(fork) {
    if (fork) {
      return join(['<span class="', ui.repofork, '"><span class="visuallyhidden">', ui.forktext, '</span>', buildIcon(), '</span>']);
    }
  }

  function buildLanguages(lang) {
    return join(['<ul class="', ui.repolangs, '">', allLanguages(lang),
    '</ul>']);
  }

  function buildLastUpdate(updated_at) {
    return join(['<footer class="', ui.repofooter, '">Last updated: <time datetime="', updated_at, '">', date(updated_at), '</time>.</footer>']);
  }

  function buildRepoBox(data) {
    return join([
      '<li class="repo"><article>',
      buildTitle(data.html_url, data.name),
      buildDescription(data.description),
      //'<p><span>Contributors</span><span class="circle-border">5</span>',
      buildFork(data.fork),
      //'</p>',
      buildLanguages(data.lang),
      buildLastUpdate(data.updated_at),
      '</article></li>'
    ]);
  }

  function buildAllBoxes(data, validator) {
    return join($.map(data, function(d) {
      d = validator.checkRepo(d);
      return buildRepoBox(d);
    }));
  }

  ui.fillReposBox = function(data, validator) {
    var reposbox = join(['.', ui.reposbox, ' ul']);
    $(reposbox).html(buildAllBoxes(data, validator));
  };

  return ui;

}(UI || {}));
