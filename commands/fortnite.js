const { RichEmbed } = require('discord.js');
const { red } = require('../config.json');
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