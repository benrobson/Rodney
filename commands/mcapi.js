const Discord = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');

module.exports.run = async (client, message, args) => {
  let {body} = await superagent
  .get('https://status.mojang.com/check');

  let embed = new Discord.RichEmbed()
  .setTitle(`Mojang Service Status`)
  .addField('minecraft.net', , true)
  .addField('session.minecraft.net', , true)
  .addField('account.mojang.com', , true)
  .addField('authserver.mojang.com', , true)
  .addField('sessionserver.mojang.com', , true)
  .addField('api.mojang.com', , true)
  .addField('textures.minecraft.net', , true)
  .addField('mojang.com', , true)

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'mcapi',
  description: '',
  usage: 'mcapi'
};
