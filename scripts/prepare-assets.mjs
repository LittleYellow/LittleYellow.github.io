import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('public/images', {recursive:true});
const input='docs/mascot-source.png';
await sharp(input).resize(760,720,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:88}).toFile('public/images/shiba.webp');
const metadata=await sharp(input).metadata();
const crop={left:Math.round(metadata.width*.25),top:0,width:Math.round(metadata.width*.64),height:Math.round(metadata.height*.57)};
await sharp(input).extract(crop).resize(160,160,{fit:'cover'}).webp({quality:88}).toFile('public/images/shiba-avatar.webp');
await sharp(input).extract(crop).resize(64,64,{fit:'cover'}).png().toFile('public/favicon.png');
const bg=Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#fff9ee"/><circle cx="950" cy="310" r="245" fill="#f3e3bd"/><path d="M60 506h610" stroke="#e8b455" stroke-width="18"/><g fill="#34383f" font-family="Microsoft JhengHei,Arial,sans-serif"><text x="65" y="94" font-size="24" font-weight="700">小黃｜黃柴值班中</text><text x="60" y="260" font-size="76" font-weight="900">嘴上吐槽，</text><text x="60" y="365" font-size="76" font-weight="900">手上解題。</text><text x="65" y="446" font-size="26">企業 AI・工程實務・值班日常</text><text x="65" y="574" font-size="17">LITTLEYELLOW.GITHUB.IO</text></g></svg>`);
const mascot=await sharp(input).resize(540,540,{fit:'inside'}).toBuffer();
await sharp(bg).composite([{input:mascot,left:660,top:55}]).png().toFile('public/images/og-cover.png');

console.log('Optimized mascot, avatar, favicon and 1200×630 social cover.');
