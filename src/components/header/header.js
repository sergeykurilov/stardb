import React from 'react';

import './header.css';

const Header = ({onServiceChange}) => {
    return (
        <div className="header d-flex">
            <h3>
                <a href="http://localhost:3000/">
                    StarDB
                </a>
            </h3>
            <ul className="d-flex">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="http://localhost:3000/">People</a>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="http://localhost:3000/">Planets</a>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="http://localhost:3000/">Starships</a>
                </li>
            </ul>

            <button onClick={onServiceChange} className='btn btn-primary btn-small'>
                Change Service
            </button>
        </div>
    );
};

export default Header;
