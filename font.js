const debug = require('debug')('siji-site:font');
const fs = require('fs');
const path = require('path');

exports.compile = function () {
  const returner = {
    count: 0,
    chars: [],
  };

  let cursor = 0;

  const origin =
    fs.readFileSync(path.resolve('siji/bdf/siji.bdf'))
    .toString()
    .split('\n');

  for (let i=0; i<origin.length; i++) {
    const idx = origin[i].indexOf(' ');
    let key = '';
    let itm = '';
    if (idx != -1) {
      key = origin[i].slice(0,idx);
      itm = origin[i].slice(idx+1);
    }
    else {
      key = origin[i];
      itm = '';
    }

    switch(key) {
      case 'CHARS':
        if (isNaN(itm)) throw `Value for CHARS should be a number: ${i}`;
        returner.count = parseInt(itm);
        break;

      case 'STARTCHAR':
        returner.chars[cursor] = {};
        returner.chars[cursor].key = itm;
        break;

      case 'ENDCHAR':
        cursor++;
        break;

      case 'ENCODING':
        returner.chars[cursor].ENCODING = itm;
        break;

      case 'BBX':
        returner.chars[cursor].BBX = itm.split(' ').map(Number);
        debug(returner.chars[cursor].BBX);
        break;

      case 'BITMAP':
        returner.chars[cursor].BITMAP = [];
        for (let j=0; j<returner.chars[cursor].BBX[1]; j++) {
          i++;
          let str = '';
          for (let col=0; col<origin[i].length; col++) {
            str += ('000' + parseInt(origin[i].charAt(col), 16).toString(2)).slice(-4);
          }
          debug(str);
          returner.chars[cursor].BITMAP[j] = str;
        };
        break;
    }
  }
  return returner;
}
