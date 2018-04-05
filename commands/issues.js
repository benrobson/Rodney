const Discord = require('discord.js');
const config = require('../config.json');
const package = require('../package.json');

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle('Issue Tracker')
  .setColor(config.white)
  .setDescription(`If you would like to report an issue or make a suggestion in the bot development, please do so on the tracker ${package.bugs.url}`)

  message.channel.send(embed);
  return
}

module.exports.help = {
  name: 'issues',
  description: 'Displays information that takes user to the issue tracker.',
  usage: 'issues'
}
