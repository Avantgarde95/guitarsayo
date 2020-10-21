(function () {
    'use strict';

    var sites = [
            {
                type: 'Market',
                name: '스쿨뮤직 Schoolmusic',
                url: 'http://www.schoolmusic.co.kr',
                searchURL: 'http://www.schoolmusic.co.kr/Shop/index.php3?var=Search&max_cnt=15&keyword=$'
            },
            {
                type: 'Market',
                name: '프리버드 Freebud',
                url: 'http://www.freebud.co.kr',
                searchURL: 'http://www.freebud.co.kr/shop/goods/goods_search.php?disp_type=&hid_sword=&searched=Y&log=1&sort=&page_num=&delivery=&view=&total=&searchword=&new_goods=&skey=all&sword=$'
            },
            {
                type: 'Market',
                name: '버즈비 Buzzbee',
                url: 'http://buzzbee.co.kr',
                searchURL: 'http://buzzbee.co.kr/shop/goods/goods_search.php?searched=Y&log=1&skey=all&hid_pr_text=&hid_link_url=&edit=&sword=$'
            },
            {
                type: 'Community',
                name: '뮬 Mule',
                url: 'https://www.mule.co.kr/'
            },
            {
                type: 'Community',
                name: '일렉트릭기타 마이너 갤러리',
                url: 'https://gall.dcinside.com/mgallery/board/lists?id=electricguitar'
            }
        ],
        marketsArea = document.getElementsByClassName('MarketsArea')[0],
        communitiesArea = document.getElementsByClassName('CommunitiesArea')[0],
        searchInput = document.getElementsByClassName('SearchInput')[0],
        searchButton = document.getElementsByClassName('SearchButton')[0];

    function openURL(url) {
        chrome.tabs.create({url: url});
    }

    function searchSites(query) {
        var encodedQuery = escape(query);

        sites.forEach(function (site) {
            if (site.type === 'Market') {
                openURL(site.searchURL.replace('$', encodedQuery));
            }
        });
    }

    sites.forEach(function (site) {
        var button = document.createElement('button');

        button.className = 'LinkButton';
        button.innerHTML = site.name;

        button.addEventListener('click', function () {
            openURL(site.url);
        });

        switch (site.type) {
            case 'Market':
                marketsArea.appendChild(button);
                break;
            case 'Community':
                communitiesArea.appendChild(button);
                break;
        }
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            searchSites(searchInput.value);
        }
    });

    searchButton.addEventListener('click', function () {
        searchSites(searchInput.value);
    });
}());
