// ==UserScript==
// @name         Chat Modifications
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Shortens names and some more
// @author       Hawkins
// @match        https://www.playinitium.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


//var i = setTimeout(function() {
$(document).ready( function() {
    setTimeout(function() {
        // Shorten those infamous long names
        $("a.premium-character-name:contains(' Erl ')").html("Erl")
        $("a.premium-character-name:contains('Diagun')").html("Diagun")
        $("a.clue:contains('SPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKS')").html("Spooks")
        $("a.clue:contains('[DEV] Trydian')").html("The Best Dev Ever")
        $("a.clue:contains('[Dev] Rade')").html("A Superior Really Amazing Dev")
        // Add CSS to message body of dev messages
        $("a.content-dev-nickname").parent().siblings().addClass( "content-dev-nickname" );

        // Add CSS to bot messages
        $("a:contains('[Bot]')").addClass( "content-dev-nickname" );
        $("a:contains('[Bot]')").css( "font-style", "italic" );
        /*$("a:contains('[Bot]')").css( "background", "indigo" );
        $("a:contains('[Bot]')").css( "-webkit-background-clip", "text" ); 
        $("a:contains('[Bot]')").css( "-webkit-text-fill-color",  "transparent" );*/
        $("a:contains('[Bot]')").parent().siblings().css( "background", "violet" );
        $("a:contains('[Bot]')").parent().siblings().css( "-webkit-background-clip", "text" ); 
        $("a:contains('[Bot]')").parent().siblings().css( "-webkit-text-fill-color",  "transparent" );
        $("a:contains('[Bot]')").parent().siblings().css( "font-style", "italic" );
    }, 300);
});
