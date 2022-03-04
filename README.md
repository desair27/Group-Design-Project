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
expo start
```
## Running the app
To run on a native device emulator, you must first install one. For example, the Genymotion emulator (more lightweight thatn Android Studio, and better fit for testing purposes/cross-platform). However, Android Studio's emulator might be easier to get running with Expo.

The other option is to run it on your own phone. Download Expo Go, and scan the QR code that you get when running `npm start`.

Follow these instructions to get the android emulator set up (note that in the part where it says to click configure, and then AVD, on more recent versions of Andorid Studio you must click the 3 dots in the top right corner, and then click Android Virtual Machine):
- https://docs.expo.dev/workflow/android-studio-emulator/

## Using react-native-maps
To use this module on android, we need to have an API key. To get this API key, a billing account is needed.

Google Maps is required instead of Apple maps (applicatble if running on iOS device) because of the react-native-maps-directions dependancy.

Reminder to not store any API key, especially one connected to a billing account, in this repo.

## Simulating the location on an emulator on Windows 10
- Enable telnet
- Open the command line
- Enter 'telnet localhost 5554'
- Follow instructions on screen to authenticate (e.g. auth AorHsFy4jpuB/ScO)
- Enter 'geo fix 53.3432489 -6.2685455'
