const { RichEmbed } = require('discord.js');
const { red, purple, yellow } = require('../config.json');
const { fortniteapi } = require('../token.json');
const { Client } = require('fortnite');
const config = require('../config.json');
const stats = new Client(fortniteapi);
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args, tools) => {
	if (args[0] === undefined || args[1] === undefined) {
		const embed = new RichEmbed()
			.setTitle(`:warning: Error :warning:`)
			.setColor(red)
			.setDescription(`Please include a platform and username in your arguments.`)
		return message.channel.send(embed)
	} else if (/(pc|xbl|psn)/.test(args[0].toLowerCase()) === false) {
		return errors.invalidPlatform(message);
	} else {
		const platform = args[0].toLowerCase().match(/(pc|xbl|psn)/)[0];
		const username = args.slice(1).join(' ');

		const embed = new RichEmbed()
			.setTitle('Known Bug')
			.setColor(yellow)
			.setDescription('There is a known bug that some of the fields are incorrect.\nUse the hyperlink to goto your Fortnite Tracker profile.')
		message.channel.send(embed);

		try {
			const data = await stats.user(username, platform);
			const embed = new RichEmbed()
				.setTitle(`Stats of ${data.username} | Platform: ${data.platform}`)
				.setColor(purple)
				.setURL(data.url)
				.setThumbnail('https://d1u5p3l4wpay3k.cloudfront.net/fortnite_gamepedia/6/64/Favicon.ico')
				.addField('Solo Info', `Score/Kills: ${data.stats.solo.score}/${data.stats.solo.kills}\nKD: ${data.stats.solo.kills}\nMatches/Wins: ${data.stats.solo.matches}/${data.stats.solo.wins}\nTop 3s: ${data.stats.solo.top_3}\nTop 5s: ${data.stats.solo.top_5}\nTop 6s: ${data.stats.solo.top_6}\nTop 12s: ${data.stats.solo.top_12}\nTop 25s: ${data.stats.solo.top_25}`)
				.addField('Duo Info', `Score/Kills: ${data.stats.duo.score}/${data.stats.duo.kills}\nKD: ${data.stats.duo.kills}\nScores/Kills Per Match: ${data.stats.duo.kills_per_match}/${data.stats.duo.score_per_match}\nMatches/Wins: ${data.stats.duo.matches}/${data.stats.duo.wins}\nTop 3s: ${data.stats.duo.top_3}\nTop 5s: ${data.stats.duo.top_5}\nTop 6s: ${data.stats.duo.top_6}\nTop 12s: ${data.stats.duo.top_12}\nTop 25s: ${data.stats.duo.top_25}`)
				.addField('Squad Info', `Score/Kills: ${data.stats.squad.score}/${data.stats.squad.kills}\nKD: ${data.stats.squad.kills}\nScores/Kills Per Match: ${data.stats.squad.kills_per_match}/${data.stats.squad.score_per_match}\nMatches/Wins: ${data.stats.squad.matches}/${data.stats.squad.wins}\nTop 3s: ${data.stats.squad.top_3}\nTop 5s: ${data.stats.squad.top_5}\nTop 6s: ${data.stats.squad.top_6}\nTop 12s: ${data.stats.squad.top_12}\nTop 25s: ${data.stats.squad.top_25}`)
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
