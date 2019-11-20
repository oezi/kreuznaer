"use strict";
exports.__esModule = true;
var bar = require("./data/bar.json");
var deu = require("./data/deu.json");
var eng = require("./data/eng.json");
var fra = require("./data/fra.json");
var gsw = require("./data/gsw.json");
var ksh = require("./data/ksh.json");
var lat = require("./data/lat.json");
var nds = require("./data/nds.json");
var nld = require("./data/nld.json");
var pfl = require("./data/pfl.json");
var spa = require("./data/spa.json");
var tur = require("./data/tur.json");
var backreflength = 4;
var specialChars = ['.', '!', '?', ',', ':', '-', '–'];
var data = {
    bar: bar,
    deu: deu,
    eng: eng,
    fra: fra,
    gsw: gsw,
    ksh: ksh,
    lat: lat,
    nds: nds,
    nld: nld,
    pfl: pfl,
    spa: spa,
    tur: tur
};
var Kreuznaer = /** @class */ (function () {
    function Kreuznaer(config) {
        this.config = null;
        this.config = config;
    }
    Kreuznaer.prototype.getData = function () {
        return data[this.config];
    };
    Kreuznaer.prototype.randomEntry = function (arr) {
        var _a;
        return (_a = arr) === null || _a === void 0 ? void 0 : _a[Math.floor(Math.random() * arr.length)];
    };
    Kreuznaer.prototype.generate = function (data) {
        if (data === void 0) { data = this.getData(); }
        var word = ' '.repeat(backreflength);
        var newchar = '';
        var _loop_1 = function () {
            var key = word.substr(word.length - (backreflength), backreflength);
            var dataEntry = data.words[key];
            newchar = '';
            if (dataEntry) {
                if (typeof dataEntry === 'string') {
                    newchar = dataEntry;
                }
                else {
                    var rng_1 = Math.floor(Math.random() * dataEntry._) + 1;
                    var sum_1 = 0;
                    Object.entries(dataEntry).some(function (_a) {
                        var key = _a[0], val = _a[1];
                        if (key !== '_') {
                            sum_1 += val;
                            if (sum_1 >= rng_1) {
                                newchar = key
                                    .replace(';', '')
                                    .replace(' ', '');
                                return true;
                            }
                        }
                        return false;
                    });
                }
                word += newchar;
            }
        };
        do {
            _loop_1();
        } while (newchar && newchar !== ';' && word.length > 0);
        return word.trim();
    };
    Kreuznaer.prototype.generateSomething = function (includeSpecialChars, data) {
        if (includeSpecialChars === void 0) { includeSpecialChars = true; }
        if (data === void 0) { data = this.getData(); }
        while (true) {
            var word = this.generate(data);
            if (includeSpecialChars || !specialChars.includes(word)) {
                return word;
            }
        }
    };
    Kreuznaer.prototype.generateWord = function (data) {
        if (data === void 0) { data = this.getData(); }
        while (true) {
            var word = this.generateSomething(false, data);
            if (!parseInt(word[0])) {
                return word;
            }
        }
    };
    Kreuznaer.prototype.generateSentence = function (data) {
        if (data === void 0) { data = this.getData(); }
        var parts = [];
        var lastPart = ',';
        do {
            lastPart = this.generateSomething(!specialChars.includes(lastPart), data);
            if (lastPart.replace('.', '')) {
                parts.push(lastPart.replace('.', ''));
            }
        } while ((!['.', '!', '?'].includes(lastPart) || parts.length < 3) && parts.length < 250);
        var sentence = parts.join(' ') + (['!', '?'].includes(lastPart) ? '' : '.');
        sentence = sentence.replace(/[\s]+[\.]/gi, '.');
        sentence = sentence.replace(/[\s]+[!]/gi, '!');
        sentence = sentence.replace(/[\s]+[?]/gi, '?');
        sentence = sentence.replace(/[\s]+[,]/gi, ',');
        sentence = sentence.replace(/[\s]+[:]/gi, ':');
        sentence = sentence.replace('..', '.');
        sentence = sentence[0].toUpperCase() + sentence.substring(1);
        return sentence;
    };
    Kreuznaer.prototype.generateName = function (gender, data) {
        if (data === void 0) { data = this.getData(); }
        var _a, _b;
        var male = gender ? gender === 'm' : Math.random() < 0.5;
        if (male) {
            if ((_a = data.maleNames) === null || _a === void 0 ? void 0 : _a.length) {
                return this.randomEntry(data.maleNames);
            }
        }
        else {
            if ((_b = data.femaleNames) === null || _b === void 0 ? void 0 : _b.length) {
                return this.randomEntry(data.femaleNames);
            }
        }
        while (true) {
            var word = this.generateWord(data);
            if (word[0] === word[0].toUpperCase() && word.length >= 5) {
                return word;
            }
        }
    };
    Kreuznaer.prototype.generateFamilyName = function (data) {
        if (data === void 0) { data = this.getData(); }
        var _a;
        if ((_a = data.familyNames) === null || _a === void 0 ? void 0 : _a.length) {
            return this.randomEntry(data.familyNames);
        }
        while (true) {
            var word = this.generateWord(data);
            if (word[0] === word[0].toUpperCase() && word.length >= 5) {
                return word;
            }
        }
    };
    Kreuznaer.prototype.generateNickName = function (data) {
        if (data === void 0) { data = this.getData(); }
        var _a;
        if ((_a = data.nickNames) === null || _a === void 0 ? void 0 : _a.length) {
            return this.randomEntry(data.nickNames);
        }
        while (true) {
            var word = this.generateWord(data);
            if (word[0] === word[0].toUpperCase() && word.length >= 5) {
                return word;
            }
        }
    };
    Kreuznaer.prototype.getWord = function () {
        return this.generateWord();
    };
    Kreuznaer.prototype.getSentence = function () {
        return this.generateSentence();
    };
    Kreuznaer.prototype.getName = function (gender) {
        return this.generateName(gender);
    };
    Kreuznaer.prototype.getFamilyName = function () {
        return this.generateFamilyName();
    };
    Kreuznaer.prototype.getNickName = function () {
        return this.generateNickName();
    };
    return Kreuznaer;
}());
exports["default"] = Kreuznaer;
