const https = require("https");
const version = require("../package.json").version;
// console.log(version);

class dbnRequest {
    /**
     * Creates dbnRequest Client
     * @param {String} baseAPIUrl BaseAPIURL to use
     * @private
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.baseAPIURL = baseURL + "/api";
        this.version = "1.3.0-dbnRequest";

        /**
         * Creates a GET request
         * @param {String} endpoint API Endpoint to use.
         * @private
         * @returns {Promise<Object>} A Promise containing response
         */
        this.get = (endpoint) => {
            return new Promise((resolve, reject) => {
                const response = {
                    method: "GET",
                    version: "1.3.0-dbnRequest",
                    raw: "",
                    body: null,
                    status: null,
                    headers: null
                };
                const options = {
                    hostname: baseURL,
                    path: `/api/${endpoint}`,
                    method: "GET",
                    headers: {}
                };
                options.headers["user-agent"] = `dbnapi.js/${version}`;
                options.headers["content-type"] = "application/json";
                const request = https.request(options, res => {
                    response.status = res.statusCode;
                    response.headers = res.headers;
                    response.ok = res.statusCode >= 200 && res.statusCode < 300;
                    res.on("data", chunk => {
                        response.raw += chunk;
                    });
                    res.on("end", () => {
                        response.body = res.headers["content-type"].includes("application/json") ? JSON.parse(response.raw) : response.raw;
                        if (response.ok) {
                            resolve(response);
                        } else {
                            if (res.statusCode === 403 && response.body.banned === true) {
                                const bannedErr = new Error(`[dbnAPI] You're Banned from DiscordBots Nation's website, details:\n ${response.body.reason}`);
                                Object.assign(bannedErr, response);
                                reject(bannedErr);
                                return;
                            }
                            const err = new Error(`[dbnAPI] ${res.statusCode} ${res.statusMessage}`);
                            Object.assign(err, response);
                            reject(err);
                        }
                    });
                });

                request.on("error", err => {
                    reject(err);
                });

                request.end();
            });
        };

        /**
         * Creates a POST request
         * @param {String} endpoint API Endpoint to use.
         * @param {String} data Data to send
         * @private
         * @returns {Promise<Object>} A Promise containing response
         */
        this.post = (endpoint, data) => {
            return new Promise((resolve, reject) => {
                const response = {
                    method: "POST",
                    version: "1.3.0-dbnRequest",
                    raw: "",
                    body: null,
                    status: null,
                    headers: null
                };
                const options = {
                    hostname: baseURL,
                    path: `/api/${endpoint}`,
                    method: "POST",
                    headers: {}
                };
                options.headers["user-agent"] = `dbnapi.js/${version}`;
                options.headers["content-type"] = "application/json";
                const request = https.request(options, res => {
                    response.status = res.statusCode;
                    response.headers = res.headers;
                    response.ok = res.statusCode >= 200 && res.statusCode < 300;
                    res.on("data", chunk => {
                        response.raw += chunk;
                    });
                    res.on("end", () => {
                        if (typeof res.headers["content-type"] === "string" && res.headers["content-type"].includes("application/json")) {
                            response.body = JSON.parse(response.raw);
                        }
                        // response.body = res.headers["content-type"].includes("application/json") ? JSON.parse(response.raw) : response.raw;
                        if (response.ok) {
                            resolve(response);
                        } else {
                            if (res.statusCode === 403 && response.body.banned === true) {
                                const bannedErr = new Error(`[dbnAPI] You're Banned from DiscordBots Nation's website, details:\n ${response.body.reason}`);
                                Object.assign(bannedErr, response);
                                reject(bannedErr);
                                return;
                            }
                            const err = new Error(`[dbnAPI] ${res.statusCode} ${res.statusMessage}`);
                            Object.assign(err, response);
                            reject(err);
                        }
                    });
                });
                request.on("error", err => {
                    reject(err);
                });

                request.write(JSON.stringify(data));
                request.end();
            });
        };
    }
}

module.exports = dbnRequest;