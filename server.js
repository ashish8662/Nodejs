const http = require("http")
const rss = require('./rss.js')
const express = require('express');
const { json } = require("express/lib/response");
const app = express();
let port = 5000;

app.use(express.json());

app.get('/', async (request, response) => {
    const feedUrl = `https://www.cnbc.com/id/100727362/device/rss/rss.html`;
   
    rss.getRssFeed(feedUrl).then((feed) => {
        let arr=[];
        feed.items.slice(0, 5).forEach(function (entry) {
            entry = JSON.stringify(entry);
            arr.push(entry);
        })
        response.write(`${arr}`)
        response.end()
    })
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});