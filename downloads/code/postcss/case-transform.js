// to be added above `module.exports` of webpack.config.js
// color vars in JS are CONST_CASE, but need to be converted to hyphen-case for CSS
const renameKeys = R.curry((renameFn, obj) => {
  return R.reduce((acc, key) => {
    acc[renameFn(key)] = obj[key]
    return acc
  }, {}, R.keys(obj))
})
const constCaseToHyphenCase = (str) => { return str.replace(/_/g, "-").toLowerCase() }
var colorVars = renameKeys(constCaseToHyphenCase, require("./app/constants/colors"))