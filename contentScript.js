
(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = []; // Stores all current video bookmarks in an array

    // we are gonna add a listenner that will listen to messages from the background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // prameters are message, sender, sendResponse
        // message is the message that was sent from the background script
        // sender is the sender of the message
        // sendResponse is a function that we can use to send a response back to the sender
        
        const { type, value, videoId } = message; // we are destructuring the message object to get the type and value

        if (type === "NEW") {
            currentVideo = videoId;

            // call a function to handle any video actions with new video.
            newvideoLoaded ();
        }
    });

    const newvideoLoaded = () => {
        // check if a bookmark button already exists within the youtube website DOM
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn").length[0];
        console.log("bookmarkBtnExists", bookmarkBtnExists);
        // It doesnt so we add one
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark this timestamp";

            // next we're gonna grab the youtube settings to where we are gonna add the bookmark button

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            // add the bookmark button to the youtube controls row
            youtubeLeftControls.appendChild(bookmarkBtn);

            // add an event listener to the bookmark button         
            // get the current video timestamp will give us in seconds
            // convert the seconds to a standard time of how it is displayed in youtube

            bookmarkBtn.addEventListener("click", () => {
                // get the current video time
                const currentTime = youtubePlayer.currentTime;
                const getTime = (t) => {
                    var date = new Date(0);
                    date.getSeconds(t);

                    return date.toISOString().substring(11,8);
                };

                const newBookmark = {
                    time: currentTime,
                    desc: `Bookmark at ${getTime(currentTime)}`
                };

                console.log(newBookmark); // This doesnt output the right time format returns : {time: 1858.790574, desc: 'Bookmark at 01T'}
                // sync it to chrome storage. Each video will map back to a set of bookmark in storage
                chrome.storage.sync.set({
                    [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)) // Things need to be stored in JSON in chrome storage
                })
            });

        }
    }

    newvideoLoaded();
})();

