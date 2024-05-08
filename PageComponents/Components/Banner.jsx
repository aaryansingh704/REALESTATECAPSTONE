import React from "react";
import Link from 'next/link';
const Banner = ({properties}) => {
  
  return (
  <div class="banner-three slider-style-3 pt--70">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="wrapper">
            <div class="slider">
              <div class="slider-thumbnail thumbnail-overlay">
                <a href={`/detail?property=3`}>
                  <img class="w-100" src="/portfolio/portfolio-11.jpg" alt="NFT_portfolio" />
                </a>
                <div class="read-wrapper">
                  <h5>
                    <a href={`/detail?property=4`}> Gurugram Apartment</a>
                  </h5>
                  <span>Buy Now!!!</span>
                </div>
              </div>
            </div>
          </div>   
        </div>


      <div class="col-lg-7">
        <div class="row g-4">

         { properties.map((property,i)=>(


            <div key={i} class="col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="slide-small-wrapper">
                <div class="thumbnail thumbnail-overlay">
                  <a href={ `/detail?property=${property.productId}`
                    // localhost:3000/detail?property=2
                    
                    }>
                    <img src={property.image} alt={property.title} />
                  </a>
                </div>
                <div class="read-wrapper">
                  <h5>
                  </h5>
                  <span>{property.title}</span><br />
                  <span>{property.price} FTM</span>
                </div>
              </div>
              
            </div>


          ))} 

          

        </div>

      </div>

      </div>
    </div>
  </div>
  );
};

export default Banner;
