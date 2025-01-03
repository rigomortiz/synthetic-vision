import path from 'path';
import fs from 'fs';

export default function handler(req: any, res: any) {
	const { fileName } = req.query;
	if (!fileName) {
		res.status(400).send('File name is required');
		return;
	}

	const filePath = path.resolve('.', 'public/scripts', fileName);
	if (!fs.existsSync(filePath)) {
		res.status(404).send('File not found');
		return;
	}

	const fileContents = fs.readFileSync(filePath, 'utf8');
	res.setHeader('Content-Type', 'application/javascript');
	res.status(200).send(fileContents);
}