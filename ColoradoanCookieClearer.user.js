// ==UserScript==
// @name       Coloradoan Cookie Clearer
// @namespace  *
// @version    1.0.0
// @description  Unlimited article views
// @include http*://*coloradoan.com/*
// @run-at      document-end
// @copyright  2015, Jordan Hotmann
// @updateURL https://raw.githubusercontent.com/jhotmann/MyUserScripts/master/ColoradoanCookieClearer.user.js
// @downloadURL https://raw.githubusercontent.com/jhotmann/MyUserScripts/master/ColoradoanCookieClearer.user.js
// @icon https://pbs.twimg.com/profile_images/2326612260/hzzqzgn6hc377llkgdff.png
// @grant        none
// ==/UserScript==

//--- Loop through cookies and delete them.
var cookieList  = document.cookie.split (/;\s*/);

for (var J = cookieList.length - 1;   J >= 0;  --J) {
    var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");

    eraseCookie (cookieName);
}

function eraseCookie (cookieName) {
    //--- ONE-TIME INITS:
    //--- Set possible domains. Omits some rare edge cases.?.
    var domain      = document.domain;
    var domain2     = document.domain.replace (/^www\./, "");
    var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");;

    //--- Get possible paths for the current page:
    var pathNodes   = location.pathname.split ("/").map ( function (pathWord) {
        return '/' + pathWord;
    } );
    var cookPaths   = [""].concat (pathNodes.map ( function (pathNode) {
        if (this.pathStr) {
            this.pathStr += pathNode;
        }
        else {
            this.pathStr = "; path=";
            return (this.pathStr + pathNode);
        }
        return (this.pathStr);
    } ) );

    ( eraseCookie = function (cookieName) {
        //--- For each path, attempt to delete the cookie.
        cookPaths.forEach ( function (pathStr) {
            //--- To delete a cookie, set its expiration date to a past value.
            var diagStr     = cookieName + "=" + pathStr + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = diagStr;

            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain  + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain2 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain3 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        } );
    } ) (cookieName);
}
