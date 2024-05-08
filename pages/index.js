import React, { useState, useEffect } from "react";

import {
  Header,
  Banner,
  Live,
  Service,
  Product,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "../PageComponents/Components";
import {useStateContext} from "../context"
import {getTopCreators} from "../util"
const index = () => {
  //state variables
  const [isLoading,setIsLoading]=useState(false);
  const [properties,setProperties]=useState([]);
  const{address,contract,getPropertiesData}=useStateContext()


  const fetchProperty = async()=>{
    setIsLoading(true);
    const data=await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    if(contract) fetchProperty();

  },[address,contract])
  console.log(properties);
  const housing=[]
  const rental=[]
  const farmhouse=[]
  const office=[]
  const commercial=[]
  const country=[]
  if(!isLoading){
    properties.map((el,i)=>{
      if(el.category === "Country"){
        country.push(el);
      }else if(el.category==="commercial"){
        commercial.push(el);
      }else if(el.category==="housing"){
        housing.push(el);
      }else if(el.category==="rental"){
        rental.push(el);
      }else if(el.category==="farmhouse"){
        farmhouse.push(el);
      }else if(el.category==="office"){
        office.push(el);
      }
    })
  }
  const creators = getTopCreators(properties);



  return (
    <div className="template-color-1 nft-body-connect">
      <Header />
      <Banner properties={properties}/>
      {/* <Live properties={properties} /> */}
      {/* <Service />
      <Product properties={properties} />
      <TopSeller creators={creators} />
      <Collection
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
      />

      <Footer/> */}
    </div>
  );
};

export default index;
