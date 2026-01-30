#!/usr/bin/env node

// >> $ ./index.js
// >> $ ./index.js | cat

// >> $ ./index.js --extension "md"
// >> $ ./index.js --name "example.md"
// >> $ ./index.js --template ./template.txt
// >> $ ./index.js --editor "vim"

import { $, os, fs, path, minimist } from "zx";

$.stdio = "inherit";

const args = minimist(process.argv.slice(2));
const name = args.name;
const extension = args.extension || "txt";
const template = args.template;
const editor = args.editor || "code --wait";

let tempFilePath = "";
if (name) {
	tempFilePath = path.join(os.tmpdir(), `${name}`);
} else {
	tempFilePath = path.join(os.tmpdir(), `tempedit-${Date.now()}.${extension}`);
}

if (tempFilePath) {
	tempFilePath = tempFilePath.replace(/\\/g, "/");
} else {
	process.exit(1);
}

// let tempFilePath = path.join(os.tmpdir(), `tempedit-${Date.now()}.${extension}`);
// tempFilePath = tempFilePath.replace(/\\/g, "/");
// console.log(tempFilePath);
// process.exit();

try {
	let initialContent = "";
	if (template) {
		const templatePath = path.resolve(template);
		if (fs.pathExistsSync(templatePath)) {
			initialContent = fs.readFileSync(templatePath, "utf8");
		}
	}

	fs.writeFileSync(tempFilePath, initialContent);

	const editorParts = editor.split(" ");
	// console.log(editorParts);

	await $`${editorParts} ${tempFilePath}`;

	const result = fs.readFileSync(tempFilePath, "utf8");
	console.log(result);
} catch (err) {
	console.error(`Error: ${err.message}`);
	process.exit(1);
} finally {
	if (fs.pathExistsSync(tempFilePath)) {
		fs.removeSync(tempFilePath);
	}
}
