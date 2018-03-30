const Discord = require('discord.js'); // this links to the official Discord npm package
const { version } = require('discord.js');
const config = require('../config.json'); // this links to the config.json file
const package = require('../package.json'); // this links to the package.json file

module.exports.run = async (client, message, args) => {
  function time( milliseconds ) {
    let day, hour, minute, seconds;

    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    let string = `\`${day}\` %day%, \`${hour}\` %hour%, \`${minute}\` %minute% and \`${seconds}\` %seconds%`;

    string = string.replace("%day%", "day" + (day === 1 ? "" : "s"));
    string = string.replace("%hour%", "hour" + (hour === 1 ? "" : "s"));
    string = string.replace("%minute%", "minute" + (minute === 1 ? "" : "s"));
    string = string.replace("%seconds%", "second" + (seconds === 1 ? "" : "s"));

    return string;
};

  let icon = client.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()

  .setTitle(`Information about ${client.user.username}`)
  .setColor(config.white)
  .setThumbnail(icon)
  .addField('Bot Name', client.user.username, true)
  .addField('Guild Count', client.guilds.size, true)
  .addField('Discord.js Version', `v${version}`, true)
  .addField('Node Version', `${process.version}`, true)
  .addField('User Count', client.users.size, true)
  .addField('Uptime', `${time(client.uptime)}`);

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
};
