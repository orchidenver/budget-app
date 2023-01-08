import { useState, useEffect } from "react";
import { db } from '../utils/firebase';
import { collection, getDocs } from "firebase/firestore";
import { fetchData } from "../utils/fetchData";

export function useData(data) {
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        fetchData(data, setFetchedData);
    }, []);

    return [fetchedData, setFetchedData];
}