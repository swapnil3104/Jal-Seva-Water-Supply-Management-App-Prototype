# Jal Seva (जल सेवा) - Android APK Export Guide

This repository has been configured and compiled with **Capacitor + Android SDK 36**. The native Android APK has been successfully built and exported!

---

## 📱 Exported APK Location

The compiled APK file is ready to install and available directly at:
- **Root Directory**: [`Jal-Seva.apk`](file:///e:/Jal-Seva-Water-Supply-Management-App-Prototype/Jal-Seva.apk) (~4.27 MB)
- **Gradle Output**: [`android/app/build/outputs/apk/debug/app-debug.apk`](file:///e:/Jal-Seva-Water-Supply-Management-App-Prototype/android/app/build/outputs/apk/debug/app-debug.apk)

---

## ⚡ 1-Command Rebuild

Whenever you edit your code and want to export a fresh APK:
```bash
npm run build:apk
```
This single command builds the web bundle, syncs assets to Android, compiles via Gradle, and copies `Jal-Seva.apk` to your project root!

## Quick Steps to Generate the APK in Android Studio

### Step 1: Open the Project in Android Studio
1. Launch **Android Studio**.
2. Click **Open** (or `File > Open...`).
3. Browse to this project directory and select the **`android`** folder:
   ```
   e:\Jal-Seva-Water-Supply-Management-App-Prototype\android
   ```
4. Click **OK**. Android Studio will load the Gradle project and sync dependencies automatically.

---

### Step 2: Build the Debug APK (1-Click)
In the top menu bar of Android Studio:
1. Click **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Android Studio will compile the app using its built-in Android SDK and OpenJDK.
3. Once completed, a notification bubble will appear in the bottom-right corner:
   > **APK(s) generated successfully for 1 module.**  
   > Click **`locate`** to open the folder containing `app-debug.apk`.

**Direct APK file output path:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

### Step 3: Install & Run on Your Mobile Phone
1. Connect your Android phone via USB cable (or transfer `app-debug.apk` via WhatsApp, Google Drive, or Bluetooth).
2. Tap on `app-debug.apk` on your phone.
3. Allow **"Install unknown apps"** when prompted by Android.
4. Tap **Install** and open **Jal Seva**!
5. The app launches with the splash screen animation, full-screen native mobile viewport, navigation bar, and all features.

---

## Alternative: Build directly via Terminal (Gradle CLI)
If you have Android SDK and JDK 17/21 configured on your command line:
```bash
# Navigate to android folder
cd android

# Build Debug APK
./gradlew assembleDebug
```
The APK will be generated at `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## How to update the APK after editing web code
Whenever you make changes to the React / HTML / CSS code:
```bash
# 1. Build the updated web bundle
npm run build

# 2. Sync to Android project
npx cap sync android
```
Then simply re-build in Android Studio.
