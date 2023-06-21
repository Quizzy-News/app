// import {View, Text, Button} from 'react-native';
// import React, {useEffect} from 'react';
// import { FIRESTORE_DB } from '../firebaseConfig';
// import { addDoc, collection } from 'firebase/firestore';

// const List = ({navigation}) => {

//     useEffect(() => {

//     }, [])

//     const addPlayer = async () => {
//         console.log('add')

//         const doc = addDoc(collection(FIRESTORE_DB, 'players'), {playerNum: 1, score: []})
//     }
//     return (
//         <View>
//             <Text>List</Text>
//         <Button onPress={addPlayer} title ="Add Player" />
//         </View>

//     )

// };

// export default List