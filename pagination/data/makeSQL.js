const makeTestData = require("dk_test_names");
const ROWS_TO_CREATE = 100;

makeTestData(ROWS_TO_CREATE,{fileName:"dbsetup.sql",arrayManipulator:mapper})
function mapper(names) {
  return names.map(n => `(${n.id},'${n.gender}','${n.firstName}','${n.lastName}','${n.email}')`)
    .reduce((acc, cur, idx, src) => {
      let val = acc + "\n" + cur + (idx < src.length - 1 ? "," : ";")
      return val
    }, initValForReducer);
}
const initValForReducer = `
CREATE TABLE Names (
  id INT(6) PRIMARY KEY,
  gender VARCHAR(10) NOT NULL,
  firstName VARCHAR(40) NOT NULL,
  lastName VARCHAR(60) NOT NULL,
  email VARCHAR(60)
);
INSERT INTO names (id,gender,firstName,lastName,email) VALUES
`

