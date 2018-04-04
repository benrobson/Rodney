const Discord = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let mcIP = args[0];
  if (!mcIP) return errors.invalidIP(message);

  let {body} = await superagent
  .get('http://mcapi.us/server/status?ip=' + mcIP);
  let status = body.online ? "✅" : "❎";

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${mcIP}`)
  .setThumbnail('https://vignette.wikia.nocookie.net/minecraftpocketedition/images/f/f1/Minecraft_1.2_Logo.png/revision/latest?cb=20171204231225')
  .setColor(body.online ? config.green : config.red)
  .addField('Server Online', status)
  .addField('Players On', body.players.now, true)
  .addField('Max Players', body.players.max, true);

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'mcstatus',
  description: 'Display information about the Minecraft Server.',
  usage: 'mcstatus [ip]'
};
