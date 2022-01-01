import {promisify} from 'node:util';
import childProcess from 'node:child_process';

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

export default lungo;
