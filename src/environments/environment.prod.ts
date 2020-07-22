import versionStruct from "./version.json"

export const environment = {
  production: true,
  version: versionStruct.major + '.' + versionStruct.minor + '-' + versionStruct.appState,
  firebaseConfig : {
    apiKey: "AIzaSyARPo2F0gCiWbI_ZC-pnbZ73lxmzxD0Isk",
    authDomain: "finlinup.firebaseapp.com",
    databaseURL: "https://finlinup.firebaseio.com",
    projectId: "finlinup",
    storageBucket: "finlinup.appspot.com",
    messagingSenderId: "14247841224",
    appId: "1:14247841224:web:26273192948c28dd2a84fd",
    measurementId: "G-FMRHD0T9TP"
  }
};
