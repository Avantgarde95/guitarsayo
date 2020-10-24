(function () {
    'use strict';

    var marketsArea = document.getElementsByClassName('MarketsArea')[0],
        //communitiesArea = document.getElementsByClassName('CommunitiesArea')[0],
        searchInput = document.getElementsByClassName('SearchInput')[0],
        searchButton = document.getElementsByClassName('SearchButton')[0];

    function openURL(url) {
        chrome.tabs.create({url: url});
    }

    function searchSites(sites, query) {
        var trimmedQuery = query.trim();

        if (trimmedQuery.length === 0) {
            alert('검색어를 입력하세요.');
            return;
        }

        sites.forEach(function (site) {
            var finalQuery = trimmedQuery;

            if (site.allowSearch) {
                if (site.maxQueryLength > 0) {
                    finalQuery = finalQuery.substr(0, site.maxQueryLength);
                }

                finalQuery = encodeURIComponent(finalQuery);
                openURL(site.searchURL.replace('$', finalQuery));
            }
        });
    }

    function readSitesFromStorage(handler) {
        chrome.storage.sync.get({sitesMap: {}}, function (result) {
            var sitesMap = result.sitesMap,
                sites = defaultSites.map(function (site) {
                    if (sitesMap.hasOwnProperty(site.name)) {
                        return Object.assign({}, site, sitesMap[site.name]);
                    } else {
                        return site;
                    }
                });

            handler(sites);
        });
    }

    function writeSitesToStorage(sites) {
        var sitesMap = {};

        sites.forEach(function (site) {
            sitesMap[site.name] = site;
        });

        chrome.storage.sync.set({sitesMap: sitesMap});
    }

    readSitesFromStorage(function (sites) {
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
                site.allowSearch = searchOptionCheckbox.checked;
                writeSitesToStorage(sites);
            });

            searchOptionLabel.className = 'SearchOptionLabel';
            searchOptionLabel.innerHTML = '검색';
            searchOptionLabel.appendChild(searchOptionCheckbox);

            linkArea.className = 'LinkArea';
            linkArea.appendChild(linkButton);

            if (site.allowSearch !== null) {
                searchOptionCheckbox.checked = site.allowSearch;
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
                searchSites(sites, searchInput.value);
            }
        });

        searchButton.addEventListener('click', function () {
            searchSites(sites, searchInput.value);
        });
    });
}());
