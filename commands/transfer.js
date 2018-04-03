const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (message.author.id !== `${config.ownerid}`) return errors.ownersOnly(message);

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return errors.invalidUser(message);


  if (message.author.id == `${config.ownerid}`){
    let embed = new Discord.RichEmbed()
    .setTitle(`This guild is under new management`)
    .setDescription('This guilds ownership has been transferred.')
    .setColor(config.yellow)
    .addField('New Owner', user, true)
    message.channel.send(embed);

    message.guild.setOwner(message.mentions.members.first());
    return;
  }
}

module.exports.help = {
  name: 'transfer',
  description: 'null',
  usage: 'transfer [@user]'
}
