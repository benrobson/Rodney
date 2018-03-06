const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle(`Poll by ${message.author.username}`)
  .setColor(config.plainembedcolor)
  .setDescription(`${args}`.split(',').join(' '));

  return message.channel.send(embed).then(message.delete())

  .then(function (message, str) {
        message.react("👍")
        message.react("👎")
      }).catch(function() {
  });
}

module.exports.help = {
  name: 'poll',
  description: 'Displays information about the user mentioned',
  usage: 'poll [question]'
}
