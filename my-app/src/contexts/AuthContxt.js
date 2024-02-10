import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = getAuth();

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function createUser(email,password) {
        return createUserWithEmailAndPassword(Auth, email,password)
            .then((userCredential)=>{
                setCurrentUser(userCredential);
                return userCredential;
            })
            .catch(error =>{
                    console.error('Error creating user', error);
                    throw error;
                });
    }


    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsub
    }, [setCurrentUser, setLoading])

    const value = {
        currentUser,
        createUser,
        loading
    }
  return (
    <AuthContext.Provider value = {value}>
        {children}
    </ AuthContext.Provider>
  )
}
