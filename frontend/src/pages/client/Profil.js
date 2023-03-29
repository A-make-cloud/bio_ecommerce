import { useEffect, useState } from 'react';
import NavbarClient from './NavbarClient';


export default function Profil() {
    const [userBd, setUserBd] = useState();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    console.log(user.id)
    useEffect(() => {
        if (user) {
            //recuperer les info de la base de donnée 
            fetch(`/users/find/${user.id}`)
                .then(response => response.json())
                .then((res) => {
                    console.log(res)
                    setUserBd(res.data)

                })

        }
    }, []);

    return (
        <>
            <NavbarClient />
            <h2>Mon profil  {userBd ? userBd.firstname : "user.firstname"}</h2>
        </>)
}
