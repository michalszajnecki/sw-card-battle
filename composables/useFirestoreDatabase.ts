import { collection, getDocs, getDoc, deleteDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
export default function () {
    const { $firestore } = useNuxtApp();

    const getCollectionData = async (col: string) => {
        const colRef = collection($firestore, 'userStats');
        const snapshot = await getDocs(colRef);
        const docs = Array.from(snapshot.docs).map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        return docs;
    };

    const addNewUserData = async (uid: string) => {
        const colRef = collection($firestore, 'userStats');
        const myDocRef = doc(colRef, uid);
        const stats = {
            uid: uid,
            won: 0,
            lost: 0,
            lastMatches: [{ won: true, timestamp: new Date().getTime() }],
        };
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
        const myDocRef = doc(colRef, uid); // use uid to limit rooms to 1 per user
        const gameRoomData = {
            guestId: '',
            ownerId: uid,
            resourceType: resourceType,
            created: new Date().getTime(),
        };
        return await setDoc(myDocRef, gameRoomData);
    };

    const updateGameRoom = async (guestId: string, uid: string) => {
        const colRef = collection($firestore, 'gameRooms');
        const myDocRef = doc(colRef, uid);
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
        const myDocRef = doc(colRef, uid);
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
        const myDocRef = doc(colRef, uid);
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
        const myDocRef = doc(colRef, uid);
        const docSnap = await getDoc(myDocRef);
        return docSnap.data();
    };

    const removeRoom = async (uid: string) => {
        const colRef = collection($firestore, 'gameRooms');
        const myDocRef = doc(colRef, uid);
        return await deleteDoc(myDocRef);
    };

    const observeRoomStatus = async (uid: string, captureFBEvents: Function) => {
        const colRef = collection($firestore, 'gameRooms');
        const docRef = doc(colRef, uid);

        return onSnapshot(
            docRef,
            () => {
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
