'use strict';
const util = require('util');
const {URLSearchParams} = require('url');
const childProcess = require('child_process');

const execFile = util.promisify(childProcess.execFile);

const execute = async (command, args = {}) => {
	const invalidArguments = Object.keys(args).filter(key => !['hours', 'minutes'].includes(key));
	if (invalidArguments.length > 0) {
		throw new Error(`Invalid argument keys: ${invalidArguments.join()}`);
	}

	const searchParams = new URLSearchParams(args);
	await execFile('open', ['-g', `lungo:${command}?${searchParams.toString()}`]);
};

const lungo = module.exports;

lungo.activate = async duration => {
	await execute('activate', duration);
};

lungo.deactivate = async () => {
	await execute('deactivate');
};

lungo.toggle = async duration => {
	await execute('toggle', duration);
};
