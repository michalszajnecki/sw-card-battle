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
    onSnapshot,
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
        return await setDoc(docRef, stats);
    };

    const createNewGameroom = async (uid: string, resourceType: string) => {
        const colRef = collection($firestore, 'gameRooms');

        const gameRoomData = {
            guestId: '',
            ownerId: uid,
            resourceType: resourceType,
            created: new Date().getTime(),
        };

        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        return await setDoc(myDocRef, gameRoomData);
    };

    const updateGameRoom = async (guestId: string, uid: string) => {
        const colRef = collection($firestore, 'gameRooms');

        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        const docSnap = await getDoc(myDocRef);
        const gameRoomData = docSnap.data();
        if (gameRoomData) {
            gameRoomData.guestId = guestId;
            gameRoomData.full = true;
        }

        return await setDoc(myDocRef, gameRoomData);
    };

    const updateGameRoomCard = async (cardUid: string, uid: string, host: boolean) => {
        const colRef = collection($firestore, 'gameRooms');

        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        const docSnap = await getDoc(myDocRef);
        const gameRoomData = docSnap.data();
        if (gameRoomData) {
            if (host) {
                gameRoomData.hostCard = cardUid;
            } else {
                gameRoomData.guestCard = cardUid;
            }
        }

        return await setDoc(myDocRef, gameRoomData);
    };

    const clearGameRoomCards = async (uid: string) => {
        const colRef = collection($firestore, 'gameRooms');

        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        const docSnap = await getDoc(myDocRef);
        const gameRoomData = docSnap.data();
        if (gameRoomData) {
            delete gameRoomData.hostCard;
            delete gameRoomData.guestCard;
        }

        return await setDoc(myDocRef, gameRoomData);
    };

    const getRoomData = async (uid: string) => {
        const colRef = collection($firestore, 'gameRooms');
        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        const docSnap = await getDoc(myDocRef);
        return docSnap.data();
    };

    const removeRoom = async (uid: string) => {
        const colRef = collection($firestore, 'gameRooms');
        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        return await deleteDoc(myDocRef);
    };

    const observeRoomStatus = async (uid: string, captureFBEvents: Function) => {
        const colRef = collection($firestore, 'gameRooms');
        const docRef = doc(colRef, uid);

        return onSnapshot(
            docRef,
            (docSnapshot) => {
                captureFBEvents();
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            },
        );
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
        observeRoomStatus,
        updateGameRoom,
        getRoomData,
        updateGameRoomCard,
        clearGameRoomCards,
        removeRoom,
    };
}
