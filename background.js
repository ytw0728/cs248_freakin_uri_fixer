chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./content-script.js"]
        })
            .then(() => {
                console.log("injection completed");
            })
            .catch(err => {
                if (err.message.includes('Cannot access contents of url')) {
                    console.log(tab.url)
                } else {
                    throw err
                }
            })
            .catch(err => {
                console.error(`>>>>> ${tab.url} <<<<<`)
                console.error(err)
            });
    }
});
