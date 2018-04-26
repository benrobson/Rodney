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
Score/Kills: ${data.solo.score}/${data.solo.kills}
KD: ${data.solo.kills}
Scores/Kills Per Match: ${data.solo.kills_per_match}/${data.solo.score_per_match}
Matches/Wins: ${data.solo.matches}/${data.solo.wins}
Top 3s: ${data.solo.top_3}
Top 5s: ${data.solo.top_5}
Top 6s: ${data.solo.top_6}
Top 12s: ${data.solo.top_12}
Top 25s: ${data.solo.top25} 

Duo Info
---------------
Score/Kills: ${data.duo.score}/${data.duo.kills}
KD: ${data.duo.kills}
Scores/Kills Per Match: ${data.duo.kills_per_match}/${data.duo.score_per_match}
Matches/Wins: ${data.duo.matches}/${data.duo.wins}
Top 3s: ${data.duo.top_3}
Top 5s: ${data.duo.top_5}
Top 6s: ${data.duo.top_6}
Top 12s: ${data.duo.top_12}
Top 25s: ${data.duo.top25}

Squad Info
---------------
Score/Kills: ${data.squad.score}/${data.squad.kills}
KD: ${data.squad.kills}
Scores/Kills Per Match: ${data.squad.kills_per_match}/${data.squad.score_per_match}
Matches/Wins: ${data.squad.matches}/${data.squad.wins}
Top 3s: ${data.squad.top_3}
Top 5s: ${data.squad.top_5}
Top 6s: ${data.squad.top_6}
Top 12s: ${data.squad.top_12}
Top 25s: ${data.squad.top25} 
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