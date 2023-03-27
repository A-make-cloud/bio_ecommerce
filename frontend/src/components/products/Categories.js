
//import {useEffect} from 'react';
//import {CatCartouche} from './Categories';

function Categories({ categories, chosenCategories, setChosenCategories }) {
    const cartoucheStyle={display:'flex',  listStyle:'none', width:'300px', borderRadius:'5px', 
        margin:'3px', justifyContent:'space-around', height:'61px',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        cursor:'pointer'
    }

    function switchCat(id, title){
        setChosenCategories([{id, title}])
    }

    return (
        <ul style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', padding:'0', marginTop:'40px'}}>
            {categories.map((c, i)=> {return(
                <li key={'cat_'+i} style={{...cartoucheStyle, backgroundColor:c.color}}
                    onClick={e=>switchCat(c.id, c.title)}>

                    <h3>{c.title}</h3>
                    <div style={{width:'61px', height:'61px', backgroundImage: `url(${c.icon})`, backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    </div>
                </li>
            )})}
        </ul>
      );
    }
    export default Categories;
