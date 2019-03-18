const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`${module.exports.help.name} Command Information`)
      .setDescription(`${module.exports.help.description}`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`)
      .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  let user = message.mentions.members.first();
  if (!user) return errors.invalidUser(message);

  let embed = new Discord.RichEmbed()
    .setTitle(`${user.displayName}'s avatar.`)
    .setImage(user.user.displayAvatarURL);
  message.channel.send(embed);
  return
};

module.exports.help = {
  name: 'avatar',
  description: 'This will allow you to display a users avatar.',
  usage: `avatar [@user]`
};
