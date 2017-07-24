var regexPatterns = {
    nameStrings: /^[a-zA-Z]+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/
}
export {regexPatterns}

/* nameStrings Regex - Accepts english characters only, lowercase and uppercase
For all unicode characters use - /\p{L}/
Source: https://stackoverflow.com/questions/3617797/regex-to-match-only-letters */

/* email Regex
Source: http://emailregex.com/  - Javascript example*/

/* password Regex - Restrict passwords to:
Length: 8 to 20
Characters: aplhanumeric characters and select special character
Start: can not start with a digit, underscore or special character
Contain: must contain at least one digit
*/
