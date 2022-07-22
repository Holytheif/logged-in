"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var user_1 = require("./model/user");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({ path: "./config.env" });
var app = (0, express_1["default"])();
var port = 8000;
var url = process.env.URL;
var token_key = process.env.TOKEN_KEY;
mongoose_1["default"]
    .connect(url)
    .then(function () {
    console.log("Connected to the database ");
})["catch"](function (err) {
    console.error("Error connecting to the database. ".concat(err));
});
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
if (process.env.NODE_ENV == "production") {
    app.use(express_1["default"].static("client/build"));
    var path_1 = require("path");
    app.get("*", function (req, res) {
        res.sendFile(path_1.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.post("/signup", function (req, res) {
    var signUpFormData = req.body;
    var query = user_1.User.where({ mail: signUpFormData.mail });
    query.findOne(function (err, doc) {
        if (!doc) {
            var token = jsonwebtoken_1["default"].sign({ id: signUpFormData.mail }, token_key, {
                algorithm: "HS256",
                expiresIn: "2h"
            });
            var userData = __assign(__assign({}, signUpFormData), { token: token });
            var newUser = user_1.User.create(userData);
            console.log("form data", signUpFormData);
            res.status(201).send(token);
        }
        else {
            console.log(signUpFormData);
            res.status(400).send("<h1> Mail exists </h1>");
        }
    });
});
app.post("/login", function (req, res) {
    var logInFormData = req.body;
    var query = user_1.User.where({ mail: logInFormData.mail });
    query.findOne(function (err, doc) {
        if (doc) {
            console.log(doc);
            if (doc.password === logInFormData.password) {
                try {
                    var token = jsonwebtoken_1["default"].verify(logInFormData.token, token_key);
                    res.status(201).send(token);
                }
                catch (err) {
                    res.status(400).send("Token required or Expired token");
                }
            }
        }
        else {
            res.status(400).send("<h1>Login failed</h1>");
        }
    });
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening!");
});
