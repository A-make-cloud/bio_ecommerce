import NavBar from '../components/layouts/Navbar.js'

import Footer from '../components/layouts/Footer.js'
import Concept from '../components/layouts/Concept.js';
import Phare from '../components/layouts/Phare.js';
import TopCategorie from '../components/layouts/TopCategorie.js';
function Home() {
    return (
        <div>
            <NavBar />
            <h1>home</h1>
            <Concept />
            <Phare />
            <TopCategorie />
            <Footer />
        </div >
    );
}

export default Home;