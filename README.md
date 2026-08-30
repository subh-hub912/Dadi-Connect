# Dadi Connect

An elder-friendly Expo app for one-tap family calling. The home screen opens directly to a large photo grid so Dadi can tap a person and choose SIM Call, WhatsApp Voice, or WhatsApp Video.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npm start
   ```

3. Run on Android with Expo Go or an Android emulator:

   ```bash
   npm run android
   ```

## Admin Access

- On the home screen, tap `Add / Manage People`.
- From Admin, you can add, edit, or delete people, choose photos, set their relationship, clear all people, and switch between Hindi and English.

## Adding Photos

Open Admin, add or edit a person, then tap `Choose Photo`. The app uses `expo-image-picker` to save the selected local photo URI in AsyncStorage.

## Data Storage

All profile and settings data is stored locally using AsyncStorage. A fresh install starts empty so a caregiver can add only the real people Grandma should call.

## Android APK

Build an installable APK with EAS:

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

The `preview` profile in `eas.json` creates an `.apk` for direct installation on Android phones.

## Project Structure

```text
/src
  /screens
    HomeScreen.js
    CallModal.js
    AdminPanel.js
  /components
    DaughterCard.js
    CallButton.js
    LargePhoto.js
  /data
    defaultDaughters.js
  /utils
    callHelpers.js
    storage.js
  /assets
    /images
```

## Notes

- Normal calls use the `tel:` deep link.
- WhatsApp tries `whatsapp://call?phone=...` first, then falls back to `https://wa.me/...`.
- If WhatsApp is unavailable, the app shows: `WhatsApp नहीं मिला। Normal Call करें।`
