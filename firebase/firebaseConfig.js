import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firebaseConfig } from "./config";



const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export async function testFb() {
    const db = getFirestore(app);
    const date = '2024-01-26'
    const querySnapshot = await getDocs(collection(db, 'dailies', `${date}`, 'questions'));
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    // });
    return [...querySnapshot.docs.map(doc => {doc.data()})]
    

}

export async function getDailyQuiz() {
    const db = getFirestore(app);
    const date = '2024-01-26'
    const q = query(collection(db, 'dailies', `${date}`, 'questions'), where("approved", "==", true));
    //const querySnapshot = await getDocs(collection(db, 'dailies', `${date}`, 'questions'));
    const querySnapshot = await getDocs(q);
    
    const quiz = []
    
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        quiz.push(doc.data())
    });

    return quiz.slice(0,5);
    
}


