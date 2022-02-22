# City Explorer

## Hours of work track
https://docs.google.com/document/d/1LaBXteUXss_LnbVNX8veOXt5EDebm1RcOwW54OgdF5Y/edit?usp=sharing

## Set up
To set up the app, have NodeJS installed,  and then:
```
npm install
npm install -g expo-cli
```

To run on the web:
```
npm start
```
## Running the app
To run on a native device emulator, you must first install one. For example, the Genymotion emulator (more lightweight thatn Android Studio, and better fit for testing purposes/cross-platform). However, Android Studio's emulator might be easier to get running with Expo.

The other option is to run it on your own phone. Download Expo Go, and scan the QR code that you get when running `npm start`.

Follow these instructions to get the android emulator set up (note that in the part where it says to click configure, and then AVD, on more recent versions of Andorid Studio you must click the 3 dots in the top right corner, and then click Android Virtual Machine):
- https://docs.expo.dev/workflow/android-studio-emulator/

## Using react-native-maps
To use this module on android, we need to have an API key. To get this API key, a billing account is needed.

To use on iOS, given you use the iOS maps and not Google Maps, no API key is required.

Note that if using an API key from a billing account, do not store the key in this repo.
