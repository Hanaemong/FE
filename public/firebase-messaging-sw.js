importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDXuAKcRyND9L09PPJYmJBLQxHRhmdCnaw",
	authDomain: "hanalink-d8253.firebaseapp.com",
	projectId: "hanalink-d8253",
	storageBucket: "hanalink-d8253.appspot.com",
	messagingSenderId: "277015590741",
	appId: "1:277015590741:web:4f8e085d696c85b64261dc",
	measurementId: "G-1E4EDTS5D5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/public/images/moim/money.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
