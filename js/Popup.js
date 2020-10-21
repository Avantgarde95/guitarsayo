(function () {
    'use strict';

    var markets = [
            {name: '스쿨뮤직 Schoolmusic', url: 'http://www.schoolmusic.co.kr'},
            {name: '프리버드 Freebud', url: 'http://www.freebud.co.kr'},
            {name: '버즈비 Buzzbee', url: 'http://buzzbee.co.kr'}
        ],
        communities = [
            {name: '뮬 Mule', url: 'https://www.mule.co.kr/'},
            {name: '일렉트릭기타 마이너 갤러리', url: 'https://gall.dcinside.com/mgallery/board/lists?id=electricguitar'}
        ];

    function openURL(url) {
        chrome.tabs.create({url: url});
    }

    [
        {className: 'MarketsArea', sites: markets},
        {className: 'CommunitiesArea', sites: communities}
    ].forEach(function (area) {
        var areaElement = document.getElementsByClassName(area.className)[0];

        area.sites.forEach(function (site) {
            var buttonElement = document.createElement('button');

            buttonElement.className = 'LinkButton';
            buttonElement.innerHTML = site.name;

            buttonElement.addEventListener('click', function () {
                openURL(site.url);
            });

            areaElement.appendChild(buttonElement);
        });
    });
}());
