var addVals, linesAdded, linesRemoved, offset;

addVals = function(className, symbolToReplace) {
  var results;
  results = [];
  $(className).each(function() {
    var val;
    val = $(this).html().replace(symbolToReplace, '');
    return results.push(parseInt(val));
  });
  return results.reduce(function(x, y) {
    return x + y;
  });
};

linesAdded = addVals('.lines-added', '+');
linesRemoved = addVals('.lines-removed', '-');
offset = linesAdded - linesRemoved;