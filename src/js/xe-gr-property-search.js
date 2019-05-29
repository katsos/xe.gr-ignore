chrome.runtime.sendMessage({ action: 'init' }, console.log);

function getAds() {
  return document.querySelectorAll('.lazy.r');
}

function getIgnored() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({ action: 'get_ignored' }, res);
  });
}

(async () => {
  const ads = getAds();
  const ignored = await getIgnored();
  console.log(ads, ignored);
})()
