const Discord = require('discord.js');
const config = require('../config.json');
const shorten = require('isgd');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args, tools) => {
  if (!args[1]){
    shorten.shorten(args[0], function(res){
      if (res.startsWith('Error:')) return errors.invalidURL(message);

      let embed = new Discord.RichEmbed()
      .setTitle('Here is the shortened URL.')
      .setColor(config.green)
      .setDescription(`${res}`);
      message.channel.send(embed);
      return
    })
  } else {
    shorten.custom(args[0], args[1], function(res){
    if (res.startsWith('Error:')){
      let embed = new Discord.RichEmbed()
      .setTitle('An error has occurred!')
      .setColor(config.red)
      .setDescription(`${res}`);
      message.channel.send(embed);
      return
    }});
  };
};

module.exports.help = {
  name: 'shortenurl',
  description: 'This will add a role to the mentioned user.',
  usage: 'shortenurl [url]'
};
