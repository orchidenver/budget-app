import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function fetchData(data, setNewData) {
    try {
        const querySnapshot = await getDocs(collection(db, data));
        const query = [];
        querySnapshot.forEach(doc => query.push(doc.data()));
        setNewData(query);
    } catch (error) {
        alert(error);
    }
}