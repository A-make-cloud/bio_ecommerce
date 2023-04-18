import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()
function AuthProvider({ children }) {

    const [isLogged, setIsLogged] = useState();
    const [profil, setProfil] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        //recuperer le cookie 
        // console.log('document.cookie--->>>', document.cookie);
        // avec localstorage===>>//à supprimer si cookie fonctionne
/*
        const myValue = JSON.parse(localStorage.getItem('isLogged'));
        setIsLogged(myValue)*/
        //Attention, le localStorage est peu sécurisé, et même moins qu'un contexte React ! à supprimer donc.
        //On passe ici seulement au début. Donc on vérifier le Jwt avec le serveur et on obtient les détails à jour du user de la bdd. 
        //le point de terminaison /users/find-self est dédié à cela.

        fetch(`/users/find-self`, {
                method: 'GET',
                credentials: 'include', // inclus les cookies
            })
            .then(response => {
                return response.json()})
            .then((res) => {
                if(res.message ==="Found user"){
                    setUser(res.user)
                    setProfil(res.user.profil)
                    setIsLogged(true)
                }else{
                    throw new Error('utilisateur non logué')
                }
            })
            .catch((err)=>{
                //if jwt is not valid or user is not found, we got to make sure to unlog on client side
                setUser(null)
                setProfil(null)
                setIsLogged(false)
                // if(window.location.href.slice(-1) !== '/')
                //     window.location.href = '/'
            }
        )
/*
        const LSprofil = JSON.parse(localStorage.getItem('profil'))
        setProfil(LSprofil)
        //----------------------------- //user localstorage
        const LSuser = JSON.parse(localStorage.getItem('user'))
        //  /!\ ici le state profil sera undefined car c'est comme asynchrone
        //console.log("----------useEffect : user", JSON.parse(localStorage.getItem('user')), ' profil : ', LSprofil, 'isLogged', localStorage.getItem('isLogged'))

        if (LSuser) setUser(LSuser)
        // else setUser(user)
        //Remarque : les ressources sensibles sont déjà sécurisé avec le jwt du cookie du client coté serveur.
*/
    }, [])

    /**
     * ajouter user dans localstorage lors de la connexion
     * @param {*} user 
     */
    const connectUser = (user) => {
        setUser(user)
        //user : objet avec clés : email, firstname, id, lastname, profil
        //ajouter user dans local storage
        // localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Deconnexion user update local storage
     * @param {*} user 
     */
    async function logoutUser(user){
        //envoyer au server une demande de suppression, car le cookie ayant HttpOnly à true n'est pas accessible côté client
        //recuperer les info de la base de donnée 
        await fetch('/users/delete-cookie', {
            method: 'DELETE',
            credentials: 'include', // inclus les cookies dans la requête
            })
            .then(response => {
                // todo : Gérer la réponse de suppression du cookie
                if(response.status===200){
                    setUser(null)
                    setProfil(null)
                    setIsLogged(false)
                    //----supprimer user, profil, et isLogged du  local storage
                    // localStorage.setItem('user', null);
                    // localStorage.setItem('profil', null);
                    // localStorage.setItem('isLogged', null);
                }
            })
            .catch(error => {
                // Gérer l'erreur
            }
        );
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
        // localStorage.setItem('isLogged', JSON.stringify(status));
    }

    /**
     * 
     * @param {*} profil 
     */
    const updateProfil = (profil) => {
        setProfil(profil)
        // localStorage.setItem('profil', JSON.stringify(profil));
    }

    return (
        <AuthContext.Provider value={{ user, isLogged, profil, updateIslogged, updateProfil, connectUser, logoutUser, setProfil }} >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
