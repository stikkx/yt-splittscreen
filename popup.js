document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const updateBtn = document.getElementById('updateBtn');
  const newBtn = document.getElementById('newBtn');
  const layout2x2Btn = document.getElementById('layout2x2');
  const layout2plus1Btn = document.getElementById('layout2plus1');
  const layout2thirdBtn = document.getElementById('layout2third');
  const layout2x2Inputs = document.getElementById('layout2x2-inputs');
  const layout2plus1Inputs = document.getElementById('layout2plus1-inputs');
  const layout2thirdInputs = document.getElementById('layout2third-inputs');
  
  let currentLayout = '2x2';
  let isInitialLoad = true; // Flag um initiales Laden zu erkennen
  let splitScreenTabId = null; // Speichert die Tab-ID des aktiven Split Screens
  
  // Layout-Auswahl
  layout2x2Btn.addEventListener('click', function() {
    setLayout('2x2');
  });
  
  layout2plus1Btn.addEventListener('click', function() {
    setLayout('2plus1');
  });
  
  layout2thirdBtn.addEventListener('click', function() {
    setLayout('2third');
  });
  
  function setLayout(layout) {
    console.log('setLayout called with layout:', layout);
    currentLayout = layout;
    
    // Entferne alle active Klassen
    layout2x2Btn.classList.remove('active');
    layout2plus1Btn.classList.remove('active');
    layout2thirdBtn.classList.remove('active');
    
    // Verstecke alle Input-Container
    layout2x2Inputs.classList.add('hidden');
    layout2plus1Inputs.classList.add('hidden');
    layout2thirdInputs.classList.add('hidden');
    
    if (layout === '2x2') {
      console.log('Setting 2x2 layout');
      layout2x2Btn.classList.add('active');
      layout2x2Inputs.classList.remove('hidden');
    } else if (layout === '2plus1') {
      console.log('Setting 2plus1 layout');
      layout2plus1Btn.classList.add('active');
      layout2plus1Inputs.classList.remove('hidden');
    } else if (layout === '2third') {
      console.log('Setting 2third layout');
      layout2thirdBtn.classList.add('active');
      layout2thirdInputs.classList.remove('hidden');
    }
    
    // Aktualisiere Auto-Save Listener für das neue Layout
    addAutoSaveListeners();
    
    // Speichere das Layout
    saveCurrentState();
  }
  
  // Layout setzen ohne Auto-Save (für initiales Laden)
  function setLayoutWithoutSave(layout) {
    console.log('setLayoutWithoutSave called with layout:', layout);
    currentLayout = layout;
    
    // Entferne alle active Klassen
    layout2x2Btn.classList.remove('active');
    layout2plus1Btn.classList.remove('active');
    layout2thirdBtn.classList.remove('active');
    
    // Verstecke alle Input-Container
    layout2x2Inputs.classList.add('hidden');
    layout2plus1Inputs.classList.add('hidden');
    layout2thirdInputs.classList.add('hidden');
    
    if (layout === '2x2') {
      console.log('Setting 2x2 layout');
      layout2x2Btn.classList.add('active');
      layout2x2Inputs.classList.remove('hidden');
    } else if (layout === '2plus1') {
      console.log('Setting 2plus1 layout');
      layout2plus1Btn.classList.add('active');
      layout2plus1Inputs.classList.remove('hidden');
    } else if (layout === '2third') {
      console.log('Setting 2third layout');
      layout2thirdBtn.classList.add('active');
      layout2thirdInputs.classList.remove('hidden');
    }
    
    console.log('Layout set to:', layout, 'currentLayout:', currentLayout);
  }
  
  // Automatisches Speichern nur bei tatsächlichen Änderungen
  function addAutoSaveListener(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      console.log('Adding auto-save listener for:', inputId);
      
      // Entferne vorhandene Listener um Duplikate zu vermeiden
      input.removeEventListener('input', saveCurrentState);
      input.removeEventListener('blur', saveCurrentState);
      
      // Füge neue Listener hinzu
      input.addEventListener('input', function() {
        console.log('Input event on:', inputId, 'value:', input.value);
        saveCurrentState();
      });
      input.addEventListener('blur', function() {
        console.log('Blur event on:', inputId, 'value:', input.value);
        saveCurrentState();
      });
    } else {
      console.warn('Input element not found:', inputId);
    }
  }
  
  // Aktuellen Zustand speichern
  function saveCurrentState() {
    // Nicht speichern beim initialen Laden
    if (isInitialLoad) {
      console.log('Skipping save during initial load');
      return;
    }
    
    console.log('saveCurrentState called, currentLayout:', currentLayout, 'isInitialLoad:', isInitialLoad);
    
    const saveData = {
      layout: currentLayout,
      lastSaved: Date.now()
    };
    
    if (currentLayout === '2x2') {
      saveData.video1 = document.getElementById('video1').value.trim();
      saveData.video2 = document.getElementById('video2').value.trim();
      saveData.video3 = document.getElementById('video3').value.trim();
      saveData.video4 = document.getElementById('video4').value.trim();
    } else if (currentLayout === '2plus1') {
      saveData.video2plus1_1 = document.getElementById('video2plus1_1').value.trim();
      saveData.video2plus1_2 = document.getElementById('video2plus1_2').value.trim();
      saveData.video2plus1_3 = document.getElementById('video2plus1_3').value.trim();
    } else if (currentLayout === '2third') {
      saveData.video2third_1 = document.getElementById('video2third_1').value.trim();
      saveData.video2third_2 = document.getElementById('video2third_2').value.trim();
      saveData.video2third_3 = document.getElementById('video2third_3').value.trim();
      saveData.video2third_4 = document.getElementById('video2third_4').value.trim();
    }
    
    console.log('Saving data:', saveData);
    
    chrome.storage.local.set(saveData, function() {
      console.log('Zustand automatisch gespeichert:', saveData);
      showSaveStatus();
    });
  }
  
  // Status-Anzeige für gespeicherte Links
  function showSaveStatus() {
    const statusElement = document.getElementById('saveStatus');
    if (statusElement) {
      statusElement.textContent = '✅ Links gespeichert - ' + new Date().toLocaleTimeString();
      statusElement.style.color = '#4CAF50';
      
      // Nach 3 Sekunden wieder zurücksetzen
      setTimeout(() => {
        statusElement.textContent = 'Links werden automatisch gespeichert';
        statusElement.style.color = '';
      }, 3000);
    }
  }
  
  // Lade gespeicherte Einstellungen
  chrome.storage.local.get(['layout', 'video1', 'video2', 'video3', 'video4', 'video2plus1_1', 'video2plus1_2', 'video2plus1_3', 'video2third_1', 'video2third_2', 'video2third_3', 'video2third_4', 'lastSaved'], function(result) {
    console.log('Loading saved data:', result);
    
    // Setze Layout zuerst (ohne Auto-Save)
    if (result.layout) {
      console.log('Setting layout first:', result.layout);
      setLayoutWithoutSave(result.layout);
    }
    
    // Warte kurz, dann lade die Links
    setTimeout(() => {
      console.log('Loading links after layout is set');
      
      // Lade gespeicherte Links basierend auf Layout
      if (result.layout === '2plus1') {
        if (result.video2plus1_1) {
          console.log('Setting video2plus1_1:', result.video2plus1_1);
          document.getElementById('video2plus1_1').value = result.video2plus1_1;
        }
        if (result.video2plus1_2) {
          console.log('Setting video2plus1_2:', result.video2plus1_2);
          document.getElementById('video2plus1_2').value = result.video2plus1_2;
        }
        if (result.video2plus1_3) {
          console.log('Setting video2plus1_3:', result.video2plus1_3);
          document.getElementById('video2plus1_3').value = result.video2plus1_3;
        }
      } else if (result.layout === '2third') {
        if (result.video2third_1) {
          console.log('Setting video2third_1:', result.video2third_1);
          document.getElementById('video2third_1').value = result.video2third_1;
        }
        if (result.video2third_2) {
          console.log('Setting video2third_2:', result.video2third_2);
          document.getElementById('video2third_2').value = result.video2third_2;
        }
        if (result.video2third_3) {
          console.log('Setting video2third_3:', result.video2third_3);
          document.getElementById('video2third_3').value = result.video2third_3;
        }
        if (result.video2third_4) {
          console.log('Setting video2third_4:', result.video2third_4);
          document.getElementById('video2third_4').value = result.video2third_4;
        }
      } else {
        if (result.video1) {
          console.log('Setting video1:', result.video1);
          document.getElementById('video1').value = result.video1;
        }
        if (result.video2) {
          console.log('Setting video2:', result.video2);
          document.getElementById('video2').value = result.video2;
        }
        if (result.video3) {
          console.log('Setting video3:', result.video3);
          document.getElementById('video3').value = result.video3;
        }
        if (result.video4) {
          console.log('Setting video4:', result.video4);
          document.getElementById('video4').value = result.video4;
        }
      }
      
      // Zeige an, wann die Links zuletzt gespeichert wurden
      if (result.lastSaved) {
        const statusElement = document.getElementById('saveStatus');
        if (statusElement) {
          const lastSaved = new Date(result.lastSaved);
          const now = new Date();
          const diffMinutes = Math.floor((now - lastSaved) / (1000 * 60));
          
          if (diffMinutes < 1) {
            statusElement.textContent = '✅ Links vor kurzem gespeichert';
          } else if (diffMinutes < 60) {
            statusElement.textContent = `✅ Links vor ${diffMinutes} Minuten gespeichert`;
          } else {
            statusElement.textContent = `✅ Links vor ${Math.floor(diffMinutes / 60)} Stunden gespeichert`;
          }
          statusElement.style.color = '#4CAF50';
        }
      }
      
      // Füge Auto-Save Listener nach einer längeren Verzögerung hinzu
      setTimeout(() => {
        console.log('Adding auto-save listeners, isInitialLoad:', isInitialLoad);
        addAutoSaveListeners();
        isInitialLoad = false; // Jetzt können Auto-Saves aktiviert werden
        console.log('Auto-save listeners added, initial load complete');
      }, 1000); // Noch längere Verzögerung für Sicherheit
    }, 100); // Kurze Verzögerung nach Layout-Set
  });

  // Auto-Save Listener für alle Eingabefelder hinzufügen
  function addAutoSaveListeners() {
    console.log('addAutoSaveListeners called, currentLayout:', currentLayout);
    
    // Entferne zuerst alle vorhandenen Listener
    const allInputIds = ['video1', 'video2', 'video3', 'video4', 'video2plus1_1', 'video2plus1_2', 'video2plus1_3', 'video2third_1', 'video2third_2', 'video2third_3', 'video2third_4'];
    
    allInputIds.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.removeEventListener('input', saveCurrentState);
        input.removeEventListener('blur', saveCurrentState);
      }
    });
    
    // Füge Listener nur für das aktuelle Layout hinzu
    let currentInputIds = [];
    if (currentLayout === '2x2') {
      currentInputIds = ['video1', 'video2', 'video3', 'video4'];
    } else if (currentLayout === '2plus1') {
      currentInputIds = ['video2plus1_1', 'video2plus1_2', 'video2plus1_3'];
    } else if (currentLayout === '2third') {
      currentInputIds = ['video2third_1', 'video2third_2', 'video2third_3', 'video2third_4'];
    }
    
    console.log('Adding listeners for inputs:', currentInputIds);
    currentInputIds.forEach(inputId => {
      addAutoSaveListener(inputId);
    });
  }

  startBtn.addEventListener('click', function() {
    // Intelligente Logik: Update wenn Tab existiert, sonst erstelle neuen
    if (splitScreenTabId) {
      updateExistingSplitScreen();
    } else {
      startNewSplitScreen();
    }
  });

  // Enter-Taste zum Starten
  function addEnterListener(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          // Verwende die Update-Funktion wenn ein Tab existiert, sonst erstelle einen neuen
          if (splitScreenTabId) {
            updateExistingSplitScreen();
          } else {
            startNewSplitScreen();
          }
        }
      });
    }
  }
  
  // Event Listener für alle Eingabefelder
  ['video1', 'video2', 'video3', 'video4', 'video2plus1_1', 'video2plus1_2', 'video2plus1_3', 'video2third_1', 'video2third_2', 'video2third_3', 'video2third_4'].forEach(addEnterListener);
  
  // Bestehenden Split Screen aktualisieren
  updateBtn.addEventListener('click', function() {
    if (splitScreenTabId) {
      updateExistingSplitScreen();
    } else {
      alert('Kein aktiver Split Screen gefunden. Erstelle einen neuen Split Screen.');
      startNewSplitScreen();
    }
  });
  
  // Neuen Split Screen erstellen
  newBtn.addEventListener('click', function() {
    startNewSplitScreen();
  });
  
  // Funktion zum Aktualisieren eines bestehenden Split Screens
  function updateExistingSplitScreen() {
    let videos = getCurrentVideos();
    
    if (videos.length === 0) {
      alert('Bitte gib mindestens einen Link ein!');
      return;
    }
    
    // Speichere die Einstellungen vor dem Aktualisieren
    saveCurrentState();
    
    // Sende Update-Nachricht an den bestehenden Split Screen
    chrome.tabs.sendMessage(splitScreenTabId, {
      action: 'updateVideos',
      layout: currentLayout,
      videos: videos
    }, function(response) {
      if (chrome.runtime.lastError) {
        console.log('Split Screen Tab nicht mehr verfügbar, erstelle neuen:', chrome.runtime.lastError);
        startNewSplitScreen();
      } else if (response && response.success) {
        showUpdateStatus();
        // Aktiviere den Split Screen Tab
        chrome.tabs.update(splitScreenTabId, { active: true });
      } else {
        alert('Fehler beim Aktualisieren: ' + (response ? response.error : 'Unbekannter Fehler'));
      }
    });
  }
  
  // Funktion zum Erstellen eines neuen Split Screens
  function startNewSplitScreen() {
    let videos = getCurrentVideos();
    
    if (videos.length === 0) {
      alert('Bitte gib mindestens einen Link ein!');
      return;
    }
    
    // Speichere die Einstellungen vor dem Starten
    saveCurrentState();
    
    // Sende an Background Script
    chrome.runtime.sendMessage({
      action: 'startSplitScreen',
      layout: currentLayout,
      videos: videos
    }, function(response) {
      if (response && response.success) {
        splitScreenTabId = response.tabId; // Speichere die Tab-ID
        window.close();
      } else {
        alert('Fehler beim Starten des Split Screens: ' + (response ? response.error : 'Unbekannter Fehler'));
      }
    });
  }
  
  // Hilfsfunktion zum Abrufen der aktuellen Videos
  function getCurrentVideos() {
    let videos = [];
    
    if (currentLayout === '2x2') {
      videos = [
        document.getElementById('video1').value.trim(),
        document.getElementById('video2').value.trim(),
        document.getElementById('video3').value.trim(),
        document.getElementById('video4').value.trim()
      ].filter(url => url);
    } else if (currentLayout === '2plus1') {
      videos = [
        document.getElementById('video2plus1_1').value.trim(),
        document.getElementById('video2plus1_2').value.trim(),
        document.getElementById('video2plus1_3').value.trim()
      ].filter(url => url);
    } else {
      videos = [
        document.getElementById('video2third_1').value.trim(),
        document.getElementById('video2third_2').value.trim(),
        document.getElementById('video2third_3').value.trim(),
        document.getElementById('video2third_4').value.trim()
      ].filter(url => url);
    }
    
    return videos;
  }
  
  // Status-Anzeige für Updates
  function showUpdateStatus() {
    const statusElement = document.getElementById('saveStatus');
    if (statusElement) {
      statusElement.textContent = '✅ Split Screen aktualisiert - ' + new Date().toLocaleTimeString();
      statusElement.style.color = '#4CAF50';
      
      // Nach 3 Sekunden wieder zurücksetzen
      setTimeout(() => {
        statusElement.textContent = 'Links werden automatisch gespeichert';
        statusElement.style.color = '';
      }, 3000);
    }
  }
  
  // Prüfe beim Laden, ob bereits ein Split Screen Tab existiert
  chrome.tabs.query({ url: chrome.runtime.getURL('split-screen.html') }, function(tabs) {
    if (tabs.length > 0) {
      splitScreenTabId = tabs[0].id;
      console.log('Bestehender Split Screen Tab gefunden:', splitScreenTabId);
    }
  });
}); 