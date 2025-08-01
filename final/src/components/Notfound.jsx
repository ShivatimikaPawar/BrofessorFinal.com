import React from 'react';
import { Link } from 'react-router-dom';

function Notfound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for does not exist.</p>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Go to Home
            </Link>
        </div>
    );
}

export default Notfound;
