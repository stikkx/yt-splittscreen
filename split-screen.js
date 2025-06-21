let currentVideos = [];
let currentLayout = '2x2';

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
  
  // YouTube Live URL: https://www.youtube.com/live/VIDEO_ID
  const liveMatch = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
  if (liveMatch) {
    videoId = liveMatch[1];
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=0&iv_load_policy=3&disablekb=1&playsinline=1`;
  }
  
  // Wenn es kein YouTube-Link ist, verwende die URL direkt
  return url;
}

// Layout setzen
function setLayout(layout) {
  currentLayout = layout;
  const container = document.getElementById('splitContainer');
  const layoutInfo = document.getElementById('layoutInfo');
  
  // Entferne alle Layout-Klassen
  container.classList.remove('layout-2x2', 'layout-2plus1', 'layout-2third');
  
  if (layout === '2x2') {
    container.classList.add('layout-2x2');
    layoutInfo.textContent = 'Layout: 2x2';
    
    // Stelle sicher, dass alle 4 Frames vorhanden sind
    for (let i = 1; i <= 4; i++) {
      if (!document.getElementById(`frame${i}`)) {
        const frame = document.createElement('div');
        frame.className = 'video-frame';
        frame.id = `frame${i}`;
        frame.innerHTML = `<div class="loading">Frame ${i} wird geladen...</div>`;
        container.appendChild(frame);
      }
    }
  } else if (layout === '2plus1') {
    container.classList.add('layout-2plus1');
    layoutInfo.textContent = 'Layout: 2+1';
    
    // Entferne den 4. Frame für 2+1 Layout
    const frame4 = document.getElementById('frame4');
    if (frame4) {
      frame4.remove();
    }
    
    // Stelle sicher, dass 3 Frames vorhanden sind
    for (let i = 1; i <= 3; i++) {
      if (!document.getElementById(`frame${i}`)) {
        const frame = document.createElement('div');
        frame.className = 'video-frame';
        frame.id = `frame${i}`;
        frame.innerHTML = `<div class="loading">Frame ${i} wird geladen...</div>`;
        container.appendChild(frame);
      }
    }
  } else {
    container.classList.add('layout-2third');
    layoutInfo.textContent = 'Layout: 2/3 + 1/3';
    
    // Stelle sicher, dass alle 4 Frames vorhanden sind für 2third Layout
    for (let i = 1; i <= 4; i++) {
      if (!document.getElementById(`frame${i}`)) {
        const frame = document.createElement('div');
        frame.className = 'video-frame';
        frame.id = `frame${i}`;
        frame.innerHTML = `<div class="loading">Frame ${i} wird geladen...</div>`;
        container.appendChild(frame);
      }
    }
  }
}

// Video in Frame laden
function loadVideoInFrame(frameId, url) {
  console.log(`loadVideoInFrame called: ${frameId}, URL: ${url}`);
  
  const frame = document.getElementById(frameId);
  if (!frame) {
    console.error(`Frame ${frameId} nicht gefunden!`);
    return;
  }
  
  const embedUrl = convertToEmbedUrl(url);
  console.log(`Converted URL: ${embedUrl}`);
  
  if (!embedUrl) {
    frame.innerHTML = '<div class="error-message">Ungültiger Link</div>';
    return;
  }
  
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  
  // Entferne Loading-Message und füge iframe hinzu
  frame.innerHTML = '';
  frame.appendChild(iframe);
  
  console.log(`Iframe created for ${frameId} with src: ${embedUrl}`);
  
  // Fehlerbehandlung
  iframe.onerror = function() {
    console.error(`Error loading iframe for ${frameId}`);
    frame.innerHTML = '<div class="error-message">Fehler beim Laden der Seite</div>';
  };
  
  // Laden-Event
  iframe.onload = function() {
    console.log(`Frame ${frameId} erfolgreich geladen: ${url}`);
  };
}

// Alle Videos laden
function loadVideos(videos, layout) {
  currentVideos = videos;
  currentLayout = layout;
  
  console.log('Loading videos:', videos, 'Layout:', layout);
  
  // Setze Layout
  setLayout(layout);
  
  // Fülle Videos auf
  const maxFrames = (layout === '2x2' || layout === '2third') ? 4 : 3;
  while (videos.length < maxFrames) {
    videos.push('');
  }
  
  console.log('Max frames:', maxFrames, 'Videos after padding:', videos);
  
  // Lade Videos in die entsprechenden Frames
  for (let i = 0; i < maxFrames; i++) {
    const frameId = `frame${i + 1}`;
    const videoUrl = videos[i];
    
    console.log(`Loading frame ${frameId} with URL:`, videoUrl);
    
    if (videoUrl) {
      loadVideoInFrame(frameId, videoUrl);
    } else {
      // Leerer Frame
      const frame = document.getElementById(frameId);
      if (frame) {
        frame.innerHTML = '<div class="loading">Kein Inhalt</div>';
      } else {
        console.error(`Frame ${frameId} nicht gefunden!`);
      }
    }
  }
}

// Event Listener für Nachrichten vom Background Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'loadVideos') {
    loadVideos(request.videos, request.layout);
    sendResponse({ success: true });
  } else if (request.action === 'updateVideos') {
    loadVideos(request.videos, request.layout);
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
    loadVideos(currentVideos, currentLayout);
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
  chrome.storage.local.get(['layout', 'video1', 'video2', 'video3', 'video4', 'video2plus1_1', 'video2plus1_2', 'video2plus1_3', 'video2third_1', 'video2third_2', 'video2third_3', 'video2third_4'], function(result) {
    const videos = [];
    const layout = result.layout || '2x2';
    
    if (layout === '2plus1') {
      if (result.video2plus1_1) videos.push(result.video2plus1_1);
      if (result.video2plus1_2) videos.push(result.video2plus1_2);
      if (result.video2plus1_3) videos.push(result.video2plus1_3);
    } else if (layout === '2third') {
      if (result.video2third_1) videos.push(result.video2third_1);
      if (result.video2third_2) videos.push(result.video2third_2);
      if (result.video2third_3) videos.push(result.video2third_3);
      if (result.video2third_4) videos.push(result.video2third_4);
    } else {
      if (result.video1) videos.push(result.video1);
      if (result.video2) videos.push(result.video2);
      if (result.video3) videos.push(result.video3);
      if (result.video4) videos.push(result.video4);
    }
    
    if (videos.length > 0) {
      loadVideos(videos, layout);
    }
  });
}); 