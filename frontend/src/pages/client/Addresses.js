import NavbarClient from './NavbarClient';
import { useState, useEffect } from 'react';
import {  Alert } from "@mui/material";
import AddressForm from '../../components/users/AddressForm'

export default function Addresses() {
    const [addresses, setAddresses] = useState([{},{}]);
    const [actions, setActions] = useState([{status:'loading'},{status:'loading'}]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')

    useEffect(() => {
        fetch("/addresses/addresses")
        .then((res) => { 
            setColor("")
            setMessage("")
            if(res.status === 200)
                return res.json()
            else if(res.status === 204){
                setColor("")
                setMessage("")
                //setActions([{method:'post', type:'livraison'}, {method:'post', type:'facturation'}])
            }else if(res.status !== 200 /*&& res.status !== 204*/) {
                setColor("error")
                setMessage("Une erreur est survenue")
                setActions([{status:'error'},{status:'error'}])
                throw new Error()
            }
        })
        .then((result) => {
            //prepare datas and actions for the forms
            if(result?.data.length===2){
                setAddresses(result.data)
                setActions([{type:'livraison'},{method:'post', type:'facturation'}])
            }else if(result?.data.length===1){
                if(result.data[0].type==='livraison'){
                    setAddresses([result.data[0], {}])
                    setActions([{type:'livraison'},{method:'post', type:'facturation'}])
                }else{
                    setAddresses([{}, result.data[0]])
                    setActions([{method:'post', type:'livraison'},{method:'post', type:'facturation'}])
                }
            }else{
                setActions([{method:'post', type:'livraison'}, {method:'post', type:'facturation'}])
            }
        })
        .catch((err) => {
            setColor("error")
            setMessage("Une erreur est survenue")
        })
    }, []);

    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <h2>Adresse de livraison</h2>
                <AddressForm address={addresses[0]} action={actions[0]}/>
                <h2>Adresse de facturation</h2>
                <AddressForm address={addresses[1]} action={actions[1]}/>
            </div>
        </div>
    )
}
