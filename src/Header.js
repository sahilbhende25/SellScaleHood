import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./Header.css";
import Logo from './robinhood.svg'

function Header() {
  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <img src={Logo} width={25}/>
      </div>
      <div className="header__search">
        <div className="header__searchContainer">
        <SearchOutlinedIcon />
          <input placeholder="Search: Ticker Name" type="text" />
        </div>
      </div>
      <div className="header__menuItems">
        <a href="/">PortFolio</a>
        <a href="/">History</a>
      </div>
    </div>
  );
}

export default Header;