(function () {
    'use strict';

    var markets = [
            {
                name: '스쿨뮤직 Schoolmusic',
                url: 'http://www.schoolmusic.co.kr',
                searchURL: 'http://www.schoolmusic.co.kr/Shop/index.php3?var=Search&max_cnt=15&keyword=$'
            },
            {
                name: '프리버드 Freebud',
                url: 'http://www.freebud.co.kr',
                searchURL: 'http://www.freebud.co.kr/shop/goods/goods_search.php?disp_type=&hid_sword=&searched=Y&log=1&sort=&page_num=&delivery=&view=&total=&searchword=&new_goods=&skey=all&sword=$'
            },
            {
                name: '버즈비 Buzzbee',
                url: 'http://buzzbee.co.kr',
                searchURL: 'http://buzzbee.co.kr/shop/goods/goods_search.php?searched=Y&log=1&skey=all&hid_pr_text=&hid_link_url=&edit=&sword=$'
            }
        ],
        communities = [
            {
                name: '뮬 Mule',
                url: 'https://www.mule.co.kr/'
            },
            {
                name: '일렉트릭기타 마이너 갤러리',
                url: 'https://gall.dcinside.com/mgallery/board/lists?id=electricguitar'
            }
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

    document.getElementsByClassName('SearchButton')[0].addEventListener('click', function () {
        var query = document.getElementsByClassName('SearchInput')[0].value,
            encodedQuery = escape(query);

        markets.forEach(function (site) {
            openURL(site.searchURL.replace('$', encodedQuery));
        });
    });
}());
