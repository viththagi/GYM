(() => {
    let youtubeLeftControl, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, VideoID } = obj;

        if (type === 'NEW') {
            currentVideo = VideoID;
            newVideoLoaded();
        }
    });

    const fetchBookamrks = () => {
        return new promise((resolve) => {
            chrome.storage.sync.get(([currentVideo],obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
            })
        }) 
    }

    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementsByClassName('bookmark-btn')[0];
        currentVideoBookmarks = await fetchBookamrks();

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControl = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            if (youtubeLeftControl) {
                youtubeLeftControl.appendChild(bookmarkBtn);
                bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
            } else {
                console.warn("YouTube controls not found");
            }
        }
    };

    window.addEventListener("load", () => {
        setTimeout(() => {
            newVideoLoaded();
        }, 3000);
    });

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        currentVideoBookmarks = await fetchBookamrks();

        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)
        };
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
        
        console.log("button clicked")
        console.log("New bookmark created:", newBookmark);

    };

    const getTime = t => {
        var date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substr(11, 8);
    };
})();
