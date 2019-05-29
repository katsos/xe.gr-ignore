chrome.runtime.sendMessage({ action: 'init' }, (response) => {
  console.log(response);
  chrome.runtime.sendMessage({ action: 'get_ignored' }, (ignoredUrls) => {
    console.log(ignoredUrls);
  });
});

