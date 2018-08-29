const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Information`)
    .addField('Usage', `${module.exports.help.usage}`)
    message.channel.send(embed);
    return true;
  };

  let user = message.guild.member(message.mentions.members.first());
  if (!user) return errors.invalidUser(message);

  let embed = new Discord.RichEmbed()
  .setTitle(`${user.displayName}s avatar.`)
  .setImage(user.user.displayAvatarURL);
  message.channel.send(embed);
  return
};

module.exports.help = {
    name: 'avatar',
    description: 'This will allow you to display a users avatar.',
    usage: 'avatar [@user]'
};
