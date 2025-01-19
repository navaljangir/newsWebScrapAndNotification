import { newsDataType } from "../..";
import db, { RowDataPacket } from "../../db";
import { getNewsById, getNewsCount, getNewsIds } from "../redisService/redisServices";

export const getLatestNews = async () => {
    try {
        const latestNews = [];
        const newsIds = await getNewsIds()
        for (const id of newsIds) {
            const newsData = await getNewsById(id)
            if (newsData && Object.keys(newsData).length > 0) {
                latestNews.push({
                    newsid : id,
                    title: newsData.title,
                    pathLink: newsData.pathLink,
                    datePublished: new Date(newsData.datePublished).toISOString(),
                });
            }
        }
        return latestNews;
    } catch (err) {
        console.error('Falling back to database:', err);
        const news: newsDataType[] = (await db.query('SELECT * FROM news WHERE datePublish >= NOW() - INTERVAL 2 MINUTE ORDER BY datePublish DESC'))[0] as newsDataType[]
        return news
    }
}


export const getNewsCount5Minutes = async () => {
    try {
        const count = await getNewsCount()
        return count;
    } catch (err) {
        console.error('Redis is down, falling back to database:', err);
        const [count] = (await db.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM news WHERE datePublish >= NOW() - INTERVAL 5 MINUTE'));
        console.log(count)
        return Number(count[0].count);
    }
}