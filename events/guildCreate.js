const Discord = require('discord.js');
const config = require('../config.json');
const chalk = require('chalk');

module.exports = async guild => {
  console.log(`\n\n` + chalk.green('[Console]') + ` Joined the Guild ${guild.name}.\nGuild Owner: ${guild.owner.user.tag}\nNumber of Members: ${guild.memberCount}\nGuild Location: ${guild.region}\n\n`);

  guild.createChannel(`audit-log`, `text`).catch(console.error);
  guild.createChannel(`reports`, `text`).catch(console.error);
};