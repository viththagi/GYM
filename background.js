chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParams = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParams);


    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      videoID: urlParameters.get("v")
    });
  }
});


  