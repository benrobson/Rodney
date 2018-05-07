const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!args.slice(0)
  .join(' ')) return message.channel.send('Please, provide the text!')
  .then(message => message.delete(config.errortimeout));

  snekfetch.post('https://hastebin.com/documents')
  .send(args.slice(0)
  .join(' '))
  .then(body => {
    let embed = new Discord.RichEmbed()
    .setTitle('Hastebin Link Generated!')
    .setURL(body.body.key)
    .setDescription(`Posted text to Hastebin\nURL: https://hastebin.com/${body.body.key}`)
    message.channel.send(embed)
  });
};

module.exports.help = {
  name: 'hastebin',
  description: '',
  usage: 'hastebin [text]'
};
