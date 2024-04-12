
(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideoId = "";

    // we are gonna add a listenner that will listen to messages from the background script
    chrome.runtime.onmessage.addListener((message, sender, sendResponse) => {
        // prameters are message, sender, sendResponse
        // message is the message that was sent from the background script
        // sender is the sender of the message
        // sendResponse is a function that we can use to send a response back to the sender
        
        const { type, value, videoId } = message; // we are destructuring the message object to get the type and value

        if (type === "NEW") {
            currentVideoId = videoId;

            // call a function to handle any video actions with new video.
            newvideoLoaded ();
        }
    });

    const newvideoLoaded = () => {
        // check if a bookmark button already exists within the youtube website DOM
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn").length[0];

        // It doesnt so we add one
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("images/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark this timestamp";


        }
    }
})();

