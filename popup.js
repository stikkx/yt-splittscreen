document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const videoInputs = [
    document.getElementById('video1'),
    document.getElementById('video2'),
    document.getElementById('video3'),
    document.getElementById('video4')
  ];

  // Lade gespeicherte Links beim Öffnen
  chrome.storage.local.get(['video1', 'video2', 'video3', 'video4'], function(result) {
    if (result.video1) videoInputs[0].value = result.video1;
    if (result.video2) videoInputs[1].value = result.video2;
    if (result.video3) videoInputs[2].value = result.video3;
    if (result.video4) videoInputs[3].value = result.video4;
  });

  startBtn.addEventListener('click', function() {
    const videos = videoInputs.map(input => input.value.trim()).filter(url => url);
    
    if (videos.length === 0) {
      alert('Bitte gib mindestens einen YouTube-Link ein!');
      return;
    }

    // Speichere die Links
    const saveData = {};
    videoInputs.forEach((input, index) => {
      saveData[`video${index + 1}`] = input.value.trim();
    });
    chrome.storage.local.set(saveData);

    // Sende an Background Script
    chrome.runtime.sendMessage({
      action: 'startSplitScreen',
      videos: videos
    }, function(response) {
      if (response && response.success) {
        window.close();
      } else {
        alert('Fehler beim Starten des Split Screens: ' + (response ? response.error : 'Unbekannter Fehler'));
      }
    });
  });

  // Enter-Taste zum Starten
  videoInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        startBtn.click();
      }
    });
  });
}); 