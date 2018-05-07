const config = require('../config.json');

module.exports = client => {
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

  console.log(`${client.user.username} is online and is operating on ${client.guilds.size} ${pluralnonpluralservers} for ${client.users.size} ${pluralnonpluralusers}.`);

function setActivity() {
  const Gameinfo = [`Running on ${client.guilds.size} ${pluralnonpluralservers}`, `Running for ${client.users.size} ${pluralnonpluralusers}`, `Use ${config.prefix}help for help`, `Using ${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}MBs of RAM`];
  var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];

  client.user.setActivity(info);
  console.log(`[ LOG ] Activity set to (${info})`);
}

setInterval(setActivity, 120000);
}
