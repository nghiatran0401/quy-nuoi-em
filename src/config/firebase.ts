/**
 * Firebase web client config.
 *
 * These values are public by design (see Firebase docs). Env vars override
 * them when set — useful for preview/staging without code changes.
 *
 * Project: quy-nuoi (Firebase console). If you use a different Firebase
 * project (e.g. quy-nuoi-em), replace this object from Project settings →
 * General → Your apps → Web app config.
 */
export const firebaseClientConfig = {
  apiKey: "AIzaSyAeAiW49Q7z_IGeh7xT0s4WS0i9xH_QmxI",
  authDomain: "quy-nuoi.firebaseapp.com",
  projectId: "quy-nuoi",
  storageBucket: "quy-nuoi.firebasestorage.app",
  messagingSenderId: "735542161236",
  appId: "1:735542161236:web:73474b528fe43d8863a2c1",
  measurementId: "G-FCWP7SD62N",
} as const;

export const firebaseMeasurementId = firebaseClientConfig.measurementId;
