import express from 'express'
import WebSocket, { WebSocketServer } from "ws";
import cron from 'node-cron'
import { scrapNews } from "./services/scrapNews/newsScrapper";
import { getLatestNews, getNewsCount5Minutes } from "./services/newsModule/getLatestNews";
import { redisClient } from "./services/redisService/redisServices";
import { storeNews } from "./services/newsModule/storeNews";

const app = express()
const port = process.env.PORT
console.log('port' , process.env.PORT)
const server = app.listen(3000, () => {
    console.log(`app running on http://localhost:3000`)
})

const wss = new WebSocketServer({ server })

const sockets = new Set<WebSocket>();
wss.on('connection', async(ws) => {
    sockets.add(ws)
    ws.on('error', console.error)
    const count = await getNewsCount5Minutes()
    ws.send('Connected')
    ws.send(count)
    ws.on('close', () => {
        sockets.delete(ws)
    })
})

export interface newsDataType {
    newsid: string
    title: string
    pathLink: string
    datePublished: string
}


const scrappingNews = async () => {
    const fetchedNews = await scrapNews()
    await storeNews(fetchedNews)
    const latestNews = await getLatestNews()
    sockets.forEach(ws => {
        ws.send(JSON.stringify(latestNews))
    })
}


const main = async () => {
    await redisClient.connect()
    await scrappingNews()
    cron.schedule('*/2 * * * *', async () => {
        console.log('Scrapping...')
        await scrappingNews()
    })
}

main()