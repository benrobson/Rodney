const twit = require('twit');
const errors = require('../util/errors.js');
const token = require('../token.json');

module.exports.run = async (client, message, args) => {
  if (!config.tweetcommand) return

  // Twitter API Credentials & Information
  const twitter = new twit ({
    consumer_key: `${token.consumer_key}`,
    consumer_secret: `${token.consumer_secret}`,
    access_token: `${token.access_token}`,
    access_token_secret: `${token.access_token_secret}`,
    timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
  });

  let tweetchannel = message.guild.channels.find('name', 'tweet');
  if (!tweetchannel) return errors.noTweetChannel(message);

  if (message.channel === tweetchannel) {
    let inputmessage = args.join(' ');
    if (!inputmessage) return errors.emptyMessage(message);
    if (message.channel === tweetchannel)
      twitter.post('statuses/update', { status: `${inputmessage}` }, function(err, data, response) {
          console.log('Tweet Successfully Tweeted!');
          console.log(`${message.author.username} has just Tweeted "${inputmessage}"`);
      })} else {
        let inputmessage = args.join(' ');
        return errors.incorrectChannel(message);
      };
};

module.exports.help = {
  name: 'tweet',
  usage: 'tweet [message]'
};
