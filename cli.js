#!/usr/bin/env node
'use strict';
const meow = require('meow');
const lungo = require('./api');

const cli = meow(`
	Usage
	  $ lungo [command]

	Commands
	  on
	  off
	  toggle

	Options
	  --hours -h    Hours Lungo should be active
	  --minutes -m  Minutes Lungo should be active

	Examples
	  $ lungo on --hours=1 --minutes=10
	  $ lungo on
	  $ lungo off
	  $ lungo toggle --hours=1.5
	  $ lungo

	If you don't specify a duration, it will use the default duration.

	You can also toggle by leaving out the command.
`, {
	flags: {
		hours: {
			type: 'string',
			alias: 'h'
		},
		minutes: {
			type: 'string',
			alias: 'm'
		}
	}
});

let method = cli.input[0];
if (method === 'on') {
	method = 'activate';
} else if (method === 'off') {
	method = 'deactivate';
} else if (method === undefined) {
	method = 'toggle';
}

const options = cli.flags;
delete options.h;
delete options.m;

(async () => {
	await lungo[method](options);
})();
