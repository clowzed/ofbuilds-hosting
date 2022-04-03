require("dotenv").config()

const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

const storage_path = path.resolve(process.env.STORAGE_PATH || './storage');

if (!fs.existsSync(storage_path)) { fs.mkdirSync(storage_path) }

const available_paltforms = fs.readdirSync(storage_path).map((filepath) => { path.basename(filepath).replace('tar.gz').split("__")[1] })
const available_versions = fs.readdirSync(storage_path).map((filepath) => { path.basename(filepath).replace('tar.gz').split("__")[0] })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    console.log("[🔗] url: " + req.originalUrl + " method: " + req.method)
    try {
        next()
    } catch {
        console.log("[❌ ] Error occured! Message: " + err.message)
        res.status(500).send(err.message)
    }
    console.log("[✈️ ] response status: " + res.statusCode)

})

app.get('/versions', (req, res) => {
    res.send({ 'versions': available_versions });
});

app.get('/platforms', (req, res) => {
    res.send({ 'platforms': available_paltforms });
});

app.get('/:version/:platform', (req, res) => {
    console.log(`[✔️ ] Request for platform: ${req.params.platform}, version: ${req.params.version}`);

    let filepath = storage_path + `/${req.params.version}__${req.params.platform}.tar.gz`;

    if (!fs.existsSync(filepath)) {
        res.sendStatus(404);
    } else {
        res.sendFile(filepath);
    }
});

app.listen(process.env.HOSTING_LISTENING_PORT || '5000', () => {
    console.info("[✔️ ] App listening on port " + process.env.HOSTING_LISTENING_PORT)
});