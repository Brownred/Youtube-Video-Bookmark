import { getActiveTabURL } from "./utils.js"

const newBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", () => {
    const ActiveTab = await getActiveTabURL();
    const queryParameters = ActiveTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (ActiveTab.url.includes("youtube.com/watch") && currentVideo) {
        Chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];

            // view Bookmarks
        })
    } else {}
});
