const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('http://localhost:8000/index.html', {waitUntil: 'networkidle2'});
    const data = await page.evaluate(() => {
        const btns = document.querySelector('.hero-btns');
        if (!btns) return 'No .hero-btns found';
        const rect = btns.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(btns);
        const children = Array.from(btns.children).map(c => {
            const r = c.getBoundingClientRect();
            const s = window.getComputedStyle(c);
            return { tag: c.tagName, opacity: s.opacity, x: r.x, y: r.y, w: r.width, h: r.height };
        });
        return { display: computedStyle.display, opacity: computedStyle.opacity, rect, children };
    });
    console.log(JSON.stringify(data, null, 2));
    await browser.close();
})();
