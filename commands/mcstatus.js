const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const superagent = require('superagent');

module.exports.run = async (client, message, args) => {
  const mcIP = args.join(' ').slice(8);

  let {body} = await superagent
  .get('http://mcapi.us/server/status?ip=' + mcIP);

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about this Minecraft Server.`)
  .setColor(config.green)
  .addField('Server Online:', body.online, true)
  .addField('Players On:', body.players.now, true)
  .addField('Max Players:', body.players.max, true);

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'mcstatus',
  description: 'Displays information about the Minecraft Server.',
  usage: 'mcstatus [ip]'
};
