import React, {useState, useEffect, useContext, createContext, Children } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
  useTotalCirculatingSupply,
  useDisconnect,
  useConnectionStatus,
  useSigner
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xe226c446478C5cA9386A8F53B51756A4cCa05386"
  );
  // console.log(contract);
  const address = useAddress();
  const connect = useMetamask();

  const disconnect=useDisconnect();
  // const connectionStatus=useConnectionStatus();
  const signer=useSigner();
  //state
  const [userBalance, setUserBalance] = useState()
  // const [isLoading, setIsLoading] = useState(false)


  //list property::
  const { mutateAsync: listProperty} = useContractWrite(
    contract,
    "listProperty"
  );

  const createPropertyFunction = async (form) => {
    console.log("create property called");
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;

    try {
      const data = await listProperty({
        args: [
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });

      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  //update property
  const { mutateAsync: updateProperty } =
    useContractWrite(contract, "updateProperty");
  const updatePropertyFunction = async (form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,

      images,
      propertyAddress,
    } = form;
    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  //update price
  const { mutateAsync: updatePrice} =
    useContractWrite(contract, "updatePrice");
  const updatePriceFunction = async (form) => {
    const { productID, price } = form;

    try {
      const data = await updatePrice({args:[address, productID, ethers.utils.parseEther(price)]});
      console.log("price updated successfully", data);
    } catch (error) {
      console.log(error);
    }
  };
  //buy property
  const { mutateAsync: buyProperty } =
    useContractWrite(contract, "buyProperty");
  const buyPropertyFunction = async (buying) => {
    const { productID,amount } = buying;
    const money=ethers.utils.parseEther(amount);
    try {
      const data = await buyProperty({ args: [productID, address],
        value:money.toString()
       });
      console.log("buying successful", data);
    } catch (error) {
      console.log("buying failed", error);
    }
  };
  //review function
  const {mutateAsync:addReview}=useContractWrite(contract,"addReview");
  const addReviewFunction = async (form) => {
    const { productID, rating, comment } = form;
    try {
      const data = await addReviewFunction({
        args: [productID, rating, comment, address],
      });
      console.log("added review", data);
    } catch (error) {
      console.log("could not add review", error);
    }
  };
  //like review
  const { mutateAsync: likeReview } =
    useContractWrite(contract, "likeReview");
  const likeReviewFunction = async (form) => {
    const { productID, reviewIndex } = form;
    try {
      const data = await likeReview({
        args: [productID, reviewIndex, address],
      });
      console.log("liked the review", data);
    } catch (error) {
      console.log("could not like review", error);
    }
  };

  //getAllProperties()
  const getPropertiesData = async () => {
    try {
      //get all market properties
      const properties = await contract.call("getAllProperties");
      const balance=await signer?.getBalance();

      const userBalance=address? ethers.utils.formatEther(balance?.toString()):"";
      setUserBalance(userBalance)

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));
      return parsedProperties;
    } catch (error) {
      console.log("unable to get properties data",error);
    }
  };
  //getHighestratedProduct()
  const {
    data: getHighestratedProduct,
  } = useContractRead(contract, "getHighestratedProduct");


  //getProductReviews()
    const getProductReviewsFunction= async(productId) => {
        try{
            const getProductReviews= await contract.call("getProductReviews",[productId]);
            // console.log("property reviews extracted",data);
            const parsedReviews=getProductReviews?.map((review,i)=>({
              reviewer:review.reviewer,
              likes:review.likes.toNumber(),
              comment:review.comment,
              rating:review.rating,
              productID:review.productId.toNumber(),
            }))
            return parsedReviews
        }catch(error){
            console.log("failed to get product reviews",error);
        }
    }
    //getProperty()
    const getPropertyFunction=async(id)=>{
      const productID= id*1;  
      try {
           const propertyItem=await contract.call("getProperty",[productID]);
            const property={
              productID:propertyItem?.[0].toNumber(),
              owner:propertyItem?.[1],
              title:propertyItem?.[3],
              category:propertyItem?.[4],
              description:propertyItem?.[7],
              price:ethers.utils.formatEther(propertyItem?.[2].toString()),
              address:propertyItem?.[6],
              images:propertyItem?.[5]
            }
            return property
        } catch (error) {
            console.log("unable to get property",error);
        }
    }
    //getUserProperties()
    const getUserPropertiesFunction= async()=>{
      const properties = await contract.call("getUserProperties",[address]);
        try {
            const parsedProperties=properties.map((property,i)=>({
              owner:property.owner,
              title:property.propertyTitle,
              description:property.description,
              category:property.category,
              price:ethers.utils.formatEther(property.price.toString()),
              productID:property.productID.toNumber(),
              reviewers:property.reviewers,
              reviews:property.reviews,
              image:property.images,
              address:property.propertyAddress,
            }))
          return parsedProperties  ;
        } catch (error) {
            console.log("cannot get user properties",error);
        }
    }
    //getUserREviews()
    const getUserReviewsFunction=()=>{
        try{
            const{data:getUserReviews}=
            useContractRead("getUserReviews",[address]);
            return(getUserReviews)
        }catch(error){
            console.log("cant fetch user reviews",error);
        }
    }
    //totalProperty()
    const totalPropertyFunction= async()=>{
        try {
            const totalProperty = await contract.call("propertyIndex");
            return(totalProperty.toNumber())
        } catch (error) {
            console.log("could not get total number of properties",error);
        }
    }
    //totalReviews
    const totalReviewsFunction=async()=>{
        try {
            const totalReviews = await contract.call("reviewsCounter");
            return(totalReviews.toNumber())
        } catch (error) {
            console.log("cannot fetch review count",error);
        }
    }
    //getting events from smart contract
    const {data:PropertyListedevent} = useContractEvents(contract,"PropertyListed");
    const {data:allEvents}=useContractEvents(contract);
    const {data:eventWithoutListener}=useContractEvents(
        contract, undefined,{subscribe:false}
    )
  return (
    <StateContext.Provider
      value={{
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
