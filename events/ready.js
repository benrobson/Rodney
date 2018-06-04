const token = require('../token.json');
const config = require('../config.json');
const superagent = require('superagent');

module.exports = client => {
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

  console.log(`${client.user.username} is online and is operating on ${client.guilds.size} ${pluralnonpluralservers} for ${client.users.size} ${pluralnonpluralusers}.`);

function setActivity() {
  const Gameinfo = [`Using ${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}MBs of RAM`, 'Source: http://bit.ly/rodneybotsource', 'Developer: shadowolf#9212', 'Discord: http://bit.ly/mancavediscord', 'Invite: http://bit.ly/inviterodney', `Running on ${client.guilds.size} ${pluralnonpluralservers}`, `Running for ${client.users.size} ${pluralnonpluralusers}`, `Use ${config.prefix}help`];
  var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];

  client.user.setActivity(info);
  console.log(`[Console] Activity set to (${info})`);
};

/*
Search for how many youtube subscribers the user has.

const channel_id = 'UC23H6E9ZnXtBKbTuitExc5Q';
const your_key = '';
let {body} = superagent
.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_id}&key=${your_key}`);

console.log(body.items);
*/

setInterval(setActivity, 120000);
};
