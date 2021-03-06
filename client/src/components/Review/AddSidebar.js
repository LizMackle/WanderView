import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS } from "../../utils/queries";
import ReactStars from "react-stars";
import { CloseButton, Button } from "react-bootstrap";


export default function AddReview(props) {
  
  const close = () => {
    props.closeSidebar();
  };
  
  const { data } = useQuery(QUERY_REVIEWS);
  
  const reviews = data?.reviews || [];
  
     
  // latitude 
  const [latitude, setLatitude] = useState('');
  
  // longitude 
  const [longitude, setLongitude] = useState('');

  // Setting the review-tittle
  const [title, setTitle] = useState('');
  
  // Setting review-content  
  const [content, setContent] = useState('');
  
  // Stars
  const [stars, setStars] = useState('');

  
  //displaying Stars in the form
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  
  // useEffect(() => {
  //     const data = window.localStorage.getItem('reviews');
  //     if (data !== null) SetSaveReview(JSON.parse(data))
  // })

  // useEffect(() => {
  //   window.localStorage.setItem("Wander_Views_App", JSON.stringify(saveReview));
  // }, [saveReview]);
  
  
  const [saveReview] = useMutation(ADD_REVIEW, {
    
    update(cache, { data: { saveReview } }) {
      
      const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
      
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [saveReview, ...reviews] },
      });
      return console.log(data);
      
    },
  });
  
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert(`Your review has been added!`)
    
    
    }

  


  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "35vh",
            height: "100vh",
            backgroundColor: "white",
            boxShadow: "2px 2px 10px grey",
            zIndex: 10,
          }}
        >
          <label>
            {reviews.longitude}
            {reviews.latitude}
          </label>
          <input
            className="add-review-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              height: "32px",
              width: "90%",
              padding: "5px",
            }}
          ></input>
                    
            <CloseButton 
              type="submit"
              className="btn p-1 bg-dark text-white"
              onClick={close}
              style={{
              cursor: "pointer",
              position: "absolute",
              right: "2px",
              borderRadius: "4px",
              }}
            >
              X
            </CloseButton>

          <textarea
            className="add-review-content"
            placeholder="Review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              marginTop: "5px",
              marginBottom: "10px",
              height: "300px",
              width: "100%",
              padding: "5px",
            }}
          ></textarea>
                      
            <ReactStars 
            count={5}
            onChange={ratingChanged} 
            size={24}
            style={{ 
              paddingLeft: "10px" 
            }}
            color2={'#ffd700'} />,
            
                      
            <><Button
              className="btn p-1 bg-dark text-white"
              onClick={handleSubmit && close}
              style={{
                cursor: "pointer",
                alignContent: "center",
                width: "100%",
                marginTop: "10px",
                borderRadius: "0px",
              }}
            >
              Add Review
            </Button>
            
            </>
          
        </div>
      </form>
    </div>
  </>
  );
}
