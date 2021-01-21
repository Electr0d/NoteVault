const fs = require('fs');
const path = require('path');
const dir = {
  config: path.join(__dirname, '../save/config')
}

let config = {
  masterPassword: 'Alsarakbi'
}



function pack(d, object) {
  fs.writeFileSync(d, JSON.stringify(object));
}

function unpack(d) {
  return JSON.parse(fs.readFileSync(d));
}
