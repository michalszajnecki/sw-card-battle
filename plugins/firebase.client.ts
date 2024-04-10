import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    setDoc,
    collectionGroup,
    Timestamp,
} from 'firebase/firestore';
export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();

    console.log(config.FB_API_KEY);
    console.log(process.env.FB_API_KEY);

    const firebaseConfig = {
        apiKey: config.FB_API_KEY,
        authDomain: config.FB_AUTH_DOMAIN,
        projectId: config.FB_PROJECT_ID,
        storageBucket: config.FB_STORAGE_BUCKET,
        messagingSenderId: config.FB_MESSAGING_SENDER_ID,
        appId: config.FB_APP_ID,
        measurementId: config.FB_MEASUREMENT_ID,
    };

    // const firebaseConfig = {
    //     apiKey: 'AIzaSyAgMvjvTlx2bgU8MCs_Q3Z-SvboSuSd8aI',
    //     authDomain: 'sw-battle-emarts.firebaseapp.com',
    //     projectId: 'sw-battle-emarts',
    //     storageBucket: 'sw-battle-emarts.appspot.com',
    //     messagingSenderId: '988381200091',
    //     appId: '1:988381200091:web:68fe19f409f322f852d6fe',
    //     measurementId: 'G-GTP9WDE895',
    // };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const firestore = getFirestore(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);

    nuxtApp.vueApp.provide('firestore', firestore);
    nuxtApp.provide('firestore', firestore);

    // const snapshotRef = collection(firestore, 'userStats');
    // const snapshot = await getDocs(snapshotRef);

    // const docs = Array.from(snapshot.docs).map((doc) => {
    //     return {
    //         ...doc.data(),
    //     };
    // });
    // console.log({ docs });
});

//   import { firestoreDb } from "./firebase";

//   export const queryByCollection = async (col: string) => {
//     // @ts-ignore
//     const colRef = collection(firestoreDb, col);

//     const snapshot = await getDocs(colRef);

//     const docs = Array.from(snapshot.docs).map((doc) => {
//       return {
//         ...doc.data(),
//         id: doc.id,
//       };
//     });

//     return docs;
//   };
