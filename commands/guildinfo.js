const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let guild = message.guild;
  let large = message.guild.large ? "✅" : "❎";
  let icon = message.guild.iconURL;

  let createdAtRaw = guild.createdAt.toDateString();
  let createdAt = createdAtRaw.split(" ");

  let textChannels = 0;
  let voiceChannels = 0;
  guild.channels.forEach(channel => {
  channel.type === "text" ? textChannels++ : voiceChannels++;
  });

  const emojis = message.guild.emojis.map(e => e.toString()).join(" ");
  const roles = message.guild.roles.map(e => e.toString()).join(" ");

  let embed = new Discord.RichEmbed()
  .setTitle(`Information about ${message.guild.name}`)
  .setColor(config.white)
  .setThumbnail(icon)
  .addField('Guild Name', guild.name, true)
  .addField('Guild ID', guild.id, true)
  .addField('Guild Owner', guild.owner, true)
  .addField('Created At', `${createdAt[0]} ${createdAt[2]} ${createdAt[1]} ${createdAt[3]}`, true)
  .addField('Server Region', guild.region.toUpperCase(), true)
  .addField('Members', message.guild.members.filter(member => !member.user.bot).size, true)
  .addField('Bots', message.guild.members.filter(member => member.user.bot).size, true)
  .addField('Large', large, true)
  //.addField('Verification Level', guild.verificationLevel, true)
  .addField('Text Channels', textChannels, true)
  .addField('Text Channels', voiceChannels, true)
  .addField('Roles', roles, true)
  .addField('Emojis', emojis, true)

  return message.channel.send(embed);
}

module.exports.help = {
  name: 'guildinfo',
  description: 'Displays information about the guild.',
  usage: 'guildinfo'
}
