const axios = require("axios");
const logger = require("../log")(module);
const path = require("path");
const fs = require("fs");
const os = require("os");

const isIp = require("is-ip");
const isDomainName = require("is-domain-name");
const isEmailLike = require("is-email-like");

const senderscore = require("sendos-tools-senderscore");
const abusenet = require("sendos-tools-abusenet");
const validateMail = require("sendos-tools-validate");
const lookupBl = require("sendos-tools-dnsbl");
const smtpCheck = require("sendos-tools-smtp");

const maxmind = require("maxmind");
const prettyMs = require("pretty-ms");
const prettyBytes = require("pretty-bytes");

exports.dnsbl = (req, res) => {
    if (isDomainName(req.params.data) || isIp.v4(req.params.data)) {
        let dnsbl = new lookupBl.check(req.params.data, false, [
            "127.0.0.1:10053"
        ]); // check, dnsbl, uribl
        let resultRbl = [];

        dnsbl.on("error", function(error, blocklist) {
            console.log(error);
        });

        dnsbl.on("data", function(result, blocklist) {
            resultRbl.push(result);
        });

        dnsbl.on("done", function() {
            res.send(resultRbl);
        });
    } else {
        res.status(400).send({
            error: "Invalid domain or IP"
        });
    }

    logger.info("%s %d", req.method, res.statusCode);
};

exports.abuse = (req, res) => {
    if (isDomainName(req.params.data)) {
        var opts = {
            timeout: 10000,
            server: "127.0.0.1",
            port: 10053
        };

        abusenet
            .lookup(req.params.data, opts)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    } else {
        res.status(400).send({
            error: "Invalid domain"
        });
    }

    logger.info("%s %d", req.method, res.statusCode);
};

exports.score = (req, res) => {
    if (isIp.v4(req.params.data)) {
        var opts = {
            timeout: 10000,
            server: "127.0.0.1",
            port: 10053
        };

        senderscore
            .lookup(req.params.data, opts)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    } else {
        res.status(400).send({
            error: "Invalid IP"
        });
    }

    logger.info("%s %d", req.method, res.statusCode);
};

exports.smtp = (req, res) => {
    if (isDomainName(req.params.data) || isEmailLike(req.params.data)) {
        smtpCheck
            .check(req.params.data)
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).send({ error: "Some error occurred" });  
            });
    } else {
        res.status(400).send({
            error: "Invalid domain or email"
        });
    }

    logger.info("%s %d", req.method, res.statusCode);
};

exports.domain = (req, res) => {
    if (isDomainName(req.params.data)) {
    } else {
        res.status(400).send({
            error: "Invalid domain"
        });
    }

    logger.info("%s %d", req.method, res.statusCode);
};

exports.validate = (req, res) => {
    validateMail
        .isValid(req.params.data)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send({ error: "Some error occurred" });
        });

    logger.info("%s %d", req.method, res.statusCode);
};

exports.geo = (req, res) => {
    maxmind.open(
        "/root/api/app/utils/geo/GeoLite2-City.mmdb",
        (err, cityLookup) => {
            if (err) res.status(500).send({ error: "Some error occurred" });
            var city = cityLookup.get(req.params.data);
            res.send(city);
        }
    );

    logger.info("%s %d", req.method, res.statusCode);
};

exports.sysinfo = (req, res) => {
    const info = {
        cpus: os.cpus(),
        freemem: prettyBytes(os.freemem()),
        totalmem: prettyBytes(os.totalmem()),
        loadavg: os.loadavg(),
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        uptime: prettyMs(os.uptime() * 1000)
    };

    res.send(JSON.stringify(info, null, 2));

    logger.info("%s %d", req.method, res.statusCode);
};