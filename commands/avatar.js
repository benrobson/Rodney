const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();

  let embed = new Discord.RichEmbed()
  .setTitle(`Here is the Users Avatar`)
  .setColor(config.plainembedcolor)
  .setImage(user.avatarURL);
  message.channel.send(embed);
  return
};

  module.exports.help = {
    name: 'avatar',
    description: 'This will display your avatar.',
    usage: 'avatar'
  }
