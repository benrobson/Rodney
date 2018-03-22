const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return errors.invalidUser(message);

  let embed = new Discord.RichEmbed()
  .setTitle(`Here is ${user.displayName}s avatar.`)
  .setColor(config.white)
  .setImage(user.avatarURL);
  message.channel.send(embed);
  return
};

  module.exports.help = {
    name: 'avatar',
    description: 'This will display your avatar.',
    usage: 'avatar [@user]'
};
