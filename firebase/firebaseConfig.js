import { initializeApp } from "firebase/app";

import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { firebaseConfig } from "./config";

const today = new Date();
const todayFormatted = today.toISOString().split('T')[0];
function formatDay(date) {
    return date.toISOString().split('T')[0];
}

const app = initializeApp(firebaseConfig);


//export const firestore = getFirestore(app);

// export async function testFb() {
//     const db = getFirestore(app);
//     const date = todayFormatted
//     const querySnapshot = await getDocs(collection(db, 'dailies', `${date}`, 'questions'));
//     // querySnapshot.forEach((doc) => {
//     //     console.log(doc.id, '=>', doc.data());
//     // });
//     return [...querySnapshot.docs.map(doc => {doc.data()})]
    

// }



export async function getDailyQuiz(day) {
    const db = getFirestore(app);

    const date = day ? day : todayFormatted;
    // const date = '2024-09-26'//test date for testing
    const q = query(doc(db, 'dailies', `${date}`));
    const querySnapshot = await getDoc(q);

    return {
    quiz: querySnapshot.data()?.quiz?.filter((question) => question.approved) || [] 
    }    

}

// export async function getDailyQuiz() {
//     const db = getFirestore(app);
//     const date = '2024-09-26'//todayFormatted
//     console.log("Date: ", date)
//     // const q = query(collection(db, 'dailies', `${date}`, 'quiz'), where("approved", "==", true));
//     const q = query(doc(db, 'dailies', `${date}`));
//     const querySnapshot = await getDoc(q);
    
//     const quiz = querySnapshot.data();

//     return quiz;
//   }



export async function getDailyPixieQuiz() {
    const db = getFirestore(app);
    const date = '2024-03-05';
    // const date = todayFormatted;

    const q = query(doc(db, 'pixieBrix1', `${date}`));
    const querySnapshot = await getDoc(q);

    const quiz = querySnapshot.data();

    return quiz;

}

// MONICA'S NOTES
// getDailyQuiz() is async because it is waiting for data to be fetched from Firestor (see db).
// The function returns quiz, which is an object containing the data fetched from the specified document in the dailies collection for the given date.
    // db: Initializes a connection to the database
    // date: Accesses the date from todayFormatted
    // q:   Creates a query for a document that is based on date from the dailies collection
            // QUESTION: Are we getting a single document? From ChatGPT:
                //  It's worth noting that this code snippet directly creates a document reference 
                // using doc()and then unnecessarily wraps it withquery(). 
                // For fetching a single document, doc()would suffice withoutquery()`. 
    // querySnapshot: Retrieves the document that q is pointing to. Because accessing Firestore involves network requests (which are asynchronous operations), 
    // await is used to wait for the operation to complete.

    // quiz: Processes the fetched data. querySnapshot.data() extracts the data from q.
    //  This returns an object The data() method returns the document's data as an object where the document's field names are keys, 
    // and the document's field values are the values of those keys.
    // 