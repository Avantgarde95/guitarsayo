(function (sites) {
    'use strict';

    var marketsArea = document.getElementsByClassName('MarketsArea')[0],
        //communitiesArea = document.getElementsByClassName('CommunitiesArea')[0],
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
            if (site.search !== null && site.search.allow) {
                openURL(site.search.url.replace('$', encodedQuery));
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

        searchOptionCheckbox.addEventListener('change', function () {
            site.search.allow = searchOptionCheckbox.checked;
        });

        searchOptionLabel.className = 'SearchOptionLabel';
        searchOptionLabel.innerHTML = '검색';
        searchOptionLabel.appendChild(searchOptionCheckbox);

        linkArea.className = 'LinkArea';
        linkArea.appendChild(linkButton);

        if (site.search !== null) {
            searchOptionCheckbox.checked = site.search.allow;
            linkArea.appendChild(searchOptionLabel);
        }

        switch (site.type) {
            case 'Market':
                marketsArea.appendChild(linkArea);
                break;
            /*
            case 'Community':
                communitiesArea.appendChild(linkArea);
                break;
            */
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
}(allSites));
