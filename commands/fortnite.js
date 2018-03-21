const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file
const token = require('../token.json'); // this links to an external file where I keep my tokens for development purposes.
const Fortnite = require('fortnite');
const stats = new Fortnite(token.fortniteapi);

module.exports.run = async (client, message, args, tools) => {
  let platform;
  let username;

  if (!['pc','xbl','psn'].includes(args[0])){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please include a platform in your arguments.');
    message.channel.send(embed);
    return
  };
  if (!args[1]){
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('Please include a username in your arguments.');
    message.channel.send(embed);
    return
  };

  platform = args.shift();
  username = args.join(' ');

  stats.getInfo(username, platform).then(data => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Fortnite Stats for ${data.username}`)
    .setThumbnail('https://i.imgur.com/SudHnUn.png')
    .setColor(config.purple)
    .addField('Top Placement Top 3s:', `${data.lifetimeStats[0].value}`, true)
    .addField('Top Placement Top 5s:', `${data.lifetimeStats[1].value}`, true)
    .addField('Top Placement Top 6s:', `${data.lifetimeStats[3].value}`, true)
    .addField('Top Placement Top 12s:', `${data.lifetimeStats[4].value}`, true)
    .addField('Top Placement Top 25s:', `${data.lifetimeStats[5].value}`, true)
    .addField('Total Score:', data.lifetimeStats[6].value, true)
    .addField('Matches Played:', data.lifetimeStats[7].value, true)
    .addField('Wins:', data.lifetimeStats[8].value, true)
    .addField('Win Percentage:', data.lifetimeStats[9].value, true)
    .addField('Kills:', data.lifetimeStats[10].value, true)
    .addField('K/D Ratio:', data.lifetimeStats[11].value, true)
    .addField('Kills per Minute:', data.lifetimeStats[12].value, true)
    .addField('Time Played:', data.lifetimeStats[13].value, true)
    .addField('K/D Ratio:', data.lifetimeStats[11].value, true)
    .addField('Average Survival Time:', data.lifetimeStats[14].value, true)
    message.channel.send(embed);
    return
  })

  .catch(error => {
    let embed = new Discord.RichEmbed()
    .setTitle('An error has occurred!')
    .setColor(config.red)
    .setDescription('This username was not found.');
    message.channel.send(embed);
    return
  });
};

module.exports.help = {
  name: 'fortnite',
  description: 'Displays stats for a user on a gaming platform for the game Fortnite',
  usage: 'fortnite [pc | xbl | psn] [username]'
};
