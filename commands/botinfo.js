const Discord = require('discord.js');
const { version } = require('discord.js');
const config = require('../config.json');
const package = require('../package.json');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

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
  .addField('Memory Usage', `${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}MBs of RAM`, true)
  .addField('User Count', client.users.size, true)
  .addField('Uptime', `${time(client.uptime)}`);

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  usage: 'botinfo'
};
