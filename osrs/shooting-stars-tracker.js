// ==UserScript==
// @name         OSRS Shooting Stars Highlighter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Josh Hawkins https://github.com/hawkins
// @match        https://osrsportal.com/shooting-stars-tracker
// @icon         https://www.google.com/s2/favicons?sz=64&domain=osrsportal.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const logPrefix = "[OSRS Shooting Stars Highlighter] ";

    console.log(`${logPrefix}Starting...`);

    // Select the table to observe changes made to its children
    var target = document.querySelector('div.stars-tracker table');

    // Track pinged stars so we don't re-notify them on table refreshes
    var pingedStars = {};

    var observer = new MutationObserver(function(mutations) {
        // First, clear any styling changes we made on a previous pass
        Object.entries(pingedStars).forEach((world, { element }) => {
            delete element.style.backgroundColor;
        });

        // Check out each label of a landing site
        var labels = document.querySelectorAll("td.specialwidth");
        labels.forEach((label, index) => {
            // Get the table row, because that's what we'll operate on to distinguish the row
            var parent = label.parentElement;

            var timeString = parent.children[0].innerText;
            var time = Number(timeString.substring(0, timeString.indexOf("m ago")));
            var tier = Number(parent.children[1].innerText);
            var region = parent.children[2].innerText;
            var location = parent.children[3].innerText;
            var world = parent.children[4].innerText.trim();
            var scout = parent.children[5].innerText;

            // If the label matches some criteria, track it
            if (location.includes("Nardah") || location.includes("Prifdd")) {
                // Make the table row stand out in the table
                parent.style.backgroundColor = 'RED';

                // Remove any stale worlds
                if (world in pingedStars) {
                    if (pingedStars[world].location != location) {
                        delete pingedStars[world];
                    }
                }

                // We only need good enough calls that are probably still relevant
                if ((time < 45) && (tier >= 3)) {

                    // Ideally we would alert the user asynchronously, but we lose too much context, so not for now.
                    if (!(world in pingedStars)) {
                        alert(`A T${tier} star has landed at ${location} in World ${world} just ${time} minutes ago!`);
                    }

                    // Even if we've already pinged the star, update the entry so we can delete it when it's gone
                    pingedStars[world] = { "element": parent, "world": world, "time": time, "tier": tier, "region": region, "location": location, "scout": scout };
                }
            }
        });
    });

    // Listen
    observer.observe(target, {
        subtree:       true,
        attributes:    true,
        childList:     true,
        characterData: true
    });

    console.log(`${logPrefix}Started!`);
})();