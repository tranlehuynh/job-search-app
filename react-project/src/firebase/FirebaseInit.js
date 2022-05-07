import { initializeApp } from "firebase/app";
import FirebaseConfig from "../firebase/FirebaseConfig";

function FirebaseInit() {
    initializeApp(FirebaseConfig)
}

export default FirebaseInit