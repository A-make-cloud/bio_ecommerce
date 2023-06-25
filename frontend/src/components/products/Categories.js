
//import {useEffect} from 'react';
//import {CatCartouche} from './Categories';

function Categories({ categories, chosenCategories, setChosenCategories }) {

    function switchCat(id, title) {
        setChosenCategories([{ id, title }])
    }

    return (
        <ul style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '0', marginTop: '40px' }}>
            {categories.map((c, i) => {
                return (
                    <li key={'cat_' + i} style={{ backgroundColor: c.background }} className='categoryCartouche'
                        onClick={e => switchCat(c.id, c.title)}>

                        <h3>{c.title}</h3>
                        <div style={{
                            width: '61px', height: '61px', backgroundImage: `url(${c.img})`, backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center', backgroundSize: 'cover'
                        }}>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}
export default Categories;
