const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!args) {
    message.channel.send('Where are the args?')
  }

  if (args[1] == 'xd') {
    message.channel.send("CAN WE GET AN XD IN THE CHAT BOIS");
  } else if (args[1] == 'sad') {
    message.channel.send("Guys, this is so sad, can we get 10 likes.");
  }
};

module.exports.help = {
  name: 'tag',
  usage: 'tag'
};
