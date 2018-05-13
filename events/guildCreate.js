const Discord = require('discord.js');
const config = require('../config.json');

module.exports = guild => {
  console.log(`[Console] Joined the guild ${guild.name}.`);
};
