import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZWtmYIxOY2H0YtU7RurmVgPxVv2WkMj0",
  authDomain: "toko-online-111.firebaseapp.com",
  projectId: "toko-online-111",
  storageBucket: "toko-online-111.appspot.com",
  messagingSenderId: "586942963989",
  appId: "1:586942963989:web:2201ea156c8fc34fbdc91c",
  measurementId: "G-5XSBJ26L2S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Cek apakah Firebase sudah terinisialisasi
console.log(firebase);

// Cloud Messaging service
var messaging = firebase.messaging();
messaging
  .getToken({ vapidKey: "xWaaCV_TNu8ENK30iLiAg2z7Re1CrTa-CGPcWJw2xWY" })
  .then((currentToken) => {
    console.log("FCM Token:", currentToken);
  })
  .catch((err) => {
    console.error("Error getting FCM token:", err);
  });

/*
const messaging = getMessaging();
getToken(messaging, { vapidKey: "xWaaCV_TNu8ENK30iLiAg2z7Re1CrTa-CGPcWJw2xWY" })
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      necessary;
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
onMessage(messaging, (payload) => {
  const notificationOption = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  if (Notification.permission === "granted") {
    var notification = new Notification(payload.notification.title, notificationOption);
    notification.onclick = function (ev) {
      ev.preventDefault();
      window.open("index.html", "_blank");
      notification.close();
    };
  }
});
*/
