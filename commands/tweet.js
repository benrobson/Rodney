const twit = require('twit');
const errors = require('../util/errors.js');
const config = require('../config.json');
const token = require('../token.json');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (!config.tweetcommand) return

  // Twitter API Credentials & Information
  const twitter = new twit ({
    consumer_key: `${token.consumer_key}`,
    consumer_secret: `${token.consumer_secret}`,
    access_token: `${token.access_token}`,
    access_token_secret: `${token.access_token_secret}`,
    timeout_ms: 60*1000
  });

  let tweetchannel = message.guild.channels.find('name', 'tweet');
  if (!tweetchannel) return errors.noTweetChannel(message);

  if (message.channel === tweetchannel) {
    let inputmessage = args.join(' ');
    if (!inputmessage) return errors.emptyMessage(message);
    if (message.channel === tweetchannel)

    twitter.post('statuses/update', { status: `${inputmessage}` }, function (err, data, response) {
      console.log(`[${message.guild}] ${message.author.username} has tweeted "${inputmessage}"`);

      let embed = new Discord.RichEmbed()
      .setTitle('Tweet Successfully Tweeted!')
      .setColor(config.green)
      .addField('Message Content', `${inputmessage}`)
      .addField('Tweeted By', `${message.author.username}`)
      message.channel.send(embed);
    })} else {
      let inputmessage = args.join(' ');
      return errors.incorrectChannel(message);
    };
};

module.exports.help = {
  name: 'tweet',
  description: 'Tweet from your Discord client to a Twitter account (if configured).',
  usage: 'tweet [message]'
};
