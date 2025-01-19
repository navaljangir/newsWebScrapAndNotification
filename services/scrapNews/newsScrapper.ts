import puppeteer from "puppeteer";
export const scrapNews = async () => {
    try {
        const browser = await puppeteer.launch({
            headless : true,
            defaultViewport : null,
            userDataDir : './tmp', 
            args: ['--no-sandbox', '--disable-setuid-sandbox' , '--disable-dev-shm-usage']
            });
        const page = await browser.newPage();
        await page.goto('https://news.ycombinator.com/newest');

        const newsData = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.athing')).map((el) => ({
                newsid: el.getAttribute('id') || '',
                title: el.querySelector('.titleline')?.textContent || '',
                pathLink: el.querySelector('.titleline a')?.getAttribute('href') || '',
                datePublished: el.nextElementSibling?.querySelector('.age')?.getAttribute('title')?.split(' ')[0] + 'Z' || '',
            }));
        });

        await browser.close();
        return newsData;
    } catch (err) {
        console.error("Error in scraping news:", err);
        throw new Error("Failed to scrape news data.");
    }
}