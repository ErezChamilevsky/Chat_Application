import React, { useState } from 'react';
import './css/home-page.css'; // optional for custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/utilities/NavBar';

function App() {

    return(
    <div>
        <div class='top-bar'>
            <NavBar></NavBar>
        </div>
            <button type="button" className="btn btn-primary">Base class</button>

    </div>
    );
}

export default App;
