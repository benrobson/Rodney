const { RichEmbed } = require('discord.js');
const { red, purple } = require('../config.json');
const { fortniteapi } = require('../token.json');
const { Client } = require('fortnite');
const stats = new Client(fortniteapi);

module.exports.run = async (client, message, args, tools) => {
	if (args[0] === undefined || args[1] === undefined) {
		const embed = new RichEmbed()
			.setTitle(`:warning: Error :warning:`)
			.setColor(red)
			.setDescription(`Please include a platform and username in your arguments.`)
		return message.channel.send(embed)
	} else if (/(pc|xbl|psn)/.test(args[0].toLowerCase()) === false) {
		const embed = new RichEmbed()
			.setTitle(`:warning: Error :warning:`)
			.setColor(red)
			.setDescription(`Invalid platform, try using PC, XBL, or PSN`)
		return message.channel.send(embed);
	} else {
		const platform = args[0].toLowerCase().match(/(pc|xbl|psn)/)[0];
		const username = args.slice(1).join(' ');

		try {
			const data = await stats.user(username, platform);
			const embed = new RichEmbed()
				.setTitle(`Stats of ${data.username} | Platform: ${data.platform}`)
				.setURL(data.url)
				.setThumbnail('https://d1u5p3l4wpay3k.cloudfront.net/fortnite_gamepedia/6/64/Favicon.ico')
				.setDescription(`
Solo Info
---------------
Score/Kills: ${data.stats.solo.score}/${data.stats.solo.kills}
KD: ${data.stats.solo.kills}
Scores/Kills Per Match: ${data.stats.solo.kills_per_match}/${data.stats.solo.score_per_match}
Matches/Wins: ${data.stats.solo.matches}/${data.stats.solo.wins}
Top 3s: ${data.stats.solo.top_3}
Top 5s: ${data.stats.solo.top_5}
Top 6s: ${data.stats.solo.top_6}
Top 12s: ${data.stats.solo.top_12}
Top 25s: ${data.stats.solo.top25} 

Duo Info
---------------
Score/Kills: ${data.stats.duo.score}/${data.stats.duo.kills}
KD: ${data.stats.duo.kills}
Scores/Kills Per Match: ${data.stats.duo.kills_per_match}/${data.stats.duo.score_per_match}
Matches/Wins: ${data.stats.duo.matches}/${data.stats.duo.wins}
Top 3s: ${data.stats.duo.top_3}
Top 5s: ${data.stats.duo.top_5}
Top 6s: ${data.stats.duo.top_6}
Top 12s: ${data.stats.duo.top_12}
Top 25s: ${data.stats.duo.top25}

Squad Info
---------------
Score/Kills: ${data.stats.squad.score}/${data.stats.squad.kills}
KD: ${data.stats.squad.kills}
Scores/Kills Per Match: ${data.stats.squad.kills_per_match}/${data.stats.squad.score_per_match}
Matches/Wins: ${data.stats.squad.matches}/${data.stats.squad.wins}
Top 3s: ${data.stats.squad.top_3}
Top 5s: ${data.stats.squad.top_5}
Top 6s: ${data.stats.squad.top_6}
Top 12s: ${data.stats.squad.top_12}
Top 25s: ${data.stats.squad.top25} 
				`)
				.setColor(purple)
			return message.channel.send(embed);
		} catch (error) {
			return message.reply(`Invalid User...`);
		}
	}
};

module.exports.help = {
	name: 'fortnite',
	description: 'Displays stats for a user on the game Fortnite.',
	usage: 'fortnite [pc | xbl | psn] [username]'
};