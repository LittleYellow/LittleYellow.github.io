import { readdir, readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
const errors = [];
async function walk(dir) { const out=[]; for (const item of await readdir(dir,{withFileTypes:true})) {const p=join(dir,item.name); if(item.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files = await walk(root);
const html = files.filter(p=>p.endsWith('.html'));
for (const file of html) {
  const text = await readFile(file,'utf8');
  assert.match(text,/<html lang="zh-Hant-TW">/,file);
  assert.match(text,/<title>[^<]+<\/title>/,file);
  assert.match(text,/<meta name="description" content="[^"]+"/,file);
  assert.match(text,/<link rel="canonical" href="https:\/\/littleyellow.github.io\//,file);
  const ids = new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href=match[1];
    if(href.startsWith('#')) {if(href.length>1&&!ids.has(decodeURIComponent(href.slice(1))))errors.push(file+': missing anchor '+href);continue;}
    if(!href.startsWith('/')||href.startsWith('//'))continue;
    const url = new URL(href.replaceAll('&amp;','&'),'https://littleyellow.github.io');
    let target=join(root,decodeURIComponent(url.pathname));
    if(url.pathname.endsWith('/'))target=join(target,'index.html');
    try {await access(target);if(url.hash&&target.endsWith('.html')){const targetText=await readFile(target,'utf8');if(!targetText.includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'))errors.push(file+': missing target anchor '+href);}}catch{errors.push(file+': broken link '+href);}
  }
}
for (const route of ['index.html','posts/index.html','enterprise-ai/index.html','about/index.html','404.html','rss.xml','sitemap-index.xml','robots.txt','images/og-cover.png']) await access(join(root,route));
const postSources = await Promise.all((await walk(resolve('src/content/posts'))).filter(p=>p.endsWith('.md')).map(p=>readFile(p,'utf8')));
const publishedCount = postSources.filter(p=>!/^draft:\s*true\s*$/m.test(p.split('---')[1] || '')).length;
assert.equal(html.length,5+publishedCount,'Expected core pages plus published articles');
const rss=await readFile(join(root,'rss.xml'),'utf8');
assert.equal((rss.match(/<item>/g)||[]).length,publishedCount,'RSS should contain published articles');
assert.equal(errors.length,0,errors.join('\n'));
console.log('Verified '+html.length+' HTML pages: local links, anchors, metadata, RSS, sitemap and social image.');
