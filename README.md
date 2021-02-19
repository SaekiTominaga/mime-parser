# Parsing a MIME type

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fmime-parser.svg)](https://badge.fury.io/js/%40saekitominaga%2Fmime-parser)
[![Build Status](https://www.travis-ci.com/SaekiTominaga/mime-parser.svg)](https://www.travis-ci.com/SaekiTominaga/mime-parser)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/mime-parser/badge.svg)](https://coveralls.io/github/SaekiTominaga/mime-parser)

## Examples

```JavaScript
import MIMEParser from '@saekitominaga/mime-parser';

const mimeParser = new MIMEParser('Text/HTML; Charset=utf-8');
mimeParser.toString(); // 'text/html;charset=utf-8'
mimeParser.getType(); // 'text'
mimeParser.getSubtype(); // 'html'
mimeParser.getEssence(); // 'text/html'
mimeParser.getParameters(); // Map(1) { 'charset' => 'utf-8' }
```

## Constructor

```TypeScript
new MIMEParser(inputMime: string)
```

### Parameters

<dl>
<dt>inputMime</dt>
<dd>MIME type value</dd>
</dl>

## Methods

<dl>
<dt>toString(): string</dt>
<dd>Get the entire serialized <a href="https://mimesniff.spec.whatwg.org/#mime-type">MIME type</a> string.</dd>
<dt>getType(): string</dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#type">type</a> part of MIME.</dd>
<dt>getSubtype(): string</dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#subtype">subtype</a> part of MIME.</dd>
<dt>getEssence(): string</dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#mime-type-essence">essence</a> part (type/subtype) of MIME.</dd>
<dt>getParameters(): Map&lt;string, string&gt;</dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#parameters">parameters</a> part of MIME.</dd>
</dl>
