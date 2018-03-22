const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const shorten = require('isgd'); // this is the package that allows the URL link shortening to happen

module.exports.run = async (client, message, args, tools) => {
  if (!args[0]) return message.channel.send('Proper Usage: shortenurl <URL>')

  if (!args[1]){
    shorten.shorten(args[0], function(res){
      if (res.startsWith('Error:')) return message.channel.send('Please enter a valid URL!');
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
