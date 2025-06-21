# 4-Way YouTube Split Screen Chrome Extension

Eine Chrome-Extension, die das Browserfenster in 4 Bereiche aufteilt und in jedem Bereich ein YouTube-Video ohne Adresszeile anzeigt.

## Features

- 🎬 4 gleichzeitige YouTube-Videos
- 🖥️ Vollbildmodus ohne Browser-Elemente
- 💾 Automatisches Speichern der Video-Links
- ⌨️ Keyboard-Shortcuts (F11 für Vollbild, F5 für Refresh)
- 🔄 Unterstützung verschiedener YouTube-URL-Formate
- 🎯 Minimalistische Benutzeroberfläche

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
   - Gib YouTube-Links in die Eingabefelder ein
   - Klicke auf "Split Screen Starten"

## Verwendung

1. **Video-Links eingeben**
   - Unterstützte Formate:
     - `https://www.youtube.com/watch?v=VIDEO_ID`
     - `https://youtu.be/VIDEO_ID`
     - `https://www.youtube.com/embed/VIDEO_ID`

2. **Split Screen starten**
   - Klicke auf "🚀 Split Screen Starten"
   - Ein neues Tab öffnet sich mit dem 4-Wege-Split-Screen

3. **Steuerung**
   - **Vollbild**: Klicke auf "Vollbild" oder drücke F11
   - **Aktualisieren**: Klicke auf "Aktualisieren" oder drücke F5
   - **Schließen**: Klicke auf "Schließen" oder schließe das Tab

## Keyboard-Shortcuts

- `F11`: Vollbildmodus ein/aus
- `F5`: Videos neu laden
- `Escape`: Vollbildmodus beenden


## Entwicklung

Die Extension besteht aus folgenden Hauptkomponenten:

- **popup.html/js**: Benutzeroberfläche für Link-Eingabe
- **background.js**: Service Worker für Tab-Management
- **split-screen.html/js**: Hauptfenster mit 4 Video-Frames
- **content.js**: Content Script für zusätzliche Funktionalität

## Lizenz

Diese Extension ist für den persönlichen Gebrauch bestimmt. YouTube ist eine Marke von Google Inc. 