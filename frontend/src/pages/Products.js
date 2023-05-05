import Categories from '../components/products/Categories';
import ProductCard from '../components/products/ProductCard';
import { useState, useRef, useEffect } from 'react';
import SyncIcon from '@mui/icons-material/Sync';
import { Link } from "react-router-dom";

function Products() {
  const batchSize = 10
  let batchOffset = 0
  let productsSaved = []
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState(categories.map(c => c.id));
  const spinnerRef = useRef();

  function getBatch(){
    fetch(`/products/find-all?offset=${batchOffset}&limit=${batchSize}`)
    .then(response => response.json())
    .then((res) => {
      const products = res.data
      if (products.length > 0)
        addNewBatch(products)
      if (products.length < batchSize)
        setIsLoading(false)
      //console.log('batchOffset ', batchOffset)
      batchOffset += batchSize
      //reverifier si le spinner est encore à l'écran
      observer.observe(spinnerRef.current)
    })
  }

  const observer = new IntersectionObserver(([elem]) => {
    if (elem.isIntersecting) {
      //récupérer dans la BDD un nouveau batch de produit
      getBatch()
      //unobserver pour pouvoir relancer l'observe après
      observer.unobserve(elem.target)
    }
  })

  //Ajouter le nouveau batch à la liste des produits à afficher
  function addNewBatch(newProducts) {
    const newProductsCards = newProducts.map((p, i) => <ProductCard key={'prod' + p.id} product={p} />)
    productsSaved = [...productsSaved, ...newProductsCards]
    setProducts([...productsSaved])
  }

  useEffect(() => {
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }
    //Récupération des catégories dans BDD quand on arrive sur la page
    async function fetchCat() {
      const response = await fetch('/categories/find-all')
      if (response.status === 200) {
        const json = await response.json()
        setCategories(json.data)
      } else {
        setCategories([{ id: 1, title: 'Un probleme est survenu, veuillez réessayer', img: "https://placehold.co/600x400" }])
      }
    }
    fetchCat()
  }, []);

  //Modification de l'affichage des produits quand une catégorie est selectionné
  useEffect(() => {
    setProducts([...products])
  }, [chosenCategories]);

  return (
    <>
      <main className="productsPage">
        <h1 style={{ textAlign: 'center' }}>Nos produits</h1>
        <Categories categories={categories} chosenCategories={chosenCategories} setChosenCategories={setChosenCategories} />
        {categories.length === chosenCategories.length || chosenCategories.length === 0 ?
          <p>Tout nos produits :</p>
          :
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {chosenCategories.map((c, i) => ' ' + c.title) + ' :'}
            <Link onClick={(e) => { setChosenCategories([]) }}>Afficher les produits de toutes les catégories</Link>
          </div>
        }
        <div className="productCards">
          {products.filter(p => {
            if (chosenCategories.length === 1)
              return p.props.product.category_id === chosenCategories[0].id
            else
              return true
          })}
        </div>{/*spinner ciblé par l'intersection observer */}
        {isLoading &&
          <div ref={spinnerRef} className="LoadingSpinner" >
            <SyncIcon />
          </div>
        }
      </main>
    </>
  );
}

export default Products;
