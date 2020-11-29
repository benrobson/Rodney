const twit = require('twit');
const errors = require('../util/errors.js');
const config = require('../config.json');
const token = require('../token.json');
const Discord = require('discord.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  if (args == 'help') {
    let embed = new Discord.RichEmbed()
      .setTitle(`${module.exports.help.name} Command Information`)
      .setDescription(`${module.exports.help.description}\n**NOTE** If you\'re running a public instance of this bot this command will not work.\nIf you would like to use this command, please clone the GitHub project and run the bot yourself.`)
      .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
      .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

  if (!config.tweetcommand) return errors.commandNotEnabled(message);
  if (process.env.consumer_key === 'KEY' || process.env.consumer_secret === 'KEY' || process.env.access_token === 'KEY' || process.env.access_token_secret === 'KEY') return errors.noAPIKey(message);

  // Twitter API Credentials & Information
  const twitter = new twit({
    consumer_key: `${process.env.consumer_key}`,
    consumer_secret: `${process.env.consumer_secret}`,
    access_token: `${process.env.access_token}`,
    access_token_secret: `${process.env.access_token_secret}`,
    timeout_ms: 60 * 1000
  });

  let tweetchannel = message.guild.channels.find('name', 'tweet');
  if (!tweetchannel) return errors.noTweetChannel(message);

  if (message.channel === tweetchannel) {
    let inputmessage = args.join(' ');
    if (!inputmessage) return errors.emptyMessage(message);
    if (message.channel === tweetchannel)

      twitter.post('statuses/update', {
        status: `${inputmessage}`
      }, function (err, data, response) {
        console.log(chalk.yellow(`[${message.guild}]`) + ` ${message.author.username} has tweeted "${inputmessage}"`);

        let embed = new Discord.RichEmbed()
          .setTitle('Tweet Successfully Tweeted!')
          .setColor(config.green)
          .addField('Message Content', `${inputmessage}`)
          .addField('Tweeted By', `${message.author.username}`)
        message.channel.send(embed);
      })
  } else {
    let inputmessage = args.join(' ');
    return errors.incorrectChannel(message);
  };
};

module.exports.help = {
  name: 'tweet',
  description: 'Tweet from your Discord client to a Twitter account (if enabled & configured).',
  usage: 'tweet [content]'
};
