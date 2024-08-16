import {promisify} from 'node:util';
import childProcess from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';

const execFile = promisify(childProcess.execFile);

const execute = async (command, arguments_ = {}) => {
	const invalidArguments = Object.keys(arguments_).filter(key => !['hours', 'minutes'].includes(key));
	if (invalidArguments.length > 0) {
		throw new Error(`Invalid argument keys: ${invalidArguments.join(',')}`);
	}

	const searchParameters = new URLSearchParams(arguments_);
	await execFile('open', ['--background', `lungo:${command}?${searchParameters.toString()}`]);
};

const lungo = {};

lungo.activate = async duration => {
	await execute('activate', duration);
};

lungo.deactivate = async () => {
	await execute('deactivate');
};

lungo.toggle = async duration => {
	await execute('toggle', duration);
};

lungo.isActive = async () => {
	const directory = temporaryDirectory();

	// TODO: Find a way to use `/dev/stdout` as the `--output-path`

	// We use `execa` to be able to ignore `stdin` which prevents a hang.
	await execa('shortcuts', ['run', 'Is Lungo Active', '--output-path', directory], {stdio: 'ignore'});

	return fs.existsSync(path.join(directory, 'Yes.txt'));
};

export default lungo;
