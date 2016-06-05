var Validator = (function(validator) {

  validator.NULLUSERDATA = {
    'avatar_url': 'https://avatars.githubusercontent.com/u/583231?v=3',
    'html_url': '',
    'name': 'No name',
    'company': 'No company',
    'blog': '',
    'location': 'No location',
    'public_repos': 0,
    'public_gists': 0,
    'created_at': 'No date available'
  };

  validator.NULLREPODATA =   {
    'name': 'No name',
    'html_url': '',
    'description': 'No description',
    'fork': false,
    'languages_url': 'https://api.github.com/repos/octocat/git-consortium/languages',
    'contributors_url': 'https://api.github.com/repos/octocat/git-consortium/contributors',
    'updated_at': 'No date available',
    'lang': []
  };

  function isString(s) {
    return typeof s === 'string';
  }

  function isNumber(n) {
    return Number.isFinite(n);
  }

  function isDate(d) {
    var date = new Date(d);
    return date.toString() !== 'Invalid Date';
  }

  function isBoolean(b) {
    return typeof b === 'boolean';
  }

  function addLanguages(data) {
    // data.push(lang)
    return data;
  }

  function hasValidUserAttributes(data) {
    return data.hasOwnProperty('avatar_url')   && isString(data.avatar_url)
      &&   data.hasOwnProperty('name')         && isString(data.name)
      &&   data.hasOwnProperty('html_url')     && isString(data.html_url)
      &&   data.hasOwnProperty('company')      && isString(data.company)
      &&   data.hasOwnProperty('location')     && isString(data.location)
      &&   data.hasOwnProperty('blog')         && isString(data.blog)
      &&   data.hasOwnProperty('public_repos') && isNumber(data.public_repos)
      &&   data.hasOwnProperty('public_gists') && isNumber(data.public_gists)
      &&   data.hasOwnProperty('created_at')   && isDate(data.created_at);
  }

  function hasValidRepoAttributes(data) {
    return data.hasOwnProperty('html_url')         && isString(data.html_url)
      &&   data.hasOwnProperty('name')             && isString(data.name)
      &&   data.hasOwnProperty('description')      && isString(data.description)
      &&   data.hasOwnProperty('contributors_url') && isString(data.contributors_url)
      &&   data.hasOwnProperty('fork')             && isBoolean(data.fork)
      &&   data.hasOwnProperty('languages_url')    && isString(data.languages_url)
      &&   data.hasOwnProperty('updated_at')       && isDate(data.updated_at);
  }

  validator.checkUser = function(data) {
    return (hasValidUserAttributes(data)) ? data : validator.NULLUSERDATA;
  };

  validator.checkRepo = function(data) {
    return (hasValidRepoAttributes(data)) ? addLanguages(data) : validator.NULLREPODATA;
  };

  return validator;

}(Validator || {}));
