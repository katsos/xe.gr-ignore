chrome.runtime.sendMessage({ action: 'init' }, console.log);

function getAds() {
  return Array.from(document.querySelectorAll('.lazy.r'));
}

function getIgnored() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({ action: 'get_ignored' }, res);
  });
}

function setIgnored(url) {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({ action: 'set_ignored', url }, res);
  });
}

function ignore(ad) {
  const href = getAdHref(ad);
  setIgnored(href);
  ad.parentNode.removeChild(ad);
}

function getAdHref(ad) {
  return ad.querySelector('a').href;
}

function setIgnoreButton() {
  const ads = getAds();
  ads.map((ad) => {
    const btn = document.createElement('button');
    btn.innerText = 'Ignore';
    btn.style     = 'position:absolute; bottom:0;';
    btn.addEventListener('click', () => ignore(ad));
    ad.appendChild(btn);
  });
}

function hideIgnoredAds(ads, ignored) {
  const parentNode = document.querySelector('.column_468');
  return ads.map((ad) => {
    const href = getAdHref(ad);
    if (ignored.includes(href)) parentNode.removeChild(ad);
    return ad;
  });
}

(async () => {
  const ads = getAds();
  const ignored = await getIgnored();
  console.log(`${ads.length} ads, ${ignored.length} ignored.`);

  const visibleAds = hideIgnoredAds(ads, ignored);
  setIgnoreButton()
})()
