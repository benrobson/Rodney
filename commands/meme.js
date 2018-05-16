const Discord = require('discord.js');
const config = require('../config.json');
const meme = require('memejs');

module.exports.run = async (client, message, args) => {
  meme(function(data) {
    const embed = new Discord.RichEmbed()
    .setTitle(data.title[0])
    .setImage(data.url[0])
    message.channel.send({embed});
  });
};

module.exports.help = {
  name: 'meme',
  usage: 'meme'
};
