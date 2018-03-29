module.exports = client => {
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';
  console.log(`${client.user.username} is online and is operating on ${client.guilds.size} ${pluralnonpluralservers} for ${client.users.size} ${pluralnonpluralusers}.`);
  client.user.setActivity(`${client.guilds.size} ${pluralnonpluralservers} // ${client.users.size} ${pluralnonpluralusers}`, {type: 'PLAYING'});
  return
}
