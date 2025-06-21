// Content Script für zusätzliche Funktionalität
console.log('4-Way YouTube Split Screen Extension geladen');

// Event Listener für Nachrichten vom Split Screen
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getCurrentUrl') {
    sendResponse({ url: window.location.href });
  }
});

// Verstecke Browser-Elemente wenn möglich (für bessere Video-Erfahrung)
function hideBrowserElements() {
  // Diese Funktion kann erweitert werden, um Browser-Elemente zu verstecken
  // Da dies in Chrome Extensions begrenzt ist, konzentrieren wir uns auf den Split Screen
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  hideBrowserElements();
}); 