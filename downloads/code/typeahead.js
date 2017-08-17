// Twitter Typeahead
$(document).ready(function() {
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push({ value: str });
        }
      });
      cb(matches);
    };
  };
  var gravatars = gon.gravatars;  
  var usernames = gon.usernames;
  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
  },
  
  {
    name: 'usernames',
    displayKey: 'value',
    source: substringMatcher(usernames),
    templates: {
      empty: [
        '<div class="empty-message">',
        'No username matches found. Enter an email instead!',
        '</div>'
      ].join('\n'),
      suggestion: function(username){
        return  '<div id="user-selection">' +
                '<p><strong>' + username.value + '</strong></p>' +
                '<img src="' + gravatars[usernames.indexOf(username.value)] + '"/>' +
                '</div>' ;
      }
    }
  });
});