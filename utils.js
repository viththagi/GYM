export async function getCurentTab(params) {
    let queryOptins = {active:true, currentwindow:true}
    let [tab] = await chrome.tabs.query(queryOptins);
    return tab;
} 