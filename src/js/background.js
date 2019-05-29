chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(`Received ${JSON.stringify(message)}.`)

  const { action } = message;
  if (action === 'init') sendResponse('👍');
  if (action === 'get_ignored') sendResponse(getIgnored());
  if (action === 'set_ignored') {
    const ignored = storeIgnored(message.url);
    sendResponse(ignored);
  }
});

function storeIgnored(url) {
  const ignored = [...getIgnored(), url]
  window.localStorage.setItem('ignored', JSON.stringify(ignored));
  return ignored;
}

function getIgnored() {
  return JSON.parse(getIgnoredJSON()) || [];
}

function getIgnoredJSON() {
  return window.localStorage.getItem('ignored');
}