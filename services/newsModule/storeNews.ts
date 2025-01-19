import { newsDataType } from "../.."
import db from "../../db"
import { isExists, setRedisNews } from "../redisService/redisServices"

export const storeNews = async (newNews: newsDataType[]) => {
    for (const news of newNews) {
        let exists = 0
        try {
            exists = await isExists(news.newsid)
            if (!exists) {
                const [rows] = await db.execute('SELECT id FROM news WHERE newsid = ?', [news.newsid]);
                if (Array.isArray(rows) && rows.length > 0) {
                    exists = 1;
                }
            }
        } catch (e) {
            console.log('Error while Connecting to redis')
            const [findNews] = await db.execute('SELECT id FROM news WHERE newsid = ?', [news.newsid]);
            if (Array.isArray(findNews) && findNews.length > 0) {
                exists = 1;
            }
        }
        if (exists) {
            continue;
        }
        const newsDate =new Date(news.datePublished)
        await db.execute('INSERT INTO news (newsid, title, pathLink, datePublish) VALUES (?, ?, ?, ?)', [news.newsid, news.title, news.pathLink, newsDate])
        await setRedisNews(news)
    }
}