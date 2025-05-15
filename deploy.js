import { S3Client, PutObjectCommand, paginateListObjectsV2, DeleteObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'node:fs';
import path from 'node:path';
import { lookup as lookupType } from 'mime-types';
import { authors, tags } from './src/lib/data.ts';

const client = new S3Client();
const buildPath = './build';
const bucket = process.env.S3_BUCKET;
const deployedKeys = [];



const dispositionFilenames = [
	(key) => key.endsWith('site.rss') ? 'code-butter' : undefined,
	(key) => {
		const matches = key.match(/tags\/([^/]+)/);
		if (matches) {
			return tags[matches[1]];
		}
	},
	(key) => {
		const matches = key.match(/authors\/([^/]+)/);
		if (matches) {
			return authors[matches[1]];
		}
	}
]

function lookupDisposition(key) {
	if (!key.endsWith('.rss')) {
		return undefined;
	}
	for (let i=0; i<dispositionFilenames.length; i++) {
		const filename = dispositionFilenames[i](key);
		if (filename) {
			return `attachment; filename="${filename}.rss"`;
		}
	}
	return `attachment; filename="${path.basename(key)}"`;
}

async function uploadDir(dir, prefix = "") {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			await uploadDir(fullPath, path.join(prefix, file))
			continue;
		}
		const s3Key = path.join(prefix, file);
		deployedKeys.push(s3Key);
		await client.send(new PutObjectCommand({
			Bucket: bucket,
			Key: s3Key,
			Body: fs.createReadStream(fullPath),
			ContentType: lookupType(s3Key) || 'application/octet-stream',
			ContentDisposition: lookupDisposition(s3Key)
		}));
		console.log(`Uploaded ${s3Key}`);
	}
}
await uploadDir(buildPath);

for await (const data of paginateListObjectsV2({ client }, { Bucket: bucket } )) {
	for (const key of data.Contents.map(c => c.Key)) {
		if (!deployedKeys.includes(key)) {
			await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key}));
			console.log(`Deleted ${key}`);
		}
	}
}