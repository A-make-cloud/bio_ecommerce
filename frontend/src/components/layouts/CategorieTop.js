
//import {useEffect} from 'react';
//import {CatCartouche} from './Categories';
function CategorieTop({ categories }) {
    const cartoucheStyle = {
        display: 'flex', listStyle: 'none', width: '400px', borderRadius: '5px',
        margin: '3px', justifyContent: 'space-around', height: '61px',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        cursor: 'pointer'
    }


    return (
        <ul style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '0', marginTop: '40px' }}>
            {categories.map((c, i) => {
                return (
                    <li key={'cat_' + i} style={{ ...cartoucheStyle, backgroundColor: c.background }}
                    >

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
export default CategorieTop;
