const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const superagent = require('superagent');

module.exports.run = async (client, message, args) => {
  let mcIP = args[0];

  let {body} = await superagent
  .get('http://mcapi.us/server/status?ip=' + mcIP);

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${mcIP}`)
  .setThumbnail('http://minecraftpocketedition.wikia.com/wiki/File:Minecraft_1.2_Logo.png')
  .setColor(body.online ? config.green : config.red)
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
