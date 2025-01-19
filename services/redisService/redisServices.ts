import { createClient } from "redis";
import { newsDataType } from "../..";
export const redisClient = createClient({
    url: process.env.REDIS_URL
})

export async function getNewsIds(){
    const now = Date.now();
        const twoMinutesAgo = now - 5 * 60 * 1000;
        const newsIds = await redisClient.zRangeByScore('news:latest', twoMinutesAgo, now);
        return newsIds
}

export async function getNewsById(id : string){
    const newsData = await redisClient.hGetAll(`news:${id}`);
    return newsData
}

export async function setRedisNews(news : newsDataType){
    const newsDate =new Date(news.datePublished)
    const timestamp = newsDate.getTime();
    await redisClient.zAdd('news:latest', [{ score: timestamp, value: news.newsid }]);
    await redisClient.hSet(`news:${news.newsid}`, {
        title: news.title,
        pathLink: news.pathLink,
        datePublished: newsDate.toISOString(),
    })
}

export async function isExists(id :string){
    return await redisClient.exists(`news:${id}`)
}

export async function getNewsCount(){
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    const count = await redisClient.zCount('news:latest', fiveMinutesAgo, now);
    return count
}