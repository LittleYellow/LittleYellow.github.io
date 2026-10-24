import rss from '@astrojs/rss';
import { publishedPosts } from '../lib/posts';
export async function GET(context: { site: URL }) {
  return rss({ title: '小黃｜黃柴值班中', description: '企業 AI、工程實務與值班日常。嘴上吐槽，手上解題。', site: context.site,
    items: (await publishedPosts()).map(p => ({title:p.data.title,description:p.data.description,pubDate:p.data.date,link:'/posts/'+p.id+'/'})),
    customData: '<language>zh-TW</language>' });
}
