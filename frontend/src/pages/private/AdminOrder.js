import NavbarAdmin from './NavbarAdmin';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button, Alert, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function AdminOrder() {
    const params = useParams()
    const orderId = params.id;
    const stateColors = {new:'#fffbaa', process:'#aaffb7', expedited:'#aae9ff', canceled:'#dcdcdc'}
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetch(`/commandes/admin-order/${orderId}`)
        .then(res => {
            if (res.status === 200)
                return res.json()
            else if (res.status === 500) {
                setColor("error")
                setMessage("Une erreur est survenue !")
            }else{
                throw new Error()
            }
        })
        .then(result => {
            setColor("")
            setMessage("")
            console.log(result)
            setOrder(result.data ?? {})
        })
        .catch(err => { 
            setColor("error")
            setMessage("Une erreur est survenue sur le réseau !")
        })
    }, []);

    const columns = [
        {
            field: 'product', headerName: 'Produit', width: 190,
            valueGetter: (params) => { return `${params.row?.Product?.title} #${params.row?.product_id}` }
        },
        {
            field: 'quantity', headerName: 'Quantité', width: 80,
            valueGetter: (params) => { return params.row.quantity }
        },
        {
            field: 'total_ht', headerName: 'Total HT', width: 90,
            valueGetter: (params) => { return params.row.price_ht+' €' }
        },
        { field: 'tva', headerName: 'Taxes', width: 80 },
        {
            field: 'total_ttc', headerName: 'Total TTC', width: 90,
            valueGetter: (params) => { return ( Math.floor(Number(params.row.price_ht) * (Number(params.row.tva) + 100)) / 100)+' €' }
        },
    ];

    const validationSchema = yup.object(
        {
            state: yup.string()
                .required("*")
            ,
            notes: yup
                .string()
                .max(1500, 'Maximum 1500 charactères')
        }
    );
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            state: order?.state??'process',
            notes: order?.notes ?? ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            fetch('/commandes/admin-order/update/'+orderId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include' // inclure les cookies dans la requête
            })
            .then(response => {
                if (response.status === 200) {
                    setColor("success")
                    setMessage("Commande mise à jour")
                } else if(response.status === 500 || response.status === 400 ){
                    setColor("error")
                    response.json().then(result=>{
                        setMessage(result.error)
                    })
                }
                else{ throw new Error() }
            })
            .catch(err => {
                setColor("error")
                setMessage("Un problème est survenu sur le réseau !")
            })
        },
    });

    return (
        <div className="adminBody">
            <NavbarAdmin />
            <div className="//clientContent">
                <h1>Commande #{order?.reference}</h1>
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <div style={{display:'flex', /*justifyContent:'space-between',*/ }}>
                    <div style={{
                        width:'50%',
                        margin: '20px 10px',
                        padding: '10px', borderRadius: '8px',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                    }}>
                        <h4>Adresse de facturation</h4>
                        <p>{order?.user?.civility} {order?.user?.firstname} {order?.user?.lastname}</p>
                        <p>{order?.billingAddress?.street}</p>
                        {order?.billingAddress?.complement&&<p>{order?.billingAddress?.complement}</p>}
                        <p>{order?.billingAddress?.city}</p>
                        <p>{order?.billingAddress?.zipcode}</p>
                        {order?.billingAddress?.information&&<p>{order?.billingAddress?.information}</p>}
                    </div>
                    <div style={{
                        width:'50%',
                        margin: '20px 10px',
                        padding: '10px', borderRadius: '8px',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                    }}>
                        <h4>Adresse de livraison</h4>
                        <p>{order?.user?.civility} {order?.user?.firstname} {order?.user?.lastname}</p>
                        <p>{order?.deliveryAddress?.street}</p>
                        {order?.deliveryAddress?.complement&&<p>{order?.deliveryAddress?.complement}</p>}
                        <p>{order?.deliveryAddress?.city}</p>
                        <p>{order?.deliveryAddress?.zipcode}</p>
                        {order?.deliveryAddress?.information&&<p>{order?.deliveryAddress?.information}</p>}
                    </div>
                </div>
                <h2>Payement</h2>
                <p>Référence du payement : {order?.payement_ref}</p>
                <p>Total HT : {Math.floor((order?.Commande_lines?.reduce((sum, cur) => Number(cur.price_ht) + sum, 0) * 100)) / 100} €
                    
                </p>
                <p>Total taxes : {Math.floor((order?.Commande_lines?.reduce((sum, cur) => (Number(cur.price_ht) * Number(cur.tva) / 100) + sum, 0) * 100)) / 100}
                    
                 €</p>
                <p>Total TTC : <b>
                    {Math.floor((order?.Commande_lines?.reduce((sum, cur) => (Number(cur.price_ht) * (Number(cur.tva) + 100) / 100) + sum, 0) * 100)) / 100} €
                </b></p>
                <h2>Produits commandés</h2>
                <DataGrid
                    autoHeight {...order.Commande_lines ?? []}
                    loading={message==='Chargement en cours...'}
                    rows={order.Commande_lines ?? []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                <h2>Etat d'avancement</h2>
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <form onSubmit={formik.handleSubmit} className="progressForm">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Etat de la commande</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                        >
                            {Object.entries(stateColors).map(s=>
                                <FormControlLabel key={'c_'+s[0]} value={s[0]} control={<Radio />} label={s[0]+' '} style={{backgroundColor:s[1]}} />
                            )}

                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="notes"
                        name="notes"
                        label="Notes concernant la commande"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        error={formik.touched.notes && Boolean(formik.errors.notes)}
                        helperText={formik.touched.notes && formik.errors.notes}
                        spacing={5}
                        multiline
                        minRows={2}
                        maxRows={Infinity}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Mettre à jour
                    </Button>
                </form>
                <Link to="/dashboard/orders"><Button variant="contained" sx={{ /*width: '100%',*/ backgroundColor: "#FFB300", color: 'black', marginBottom: '10px' }}>Revenir à la liste des commandes</Button></Link>
            </div>
        </div>)
}
