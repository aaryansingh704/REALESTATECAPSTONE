import '../styles/globals.css'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import React from 'react';
// import { env } from 'dotenv';
import { StateContextProvider } from '../context';
function MyApp({ Component, pageProps }) {



  return (<>
  <ThirdwebProvider activeChain={ChainId.FantomTestnet} clientId='5776dbb953b4166710d701f4798b5569'>
    <StateContextProvider>
  <Component {...pageProps} />
  </StateContextProvider>
  </ThirdwebProvider>


    {/* <script src='/js/vendor/backtoTop.js'></script> */}
    <script src='/js/vendor/bootstrap.min.js'></script>
    <script src='/js/vendor/count-down.js'></script>
    <script src='/js/vendor/jquery-appear.js'></script>
    <script src='/js/vendor/jquery-ui.js'></script>
    <script src='/js/vendor/feather.min.js'></script>
    <script src='/js/vendor/imageloaded.js'></script>
    <script src='/js/vendor/isotop.js'></script>
    
    
    <script src='/js/vendor/jquery.custom-file-input.js'></script>
    <script src='/js/vendor/jquery.js'></script>
    <script src='/js/vendor/jquery.nice-select.min.js'></script>
    <script src='/js/vendor/jquery.style.swicher.js'></script>
    <script src='/js/vendor/js.cookie.js'></script>
    
    <script src='/js/vendor/modernizer.min.js'></script>
    
    <script src='/js/vendor/odometer.js'></script>
    <script src='/js/vendor/particles.js'></script>
    <script src='/js/vendor/sal.min.js'></script>
    <script src='/js/vendor/savePopup.js'></script>
    <script src='/js/vendor/scrolltrigger.js'></script>
    <script src='/js/vendor/slick.min.js'></script>
    <script src='/js/vendor/vanilla.tilt.js'></script>
    <script src='/js/main.js'></script>
    {/* <script src='/js/vendor/web3.min.js'></script> */}
    {/* <script src='/js/vendor/maralis.js'></script> */}{/* <script src='/js/vendor/nft.js'></script> */}
    
    
  </>
);
}

export default MyApp

