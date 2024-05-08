import React from "react";
import {useStateContext} from "../../context"
const Header = () => {
  //contract data
  const {userBalance, disconnect,address,contract, connect}=useStateContext();

  return (
  <>
  <header class="rn-header haeder-default header--sticky">
    <div class="container">
      <div class="header-inner">
        <div class="header-left">
          <div class="logo-thumbnail logo-custom-css">
            {/* <a class="logo-light" href="/"> */}
              <a href="/"><h4 class="title">Brickchain</h4></a>
              {/* <img src="/logo/logo-white.png" alt="nft-logo" /> */}
            {/* </a> */}
            {/* <a class="logo-dark" href="/">
              <img src="/logo/logo-dark.png" alt = "nft-logo"/>
            </a> */}
          </div>
          <div class="mainmenu-wrapper">
            <nav id="sideNav" class="mainmenu-nav d-none d-xl-block">
              <ul class="mainmenu">
                
              <li>
                  <a href="/">Home</a>
                </li>
                
                <li>
                  <a href="/list">List your Property</a>
                </li>  
                
              </ul>
            </nav>
          </div>
        </div>
        <div class="header-right">
          <div class="setting-option d-none d-lg-block">
            <form class="search-form-wrapper" action="#">
              <input type="search" placeholder="Search Here" aria-label="Search"/>
              <div class="search-icon">
                <button>
                  <i class="feather-search"></i>
                  </button>  
              </div>
            </form>
          </div>
          <div class="setting-option rn-icon-list d-block d-lg-none">
            <div class="icon-box search-mobile-icon">
              <button>
                <i class="feather-search"></i>
              </button>
            </div>
            <form id="header-search-1"
             action="#"
             method="GET"
             class="large-mobile-blog-search"
             >
              <div class="rn-search-mobile form-group">
                <button type="submit" class="search-button">
                <i class="feather-search"></i>
                </button>
                <input type="text" placeholder="Search ..."/>
              </div>
              </form>  
          </div>


{/* connect wallet */}
{address?(""):(
  <div class="setting-option header-btn rbt-site-header" id="rbt-site-header">
  <div class="icon-box">
        <button onClick={()=>connect()} class="btn btn-primary-alta btn-small" >  Connect wallet</button>
        </div>
        </div>
)}
        {/* end connect wallet */}
        </div>
        <div class="setting-option rn-icon-list notification-badge">
        <div class="icon-box">
          <a href="#">
            <i class="feather-bell"></i>
            <span class="badge">1</span>
          </a>
        </div>
        </div>
{
  address?(
    <div >
        <div class="setting-option rn-icon-list user-account">
          <div class="icon-box">
            <a href="#">
              <img src="/icons/boy-avater.png" alt="Images" />
            </a>
            <div class="rn-dropdown">
              <div class="rn-inner-top">
                <h4 class="title">
                  <a href="#"> {address.slice(0,15)}...</a>
                </h4>
              {/* <span>
                <a href="#">Set Display Name</a>
              </span> */}
              </div>
              <div class="rn-product-inner">
                <ul class="product-list">
                  <li class="single-product-list">
                   
                    <div class="content">
                      <h6 class="title">
                        <a href="product-details.html">Balance</a>
                      </h6>
                        <span class="price">{userBalance?.slice(0,6)} FTM</span>
                    </div>
                  </li>
                
                </ul>
              </div>
              <div>
                <div>
                  <a class="btn btn-primary-alta w-100" target="_blank" href="https://faucet.fantom.network/"> Add more funds</a>
                </div>
                <ul class="list-inner">
                  <li>
                    <a href="/">My Profile</a>
                  </li>
                  <li>
                    <a href="/">Edit Profile</a>
                  </li>
                  <li>
                    <a href="/">Manage Funds</a>
                  </li>
                  <li>
                    <a href="#" onClick={()=>disconnect()}>Disconnect</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-option mobile-menu-bar d-block d-xl-none">
          <div class="hamberger">
            <button class="hamberger-button">
              <i class="feather-menu"></i>
            </button>
          </div>
        </div>
        </div>

  ):(
    ""
  )
}
      </div>
    </div>
  </header>
  </>
  
  );
};

export default Header;
