// ==UserScript==
// @name         Twitter Auto-refresh
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically include new tweets
// @author       Josh Hawkins
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        var elements = document.getElementsByClassName('new-tweets-bar');
        if (elements.length > 0) {
            var element = elements[0];
            element.click();
        }
    }, 5000);
})();
