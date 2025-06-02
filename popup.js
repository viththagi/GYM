// adding a new bookmark row to the popup
import { getCurentTab } from "./utils";
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async() => {
    const activetab = await getCurentTab();
    const queryParameters = activetab.url.split("?");
    const urlParameters = new URLSearchParams(queryParameters)

    const currentVideo = urlParameters.url("v")

    if(activetab.url.includes("youtube.com/watch") && currentVideo){
        
    }
});
