import { createContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
const AuthContext = createContext()
function AuthProvider({ children }) {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState();

    // const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    // console.log("cookies-----> access_token", cookies)







    useEffect(() => {
        //recuperer le cookie 
        console.log('document.cookie--->>>', document.cookie);
        // avec localstorage===>>//à supprimer si cookie fonctionne
        const myValue = localStorage.getItem('isLogged');
        console.log("localstorage", myValue)
        if (myValue === 'true') setIsLogged(true)
        else setIsLogged(false)
    }, [])

    /**
     * ajouter user dans localstorage lors de la connexion
     * @param {*} user 
     */

    const connectUser = (user) => {
        setUser(user)
        //ajouter user dans local storage
        localStorage.setItem('user', user);

    }
    const logoutUser = (user) => {
        setUser(null)
        //supprimer user du  local storage
        localStorage.setItem('user', null);

    }
    //recuperer le cok
    /**
     * update status contexte
     * @param {*} status  'true' or 'false' chaine de caractere car local storage ne prens pas le boolean 
     */
    const updateIslogged = (status) => {

        const update = status === 'true';//renvoi true or false
        setIsLogged(update)
        //ajouter isLogged dans local storage
        localStorage.setItem('isLogged', status);
    }
    return (
        <AuthContext.Provider value={{ user, isLogged, updateIslogged, connectUser, logoutUser }} >
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }