#!/usr/bin/env node

import { $, os, fs, path, argv } from "zx";

$.stdio = "inherit";

const name = argv?.name;
const extension = argv?.extension || "txt";
const template = argv?.template;
const editor = argv?.editor || "code --wait";

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
