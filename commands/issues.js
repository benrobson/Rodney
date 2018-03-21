const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const package = require('../package.json'); // this links to the package.json file

module.exports.run = async (client, message, args) => {
  let icon = client.user.displayAvatarURL;
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
