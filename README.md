# APP NAME:
CHATTER

# OVERVIEW:
Chatter is a chat app for mobile devices created using React Native. The app will provide users with a chat interface with 2 screens - a start screen and a chat screen.

# FEATURES:
A start page where users can enter their name and press a button after selecting a color swatch
The user can then select the background color for the chat screen before joining the chat.
Two different users can login to the chat to exchange thoughts and ideas.
The messages can be stored on Firebase when connected to the internet. When offline, the messages are stored on client-side using asyncstorage from React Native and are loaded from the cached data.

# TECH STACKS
React Native
Expo
GiftedChat
Firebase - for message storage (serverside)
Expo's ImagePicker API - launchImageLibraryAsync, launchCameraAsync
Expo's Location API - MapView Component, latitudeDelta, longitudeDelta to set the size of the shared map
Expo's Blob function
GiftedChat's renderActions prop, ActionSheet Component



# LAUNCHING THE APP:
Run the command npm start or expo start in the terminal. The below commands will show up, upon pressing i the expo project for Chatter will launch on iOS simulator
Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press d │ show developer tools
› shift+d │ toggle auto opening developer tools on startup (disabled)

› Press ? │ show all commands

Install permissions for image picker
expo install expo-permissions
expo install expo-image-picker

Install access to geo-location sharing
expo install expo-location
expo install react-native-maps

Turn files into Blobs to store in Firebase
use expo's blob() function



# SCREENSHOTS ATTACHED:

Home Screen upon launch of the App:

<img width="496" alt="Screen Shot 2022-03-14 at 8 21 57 PM" src="https://user-images.githubusercontent.com/80176993/158283236-58fb1ce8-0b10-49b9-ba46-d57012d1040f.png">


After logging into the chat screen:

<img width="472" alt="Screen Shot 2022-04-09 at 12 25 03 PM" src="https://user-images.githubusercontent.com/80176993/162582706-006ac89c-de9a-4e26-99a4-abba494ca56c.png">


Sending pics, location:

<img width="568" alt="Screen Shot 2022-04-11 at 10 16 32 PM" src="https://user-images.githubusercontent.com/80176993/162865918-9d1864ca-94f0-4fa1-90f5-71fc4a3fd419.png">

