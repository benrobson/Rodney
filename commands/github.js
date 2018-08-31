const Discord = require('discord.js');
const config = require('../config.json');
const package = require('../package.json');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  let embed = new Discord.RichEmbed()
  .setTitle('GitHub')
  .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2000px-Octicons-mark-github.svg.png')
  .setURL(package.bugs.url)
  .setDescription(`If you didn't know, this Discord bot is Open Source, feel free to add or to fork your own version of the bot.\nIf you would like to report an issue or make a suggestion in the bot development, please do so on the tracker: ${package.bugs.url}`)

  message.channel.send(embed);
  return
}

module.exports.help = {
  name: 'github',
  description: 'This displays information and a URL to the Open Source project.',
  usage: 'github'
}
