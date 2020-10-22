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
                name: '뮤직포스 Music Force',
                url: 'http://musicforce.co.kr',
                searchURL: 'https://musicforce.co.kr/product/search.html?banner_action=&keyword=$'
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
                url: 'https://www.mule.co.kr/',
                searchURL: 'https://www.mule.co.kr/bbs/market/sell?page=1&map=list&mode=list&region=&start_price=&end_price=&qf=title&qs=$&category=&ct1=&ct2=&ct3=&store=&options=&soldout=&sido=&gugun=&dong=&period=6&of=wdate&od=desc&v=l'
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
        var encodedQuery = encodeURIComponent(query.trim());

        if (encodedQuery.length === 0) {
            alert('검색어를 입력하세요.');
            return;
        }

        sites.forEach(function (site) {
            if (site.hasOwnProperty('searchURL')) {
                openURL(site.searchURL.replace('$', encodedQuery));
            }
        });
    }

    sites.forEach(function (site) {
        var linkArea = document.createElement('div'),
            linkButton = document.createElement('button'),
            searchOptionLabel = document.createElement('label'),
            searchOptionCheckbox = document.createElement('input');

        linkButton.className = 'LinkButton';
        linkButton.innerHTML = site.name;

        linkButton.addEventListener('click', function () {
            openURL(site.url);
        });

        searchOptionCheckbox.className = 'SearchOptionCheckbox';
        searchOptionCheckbox.type = 'checkbox';
        searchOptionCheckbox.checked = true;

        searchOptionLabel.className = 'SearchOptionLabel';
        searchOptionLabel.innerHTML = '검색';
        searchOptionLabel.appendChild(searchOptionCheckbox);

        linkArea.className = 'LinkArea';
        linkArea.appendChild(linkButton);

        if (site.hasOwnProperty('searchURL')) {
            linkArea.appendChild(searchOptionLabel);
        }

        switch (site.type) {
            case 'Market':
                marketsArea.appendChild(linkArea);
                break;
            case 'Community':
                communitiesArea.appendChild(linkArea);
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
