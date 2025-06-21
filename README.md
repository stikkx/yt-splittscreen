# Multi-Screen Split View Chrome Extension

Eine Chrome-Extension, die das Browserfenster in verschiedene Layouts aufteilt und in jedem Bereich Videos oder beliebige Websites ohne Adresszeile anzeigt.

## Features

- 🎬 **Flexible Layouts**: 2x2 (4 Fenster), 2+1 (3 Fenster) oder 2/3 + 1/3 (4 Fenster)
- 🌐 **Beliebige Links**: YouTube-Videos, Livetiming, oder jede andere Website
- 🖥️ **Vollbildmodus** ohne Browser-Elemente
- 💾 **Automatisches Speichern** der Links und Layout-Einstellungen
- ⌨️ **Keyboard-Shortcuts** (F11 für Vollbild, F5 für Refresh)
- 🔄 **Unterstützung verschiedener YouTube-URL-Formate**
- 🎯 **Minimalistische Benutzeroberfläche**

## Installation

1. **Extension herunterladen**
   - Lade alle Dateien in einen Ordner herunter
   - Stelle sicher, dass alle Dateien vorhanden sind:
     - `manifest.json`
     - `popup.html`
     - `popup.js`
     - `background.js`
     - `split-screen.html`
     - `split-screen.js`
     - `content.js`

2. **In Chrome installieren**
   - Öffne Chrome und gehe zu `chrome://extensions/`
   - Aktiviere den "Entwicklermodus" (oben rechts)
   - Klicke auf "Entpackte Erweiterung laden"
   - Wähle den Ordner mit den Extension-Dateien aus

3. **Extension verwenden**
   - Klicke auf das Extension-Icon in der Chrome-Toolbar
   - Wähle das gewünschte Layout (2x2, 2+1 oder 2/3 + 1/3)
   - Gib Links in die Eingabefelder ein
   - Klicke auf "Split Screen Starten"

## Verwendung

### Layout-Auswahl
- **2x2 Layout**: 4 Fenster in einem 2x2 Grid (oben links, oben rechts, unten links, unten rechts)
- **2+1 Layout**: 3 Fenster - 2 oben nebeneinander, 1 unten mit voller Breite
- **2/3 + 1/3 Layout**: 4 Fenster - Links oben großes Video, links unten 2 kleine Fenster nebeneinander, rechts Livetiming in voller Höhe

### Link-Eingabe
- **YouTube-Videos**: Unterstützt alle YouTube-URL-Formate
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`
- **Beliebige Websites**: Jede Website kann eingebunden werden
  - `https://livetiming.azurewebsites.net/events/50/results`
  - `https://example.com`
  - `http://localhost:3000`

### Split Screen starten
- Klicke auf "🚀 Split Screen Starten"
- Ein neues Tab öffnet sich mit dem gewählten Layout
- Jedes Fenster zeigt die entsprechende Website/Video

### Steuerung
- **Vollbild**: Klicke auf "Vollbild" oder drücke F11
- **Aktualisieren**: Klicke auf "Aktualisieren" oder drücke F5
- **Schließen**: Klicke auf "Schließen" oder schließe das Tab

## Keyboard-Shortcuts

- `F11`: Vollbildmodus ein/aus
- `F5`: Videos/Websites neu laden
- `Escape`: Vollbildmodus beenden

## Technische Details

- **Manifest Version**: 3
- **Berechtigungen**: activeTab, scripting, storage
- **Host Permissions**: Alle HTTPS/HTTP Websites
- **Kompatibilität**: Chrome 88+

## Beispiele

### Livetiming + Streams (2/3 + 1/3 Layout)
```
Layout: 2/3 + 1/3
Frame 1 (Hauptvideo - Links Oben): https://www.youtube.com/watch?v=dQw4w9WgXcQ
Frame 2 (Kleines Fenster 1 - Links Unten): https://www.youtube.com/watch?v=VIDEO_ID_2
Frame 3 (Kleines Fenster 2 - Links Unten): https://www.youtube.com/watch?v=VIDEO_ID_3
Frame 4 (Livetiming - Rechts Volle Höhe): https://livetiming.azurewebsites.net/events/50/results
```

### Livetiming + YouTube Videos (2+1 Layout)
```
Layout: 2+1
Frame 1 (Oben Links): https://livetiming.azurewebsites.net/events/50/results
Frame 2 (Oben Rechts): https://www.youtube.com/watch?v=dQw4w9WgXcQ
Frame 3 (Unten - Volle Breite): https://www.youtube.com/watch?v=VIDEO_ID_2
```

### 4 YouTube Videos (2x2 Layout)
```
Layout: 2x2
Frame 1: https://www.youtube.com/watch?v=VIDEO_1
Frame 2: https://www.youtube.com/watch?v=VIDEO_2
Frame 3: https://www.youtube.com/watch?v=VIDEO_3
Frame 4: https://www.youtube.com/watch?v=VIDEO_4
```

## Troubleshooting

**Websites werden nicht geladen:**
- Überprüfe, ob die Links korrekt sind
- Stelle sicher, dass die Websites öffentlich verfügbar sind
- Einige Websites blockieren iframe-Einbettungen

**Extension funktioniert nicht:**
- Überprüfe, ob alle Dateien im Extension-Ordner vorhanden sind
- Lade die Extension neu in `chrome://extensions/`
- Überprüfe die Chrome-Konsole auf Fehlermeldungen

**Vollbildmodus funktioniert nicht:**
- Einige Websites blockieren den Vollbildmodus
- Versuche F11 direkt zu verwenden
- Überprüfe die Browser-Einstellungen

## Entwicklung

Die Extension besteht aus folgenden Hauptkomponenten:

- **popup.html/js**: Benutzeroberfläche für Layout-Auswahl und Link-Eingabe
- **background.js**: Service Worker für Tab-Management
- **split-screen.html/js**: Hauptfenster mit dynamischen Layouts
- **content.js**: Content Script für zusätzliche Funktionalität

## Lizenz

Diese Extension ist für den persönlichen Gebrauch bestimmt. YouTube ist eine Marke von Google Inc. 