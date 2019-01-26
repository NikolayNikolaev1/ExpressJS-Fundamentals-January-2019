const fs = require('fs');
const path = require('path');
const qs = require('querystring');
let db = require('../db/db');
const database = require('../config/dataBase')

function viewAll (req, res) {
  fs.readFile(path.join(__dirname, '../views/viewAll.html'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let result = '';

    db = db.sort((a, b) => {
      return b.dateStamp - a.dateStamp;
    });

    for (let meme of db) {
      if (meme.privacy === 'on') {
        result += `
        <div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>          
        </div>`;
      }
    }

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', result);

    res.writeHead(200, {
      'ContentType': 'text/html'
    });

    res.write(data);
    res.end();
  });
}

function viewAddMeme (res, callback) {
  fs.readFile(path.join(__dirname, '../views/addMeme.html'), (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    if (callback) {
      data = callback(data);
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write(data);
    res.end();
});
}

function addMeme (req, res) {
  let dataString = '';

  req.on('data', (data) => {
    dataString += data;
  });

  req.on('end', () => {
    let meme = qs.parse(dataString);

    if (meme.title === "" || meme.memeSrc === "") {
      viewAddMeme(res, (data) => {
            return data = data.toString()
                .replace('{{replaceMe}}','<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
        });
    } else {
      viewAddMeme(res, (data) => {
            return data = data.toString()
                .replace('{{replaceMe}}','<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>');
        });
        
        database.add(meme);
    }
});
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(res, null)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')
  } 
  else {
    return true
  }
}
