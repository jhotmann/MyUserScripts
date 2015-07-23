// ==UserScript==
// @name       TFS Slider Height Fixer
// @namespace  *
// @version    1.2.0
// @description  Automatically adjust query results pane heights in TFS 2013 web interface
// @include http*://tfs2012:8080/tfs/*_workitems*
// @copyright  2015, Jordan Hotmann
// @updateURL https://raw.githubusercontent.com/jhotmann/MyUserScripts/master/TfsSliderHeight.user.js
// @downloadURL https://raw.githubusercontent.com/jhotmann/MyUserScripts/master/TfsSliderHeight.user.js
// @grant       none
// @noframes
// ==/UserScript==

setInterval(moveSlider, 1500);

function moveSlider() {
  // Get number of work items
  var workItemCount = parseInt(document.getElementsByClassName('hub-title-right')[0].getElementsByTagName('span')[0].title.split(' ')[0]);
  console.log(workItemCount + ' work items');
  var rightPaneHeight = parseInt(document.getElementById('60').offsetHeight);

  if (workItemCount < 10) {
    var workItemsHeight = parseInt(document.getElementsByClassName('grid-gutter')[0].offsetHeight);
    console.log(workItemsHeight);
    var finalHeight = rightPaneHeight - workItemsHeight - 116;
    console.log(finalHeight);
    var finalHeightString = finalHeight + 'px';

    // Set hight of stuff
    document.getElementsByClassName('leftPane')[1].style.bottom = finalHeight + 'px';
    document.getElementsByClassName('rightPane')[1].style.height = finalHeight + 'px';
    document.getElementsByClassName('handleBar')[1].style.bottom = finalHeight + 'px';
  } else {
    var halfHeight = rightPaneHeight / 2;
    document.getElementsByClassName('leftPane')[1].style.bottom = halfHeight + 'px';
    document.getElementsByClassName('rightPane')[1].style.height = halfHeight + 'px';
    document.getElementsByClassName('handleBar')[1].style.bottom = halfHeight + 'px';

    var refreshButton = document.getElementsByClassName('icon-refresh')[0];
    var clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    });
    refreshButton.dispatchEvent(clickEvent);
  }
}
