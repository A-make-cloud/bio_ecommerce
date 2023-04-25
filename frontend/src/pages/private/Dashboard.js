import { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [adminSummary, setAdminSummary] = useState({});

    useEffect(() => {
        /*Promise.allSettled([
            fetch("/admin/summary").then((res) => res.json()),
            fetch("/products/out-of-stockk").then((res) => res.json()),
          ])
            .then(([summary, outOfStock]) => {
                setAdminSummary({
                    totalProd:summary.value.data[0].total + summary.value.data[1].total, 
                    activProd:summary.value.data[0].total ,
                    outOfStock:outOfStock.value.results[0].total,
                    lowStock:outOfStock.value.results[1].total,
                })
            })
            .catch((err) => console.error(err));*/
        fetch("/admin/summary").then((res) => res.json())
          .then((data) => {
              setAdminSummary(data.result)
          })
          .catch((err) => console.error(err));


    }, []);

    return (
        <div className="adminBody">
            <NavbarAdmin />
            <main>
                <h1>Espace d'administration</h1>
                <h2>Résumé des informations :</h2>
                {console.log()}
                <p>Il y a <b>{adminSummary[0]?.data}</b> produits enregistrés, dont <b>{adminSummary[1]?.data}</b> proposés à la vente.</p>
                <p>Il y a <b>{adminSummary[2]?.data}</b> produits en rupture de stock, et <b>{adminSummary[3]?.data}</b> produits en faible quantité.</p>
                <p>Les produits sont répartis en <b>{adminSummary[4]?.data}</b> categories.</p>
                <p>Il y a <b>{adminSummary[5]?.data}</b> commandes qui attendent d'être traités, et <b>{adminSummary[6]?.data}</b> commandes en cours de traitement</p>
                <p>Il y a <b>{adminSummary[7]?.data}</b> utilisateurs dont <b>{adminSummary[8]?.data}</b> nouveaux cette semaine</p>
            </main>
        </div>
    )
}
export default Dashboard
