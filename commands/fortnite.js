const { RichEmbed } = require('discord.js');
const { red, purple, yellow } = require('../config.json');
const { fortniteapi } = require('../token.json');
const { Client } = require('fortnite');
const config = require('../config.json');
const stats = new Client(fortniteapi);
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args, tools) => {
	if (args == 'help') {
    let embed = new Discord.RichEmbed()
    .setTitle(`${module.exports.help.name} Command Information`)
    .setDescription(`${module.exports.help.description}`)
    .addField('Usage', `${config.prefix}${module.exports.help.usage}`, true)
    .setColor(config.cyan)
    message.channel.send(embed);
    return
  };

	if (fortniteapi === 'API KEY') return errors.noAPIKey(message);
	if (args[0] === undefined || args[1] === undefined) {
		return errors.invalidPlatform(message);
	} else if (/(pc|xbl|psn)/.test(args[0].toLowerCase()) === false) {
		return errors.invalidPlatform(message);
	} else {
		const platform = args[0].toLowerCase().match(/(pc|xbl|psn)/)[0];
		const username = args.slice(1).join(' ');

		try {
			const data = await stats.user(username, platform);
			const embed = new RichEmbed()
				.setTitle(`Stats of ${data.username} | Platform: ${data.platform}`)
				.setColor(purple)
				.setURL(data.url)
				.setThumbnail('https://d1u5p3l4wpay3k.cloudfront.net/fortnite_gamepedia/6/64/Favicon.ico')
				.addField('Solo Info', formatInfo(data, 'solo'))
				.addField('Duo Info', formatInfo(data, 'duo'))
				.addField('Squad Info', formatInfo(data, 'squad'))
			return message.channel.send(embed);
		} catch (error) {
			console.log(error);
			return errors.invalidUser(message);
		}
	}
};

module.exports.help = {
	name: 'fortnite',
	description: 'Displays stats for a user on the game Fortnite.',
	usage: 'fortnite [pc | xbl | psn] [username]'
};


/**
 * Format info for the mode
 * @param {Object} data Fortnite data object
 * @param {string} mode solo, duo, or squad
 */
function formatInfo(data, mode) {
	return `Matches: ${data.stats[mode].matches}
Kills: ${data.stats[mode].kills}
Score: ${data.stats[mode].score}
Score/Kills: ${Math.round(data.stats[mode].score/data.stats[mode].kills)}
Score/Match: ${Math.round(data.stats[mode].score_per_match)}
Score/Kills Per Match: ${Math.round(data.stats[mode].score_per_match/data.stats[mode].kills)}
K/D: ${data.stats[mode].kd}
Wins: ${data.stats[mode].wins}
Top 3s: ${data.stats[mode].top_3}
Top 5s: ${data.stats[mode].top_5}
Top 6s: ${data.stats[mode].top_6}
Top 12s: ${data.stats[mode].top_12}
Top 25s: ${data.stats[mode].top_25}`;
}
