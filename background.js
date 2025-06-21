chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSplitScreen') {
    startSplitScreen(request.videos, request.layout)
      .then((tabId) => {
        sendResponse({ success: true, tabId: tabId });
      })
      .catch((error) => {
        console.error('Split Screen Error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep message channel open for async response
  }
});

async function startSplitScreen(videos, layout) {
  try {
    // Erstelle ein neues Tab für den Split Screen
    const splitScreenTab = await chrome.tabs.create({
      url: chrome.runtime.getURL('split-screen.html'),
      active: true
    });

    // Warte kurz, bis das Tab geladen ist
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Sende die Video-URLs und Layout an das Split Screen Tab
    await chrome.tabs.sendMessage(splitScreenTab.id, {
      action: 'loadVideos',
      videos: videos,
      layout: layout
    });

    return splitScreenTab.id; // Gib die Tab-ID zurück

  } catch (error) {
    console.error('Error starting split screen:', error);
    throw error;
  }
} 