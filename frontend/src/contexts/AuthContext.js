import { createContext, useEffect, useState } from "react";
//import { useCookies } from 'react-cookie';
const AuthContext = createContext()
function AuthProvider({ children }) {

    const [isLogged, setIsLogged] = useState(false);
    const [profil, setProfil] = useState();

    const [user, setUser] = useState();

    // const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    // console.log("cookies-----> access_token", cookies)


    useEffect(() => {
        //recuperer le cookie 
        // console.log('document.cookie--->>>', document.cookie);
        // avec localstorage===>>//à supprimer si cookie fonctionne
        const myValue = localStorage.getItem('isLogged');
        // console.log("localstorage", myValue)
        if (myValue === 'true') setIsLogged(true)
        else setIsLogged(false)
        //  console.log("localStorage.getItem('profil') ", localStorage.getItem('profil'))
        setProfil(localStorage.getItem('profil'))

        // //----------------------------- //user localstorage
        // const user = localStorage.getItem('user');
        // console.log("----------useeffect", user)

        // if (user) setUser(user)
        // else setUser(user)

    }, [])


    /**
     * ajouter user dans localstorage lors de la connexion
     * @param {*} user 
     */

    const connectUser = (user) => {
        setUser(user)

        //ajouter user dans local storage
        localStorage.setItem('user', JSON.stringify(user));

    }

    /**
     * Deconnexion user update local storage
     * @param {*} user 
     */
    const logoutUser = (user) => {
        setUser(null)
        setProfil(null)
        setIsLogged(false)
        //----supprimer user profil isLogged du  local storage
        localStorage.setItem('user', null);
        localStorage.setItem('profil', null);
        localStorage.setItem('isLogged', null);

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

    /**
     * 
     * @param {*} profil 
     */
    const updateProfil = (profil) => {
        setProfil(profil)
        localStorage.setItem('profil', profil);
    }






    return (
        <AuthContext.Provider value={{ user, isLogged, profil, updateIslogged, updateProfil, connectUser, logoutUser, setProfil }} >
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }