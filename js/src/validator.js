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
    'created_at': '1991-01-01T00:00:00Z'
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

  validator.checkUser = function(data) {
    return (hasValidUserAttributes(data)) ? data : validator.NULLUSERDATA;
  };

  return validator;

}(Validator || {}));
