const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed()

  .setDescription(`**Roadmap [Current and Future Development Progress]**`)
  .setColor(config.plainembedcolor)
  .addField(`Want to see the current and future progression of ${client.user.username}, see the link to the progression roadmap on the bots GitHub Wiki:`, 'https://goo.gl/2jCKvp');

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'roadmap'
}
