// Listen on any updates from out tabs system and find the most recent tab or the tab that is currently playing a video for, the youtube page

// we are gonna have a listenner that will listen to tabs and when a tab is updated we will check if the tab is a youtube tab

// remember we have got permissions form chrome.tabs api

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1] // Will be our unique video value since every video has a unique value here
    
    
    const urlParameters = new URLSearchParams(queryParameters)   // 

    // theres a messaging system that happens between the extension, and were gonna send a message to the content script that bassicly says a new video has loaded. And this is the video ID of that video. 
    // And the content script will then send a message back to the background script with the title of the video. And then the background script will store that in local storage.
    
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v")
      // random: "random" this is just to show that we can send multiple values and is accesible in the contentScript
    });
    
    chrome.pageAction.show(tabId)
  }
});