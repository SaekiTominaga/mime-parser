import MIMEParser from '../src/MIMEParser';

describe('パラメーターなし', () => {
	const mimeParser = new MIMEParser('text/html');

	test('type', () => {
		expect(mimeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		expect(mimeParser.getParameters().size).toBe(0);
	});
	test('MIME', () => {
		expect(mimeParser.toString()).toBe('text/html');
	});
});

describe('パラメーターあり', () => {
	const mimeParser = new MIMEParser('text/html; charset=utf-8');

	test('type', () => {
		expect(mimeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		const parameters = new Map();
		parameters.set('charset', 'utf-8');
		expect(mimeParser.getParameters()).toEqual(parameters);
	});
	test('MIME', () => {
		expect(mimeParser.toString()).toBe('text/html;charset=utf-8');
	});
});

describe('パラメーター複数', () => {
	const mimeParser = new MIMEParser('TEXT/HTML ; CHARSET=UTF-8; foo=hoge;bar="piyo\\@" ; baz=;qux; charset=shift_jis ; ');

	test('type', () => {
		expect(mimeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		const parameters = new Map();
		parameters.set('charset', 'UTF-8');
		parameters.set('foo', 'hoge');
		parameters.set('bar', 'piyo@');
		expect(mimeParser.getParameters()).toEqual(parameters);
	});
	test('MIME', () => {
		expect(mimeParser.toString()).toBe('text/html;charset=UTF-8;foo=hoge;bar="piyo@"');
	});
});

describe('invalid', () => {
	test('/ なし', () => {
		expect(() => {
			new MIMEParser('text');
		}).toThrow('The specified string does not contain a slash.');
	});

	test('/ のみ', () => {
		expect(() => {
			new MIMEParser('/');
		}).toThrow('The `type` is the empty string.');
	});

	test('type なし', () => {
		expect(() => {
			new MIMEParser('/html; charset=utf-8');
		}).toThrow('The `type` is the empty string.');
	});

	test('type に不正な文字列', () => {
		expect(() => {
			new MIMEParser('text@/html; charset=utf-8');
		}).toThrow('The `type` contains an invalid string.');
	});

	test('subtype なし', () => {
		expect(() => {
			new MIMEParser('text/');
		}).toThrow('The `subtype` is the empty string.');
	});

	test('subtype に不正な文字列', () => {
		expect(() => {
			new MIMEParser('text/html@; charset=utf-8');
		}).toThrow('The `subtype` contains an invalid string.');
	});
});

describe('HTTP quoted string', () => {

	test('1', () => {
		const mimeParser = new MIMEParser('*/*; foo="\\');
		expect(mimeParser.getParameters().get('foo')).toBe('\\');
	});
	test('2', () => {
		const mimeParser = new MIMEParser('*/*; foo="Hello" World');
		expect(mimeParser.getParameters().get('foo')).toBe('Hello');
	});
	test('3', () => {
		const mimeParser = new MIMEParser('*/*; foo="Hello \\\\ World\\""');
		expect(mimeParser.getParameters().get('foo')).toBe('Hello \\ World"');
	});
});
