import React,{useState,useEffect} from "react";
import {useRouter} from 'next/router'

import {Header,Footer,Copyright,Loader} from '../PageComponents/Components'
import {
  DetailEight,
  DetailFive,
  DetailFour,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";
import { useStateContext } from "../context";
const detail = () => {
  const [property, setProperty] = useState()
  const [parsedReviews, setParsedReviews] = useState()
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false)
  const [buyLoading, setBuyLoading] = useState(false)
  const [likeReviews,setLikeReviews]=useState({
    productID:"",
    reviewIndex:"",
  })
  const {
    address,
    connect,
    contract,
    createPropertyFunction,
    getPropertiesData,
    updatePropertyFunction,
    updatePriceFunction,
    buyPropertyFunction,
    addReviewFunction,
    likeReviewFunction,
    getProductReviewsFunction,
    getPropertyFunction,
    getUserPropertiesFunction,
    getUserReviewsFunction,
    totalPropertyFunction,
    totalReviewsFunction,
    userBalance,
    getHighestratedProduct,
    disconnect

  }=useStateContext()

  //get url query
  const router=useRouter()
  const {query}=router;
  console.log("query is: ",query);
  //get property
  const fetchProperty=async()=>{
    console.log("fetchPropertyCallerd");
    const data=await getPropertyFunction(query.property)
    const dataReviews = await getProductReviewsFunction(query.property)
    const dataProperties = await getPropertiesData();
    setProperties(dataProperties)
    console.log("value of data is:",data);
    setProperty(data)
     setParsedReviews(dataReviews)
    setIsLoading(false);
  }
    useEffect(()=>{
      if(contract) fetchProperty();

    },[address,contract])

    //add review
    const [review,setReview]=useState({
      productID:"",rating:4,comment:"",
    })

    const handleFormFieldChange=(fieldName,e)=>{
      setReview({...review,[fieldName]:e.target.value});
    }


    const createReview = async()=>{
      setCommentLoading(true);
      const data = await addReviewFunction({
        ...review,productID: property.productID,
      })
      setCommentLoading(false);
    } 
    
    
  
  const likeReviewCall=async()=>{
    const data=await likeReviewFunction({
      ...likeReviews,productID:property.productID,
    })
    window.location.reload();
  }
//buy property
const buying={
  productID:property?.productID,
  amount:property?.price,
}

const buyingProperty=async()=>{
  setBuyLoading(true);
  const data = await buyPropertyFunction(buying)
  setBuyLoading(false);

}

//update price
const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
  productID:property?.productID,
  price:""
})
const updatepropertyprice=async()=>{
  setUpdatePriceLoading(true)
  await updatePriceFunction({
    ...updatePropertyPrice,
    productID:property?.productID
  })
  setUpdatePriceLoading(false)
  window.location.reload();
}

  return (
    
    <div className="template-color-1 nft-body-connect">
      <Header/>
      {/* <DetailOne/> */}
      <DetailTwo
      property={property}
      parsedReviews={parsedReviews}
      setLikeReviews={likeReviews}
      likeReviewCall={likeReviewCall}
      buyingProperty={buyingProperty}
      address={address}
      isLoading={isLoading}
      buyLoading={buyLoading}
      />
      {/* <DetailThree/>
      <DetailFour/>
      <DetailFive/>
      <DetailSix/>
      <DetailSeven/>
      <DetailEight/> */}
      
    </div>
  );
};

export default detail;
