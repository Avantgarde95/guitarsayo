(function () {
    'use strict';

    function openURL(url) {
        chrome.tabs.create({url: url});
    }

    var marketsArea = document.getElementsByClassName('MarketsArea')[0];

    [
        {name: '스쿨뮤직 Schoolmusic', url: 'http://www.schoolmusic.co.kr'},
        {name: '프리버드 Freebud', url: 'http://www.freebud.co.kr'},
        {name: '버즈비 Buzzbee', url: 'http://buzzbee.co.kr'}
    ].forEach(function (market) {
        var marketButton = document.createElement('button');
        marketButton.className = 'MarketButton';
        marketButton.innerHTML = market.name;

        marketButton.addEventListener('click', function () {
            openURL(market.url);
        });

        marketsArea.appendChild(marketButton);
    });
}());
