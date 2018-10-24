import test from 'ava';
import execa from 'execa';

test('main', async t => {
	if (process.env.CI) {
		t.pass();
		return;
	}

	await execa('./cli.js');
	await execa('./cli.js', ['activate']);
	await execa('./cli.js', ['deactivate']);
	await execa('./cli.js', ['toggle']);
	await execa('./cli.js', ['activate', '--hours=1.5']);
	await execa('./cli.js', ['activate', '--hours=1', '--minutes=3']);
	await execa('./cli.js', ['activate', '--minutes=3']);
	t.pass();
});
