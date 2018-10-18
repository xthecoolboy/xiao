const Command = require('../../structures/Command');
const pokemon = require('../../assets/json/pokemon-fusion');
const { firstUpperCase } = require('../../util/Util');

module.exports = class PokemonFusionCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pokemon-fusion',
			aliases: ['poke-fusion', 'poke-fuse', 'pokémon-fusion', 'poké-fusion', 'poké-fuse'],
			group: 'image-edit',
			memberName: 'pokemon-fusion',
			description: 'Fuses two Generation I Pokémon together.',
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'body',
					prompt: 'What Pokémon should be fused as the body?',
					type: 'string',
					validate: body => {
						if (pokemon[body.toLowerCase()]) return true;
						return 'Invalid body, only Pokémon from Generation I may be used.';
					},
					parse: body => body.toLowerCase()
				},
				{
					key: 'palette',
					prompt: 'What Pokémon should be fused as the palette?',
					type: 'string',
					validate: palette => {
						if (pokemon[palette.toLowerCase()]) return true;
						return 'Invalid palette, only Pokémon from Generation I may be used.';
					},
					parse: palette => palette.toLowerCase()
				}
			]
		});
	}

	run(msg, { body, palette }) {
		const prefix = body.slice(0, Math.round(body.length / 2));
		const suffix = palette.slice(Math.round(palette.length / 2), palette.length);
		return msg.say(firstUpperCase(`${prefix}${suffix}`), {
			files: [`http://images.alexonsager.net/pokemon/fused/${pokemon[body]}/${pokemon[body]}.${pokemon[palette]}.png`]
		});
	}
};
