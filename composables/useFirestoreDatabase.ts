// import { getDatabase, ref, query, orderByChild, limitToFirst, push, set } from 'firebase/database';
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
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
export default function () {
    // const user = useState<User | null>('fb_user', () => null);
    const { $firestore } = useNuxtApp();
    const user = useState<User | null>('fb_user', () => null);

    const getCollectionData = async (col: string) => {
        const colRef = collection($firestore, 'userStats');
        const snapshot = await getDocs(colRef);
        const docs = Array.from(snapshot.docs).map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });

        console.log({ docs });

        return docs;
    };

    //   export const set = async (col: string, document: Object) => {
    //     await setDoc(doc(collection(firestoreDb, col)), document, { merge: true });
    //   };

    const addNewUserData = async (uid: string) => {
        const colRef = collection($firestore, 'userStats');

        // TODO: move to separate config file
        const stats = {
            uid: uid,
            won: 0,
            lost: 0,
            lastMatches: [{ won: true, timestamp: new Date().getTime() }],
        };

        const myDocRef = doc(colRef, uid);

        return await setDoc(myDocRef, stats);
    };

    const getUserData = async (uid: string) => {
        const docRef = doc($firestore, 'userStats', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    };

    const updateUserData = async (uid: string, stats) => {
        const colRef = collection($firestore, 'userStats');
        const docRef = doc(colRef, uid);
        console.log(uid);
        console.log(stats);

        return await setDoc(docRef, stats);
    };

    const createNewGameroom = async (uid: string, resourceType: string, roomName: string) => {
        const colRef = collection($firestore, 'gameRooms');

        const gameRoomData = {
            guestId: '',
            ownerId: uid,
            resourceType: resourceType,
            roomName: roomName,
            created: new Date().getTime(),
        };

        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user

        return await setDoc(myDocRef, gameRoomData);
    };

    const getRooms = async () => {
        const colRef = collection($firestore, 'gameRooms');
        const snapshot = await getDocs(colRef);
        const docs = Array.from(snapshot.docs).map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });

        console.log({ docs });

        return docs;
    };

    return {
        getCollectionData,
        addNewUserData,
        getUserData,
        createNewGameroom,
        updateUserData,
        getRooms,
    };
}
