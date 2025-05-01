import { S3Client, PutObjectCommand, paginateListObjectsV2, DeleteObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'node:fs';
import path from 'node:path';
import { lookup } from 'mime-types';

const client = new S3Client();
const buildPath = './build';
const bucket = process.env.S3_BUCKET;
const deployedKeys = [];

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
			ContentType: lookup(s3Key) || 'application/octet-stream',
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