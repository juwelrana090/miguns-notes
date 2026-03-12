Perfect! So `rn-new` is actually `create-expo-stack`. Your exact command would be:

```bash
npx rn-new@latest nanoloan --exporouter --nativewind
```

Or with extra options like tabs navigation and a specific package manager:

```bash
npx rn-new@latest nanoloan --exporouter --tabs --nativewind --bun
```

That will scaffold a fully configured Expo Router + NativeWind project in one shot — no manual setup needed.


## 2. Install All Dependencies

### Expo Core

```bash
npx expo install expo-audio expo-av expo-blur expo-build-properties expo-checkbox expo-constants expo-dev-client expo-font expo-haptics expo-image expo-image-manipulator expo-image-picker expo-keep-awake expo-linear-gradient expo-linking expo-modules-core expo-notifications expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser
```

### React Native Core

```bash

Remove-Item -Recurse -Force node_modules, package-lock.json
npm install --legacy-peer-deps
npx expo install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-webview
```

### Navigation

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/elements
```

### State Management

```bash
npm install  @reduxjs/toolkit  react-redux  redux-persist  @react-native-async-storage/async-storage
```

### Firebase & Auth

```bash
npm install  @react-native-firebase/app @react-native-firebase/firestore @react-native-firebase/messaging @react-native-google-signin/google-signin  firebase
```

### WebRTC & Calling

```bash
npm install  react-native-webrtc  @config-plugins/react-native-webrtc  react-native-incall-manager  simple-peer socket.io-client
```

### Permissions & Device

```bash
npm install react-native-permissions  react-native-device-info  react-native-bluetooth-state-manager @react-native-community/datetimepicker
```

### Icons & Fonts

```bash
npx expo install @expo-google-fonts/inter @expo-google-fonts/roboto @expo-google-fonts/lilita-one
npm install react-native-vector-icons @react-native-vector-icons/fontawesome @react-native-vector-icons/fontawesome6 @react-native-vector-icons/evil-icons
```

### NativeWind v4 (Tailwind CSS)

```bash
npm install nativewind tailwindcss
npm install -D prettier-plugin-tailwindcss
```

### Other Utilities

```bash
npm install react-native-toast-message react-native-nitro-modules react-native-worklets-core react-native-web react-dom
```

```bash
npm cache clean --force
npm install
npx expo install --fix
npx expo start --clear
npx expo prebuild --clean
cd android
./gradlew clean
cd ..
npm run android:device

```

