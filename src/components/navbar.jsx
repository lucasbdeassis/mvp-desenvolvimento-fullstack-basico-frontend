import React from 'react';

function Navbar() {
  return (
    <ul className="nav justify-content-center">
    <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Active</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
    </li>
    <li className="nav-item">
        <a className="nav-link disabled">Disabled</a>
    </li>
    </ul>
  );
}

export default Navbar;