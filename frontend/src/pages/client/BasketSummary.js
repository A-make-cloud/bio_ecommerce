//import NavbarClient from './NavbarClient';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  Alert, Button } from "@mui/material";
import AddressForm from '../../components/users/AddressForm'
import { BasketContext } from '../../contexts/BasketContext'

export default function BasketSummary() {
    const [addresses, setAddresses] = useState([{},{}]);
    const [actions, setActions] = useState([{status:'loading'},{status:'loading'}]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    const { basket, getItemsWithDetails, getTotalTva, getTotalTtc } = useContext(BasketContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/addresses/addresses")
        .then((res) => { 
            setColor("info")
            setMessage("Veuillez renseigner vos deux adresses")
            if(res.status === 200)
                return res.json()
            else if(res.status === 204){
                setActions([{method:'post', type:'livraison'}, {method:'post', type:'facturation'}])
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
                setColor("")
                setMessage("")
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
            console.log(err)
            setColor("error")
            setMessage("Une erreur est survenue")
        })
    }, []);

    function nextPage(){
        //checking that both the addresses are well registred before continuing to payment
        fetch("/addresses/addresses")
        .then((res) => { 
            if(res.status === 200) return res.json()
            else throw new Error()
        })
        .then((result) => {
            if(result?.data.length===2) navigate('/payment-form')
            else{
                setColor("warning")
                setMessage("Veuillez renseigner vos deux adresses")
            }
        })
        .catch((err) => {
            console.log(err)
            setColor("error")
            setMessage("Une erreur est survenue")
        })
    }

    return (
            <div style={{maxWidth:'600px', marginLeft:'auto', marginRight:'auto'}} >
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <h2>Panier : </h2>
                <p><b>Nombre d'article : {basket.items.length} </b></p>
                <p><b>Total TTC : {Math.floor((getTotalTtc()) * 100) / 100} €</b></p>
                <h2>Vérifiez vos adresses : </h2>
                <h3>Adresse de livraison</h3>
                <AddressForm address={addresses[0]} action={actions[0]}/>
                <h3>Adresse de facturation</h3>
                <AddressForm address={addresses[1]} action={actions[1]}/>
                <Button
                    onClick={nextPage}
                    variant="contained"
                    sx={{ backgroundColor: '#FFB300', color: 'black', marginBottom:'15px' }}
                    fullWidth
                >
                    Continuer vers le payement
                </Button> 
            </div>
    )
}
