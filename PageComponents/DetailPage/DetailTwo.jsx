import React from "react";
import Countdown from "react-countdown";
import { Loader } from "../Components";
const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviewCall,
  buyingProperty,
  address,
  isLoading,
  buyLoading,
}) => {
  const myStyle = {
    maxHeight: "300px",
    objectFit: "contain",
    marginLeft: "280px",
    // Or use pixels (px) or other units
  };
  return (
    <div
      class="product-details-area rn-section-gapTop"
      style={{
        backgroundColor: "black",
        margin: "20px 40px 20px 40px",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="product-tab-wrapper rbt-sticky-top-adjust">
              <div class="pd-tab-inner">
                <div
                  class="nav rn-pd-nav rn-pd-rt-content nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                ></div>
              </div>
              <div class="tab-content rn-pd-content" id="v-pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div class="rn-pd-thumbnail">
                    {isLoading ? (
                      "Loading"
                    ) : (
                      <img
                        style={myStyle}
                        src={property?.images}
                        alt="nft_profile"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"> */}
      <div class="rn-pd-content-area">
        <div class="pd-title-area">
          {/* <h6 class="title">{property?.title?.slice(0,25)}</h6> */}
          <div class="pd-react-area"></div>

          <h6 class="title-name" style={{ color: "cyan" }}>
            #{property?.productId}
          </h6>

          <div className="top-seller-content">
            <h6>Category</h6>
            <h6 class="name" style={{ color: "cyan" }}>
              {property?.category}
            </h6>
          </div>
          <div className="top-seller-content">
            <h6>Owned By:</h6>
            <h6 class="name" style={{ color: "cyan" }}>
              {property?.owner?.slice(0, 20)}...
            </h6>
          </div>

          <div className="pd-property-inner">
            <h6 class="pd-property-title">Description</h6>

            <h6 class=" value" style={{ color: "cyan" }}>
              {property?.description}
            </h6>
          </div>
          <div className="pd-property-inner">
            <h6 class="pd-property-title">Address</h6>

            <h6 class="value" style={{ color: "cyan" }}>
              {property?.address}
            </h6>
          </div>
          <div className="pd-property-inner">
            <h6 class="pd-property-title">Price</h6>

            <h6 class=" value" style={{ color: "cyan" }}>
              {property?.price}FTM
            </h6>
          </div>
          <div
            className="pd-property-inner"
            style={{ alignItems: "start", display: "flex" }}
          >
            <button
              type="button"
              class="btn btn-primary-alta mt--30"
              onClick={() => buyingProperty()}
            >
              {
                buyLoading
                  ? "loading..."
                  : property?.owner == address
                  ? "you already own this property"
                  : `${property?.price} FTM Buy Property`

                //     property?.owner!=address &&(
                //   `${property?.price} FTM Buy Property`
                // )
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTwo;
