const reqEvent = (event) => require(`../events/${event}`)

module.exports = (client) => {
	client.on('ready', () => reqEvent('ready')(client));
	client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
	client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
	client.on('channelCreate', reqEvent('channelCreate'));
	client.on('channelDelete', reqEvent('channelDelete'));
	client.on('messageDelete', reqEvent('messageDelete'));
	client.on('guildCreate', reqEvent('guildCreate'));
	client.on('guildDelete', reqEvent('guildDelete'));
	client.on('messageUpdate', reqEvent('messageUpdate'));
};