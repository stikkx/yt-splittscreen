let currentVideos = [];

// YouTube URL zu Embed URL konvertieren
function convertToEmbedUrl(url) {
  if (!url) return null;
  
  // Entferne Leerzeichen
  url = url.trim();
  
  // Verschiedene YouTube URL Formate unterstützen
  let videoId = null;
  
  // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  // Short YouTube URL: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  // YouTube Embed URL: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=0&iv_load_policy=3&disablekb=1&playsinline=1`;
  }
  
  return null;
}

// Video in Frame laden
function loadVideoInFrame(frameId, url) {
  const frame = document.getElementById(frameId);
  const embedUrl = convertToEmbedUrl(url);
  
  if (!embedUrl) {
    frame.innerHTML = '<div class="error-message">Ungültiger YouTube-Link</div>';
    return;
  }
  
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  
  // Entferne Loading-Message und füge iframe hinzu
  frame.innerHTML = '';
  frame.appendChild(iframe);
  
  // Fehlerbehandlung
  iframe.onerror = function() {
    frame.innerHTML = '<div class="error-message">Fehler beim Laden des Videos</div>';
  };
}

// Alle Videos laden
function loadVideos(videos) {
  currentVideos = videos;
  
  // Fülle auf 4 Videos auf (leere Strings für leere Frames)
  while (videos.length < 4) {
    videos.push('');
  }
  
  // Lade Videos in die entsprechenden Frames
  for (let i = 0; i < 4; i++) {
    const frameId = `video${i + 1}`;
    const videoUrl = videos[i];
    
    if (videoUrl) {
      loadVideoInFrame(frameId, videoUrl);
    } else {
      // Leerer Frame
      const frame = document.getElementById(frameId);
      frame.innerHTML = '<div class="loading">Kein Video</div>';
    }
  }
}

// Event Listener für Nachrichten vom Background Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'loadVideos') {
    loadVideos(request.videos);
    sendResponse({ success: true });
  }
});

// Vollbildmodus
document.getElementById('fullscreenBtn').addEventListener('click', function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Vollbildmodus nicht verfügbar:', err);
    });
  } else {
    document.exitFullscreen();
  }
});

// Aktualisieren
document.getElementById('refreshBtn').addEventListener('click', function() {
  if (currentVideos.length > 0) {
    loadVideos(currentVideos);
  }
});

// Schließen
document.getElementById('closeBtn').addEventListener('click', function() {
  window.close();
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'F11':
      e.preventDefault();
      document.getElementById('fullscreenBtn').click();
      break;
    case 'F5':
      e.preventDefault();
      document.getElementById('refreshBtn').click();
      break;
    case 'Escape':
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      break;
  }
});

// Vollbildmodus Event Listener
document.addEventListener('fullscreenchange', function() {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (document.fullscreenElement) {
    fullscreenBtn.textContent = 'Vollbild beenden';
    document.body.classList.add('fullscreen');
  } else {
    fullscreenBtn.textContent = 'Vollbild';
    document.body.classList.remove('fullscreen');
  }
});

// Automatisches Laden beim Start (falls Videos bereits vorhanden)
window.addEventListener('load', function() {
  // Versuche gespeicherte Videos zu laden
  chrome.storage.local.get(['video1', 'video2', 'video3', 'video4'], function(result) {
    const videos = [];
    for (let i = 1; i <= 4; i++) {
      if (result[`video${i}`]) {
        videos.push(result[`video${i}`]);
      }
    }
    if (videos.length > 0) {
      loadVideos(videos);
    }
  });
}); 