#!/usr/bin/env node
import meow from 'meow';
import lungo from './api.js';

const cli = meow(`
	Usage
	  $ lungo [command]

	Commands
	  on
	  off
	  toggle
	  is-active

	Options
	  --hours -h    Hours Lungo should be active
	  --minutes -m  Minutes Lungo should be active

	Examples
	  $ lungo on --hours=1 --minutes=10
	  $ lungo on
	  $ lungo off
	  $ lungo toggle --hours=1.5
	  $ lungo

	  $ lungo is-active
	  true

	If you don't specify a duration, it will use the default duration.

	You can also toggle by leaving out the command.
`, {
	importMeta: import.meta,
	flags: {
		hours: {
			type: 'string',
			alias: 'h',
		},
		minutes: {
			type: 'string',
			alias: 'm',
		},
	},
});

let method = cli.input[0];
switch (method) {
	case 'on': {
		method = 'activate';

		break;
	}

	case 'off': {
		method = 'deactivate';

		break;
	}

	case 'is-active': {
		method = 'isActive';

		break;
	}

	case undefined: {
		method = 'toggle';

		break;
	}

	// No default
}

const options = cli.flags;
delete options.h;
delete options.m;

const returnValue = await lungo[method](options);
if (returnValue !== undefined) {
	console.log(returnValue);
}
