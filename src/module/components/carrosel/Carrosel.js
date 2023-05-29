import { useEffect, useState, useRef } from "react";
import { shoesList } from "./assets/shoes";
import scroolImage from "./img/icon.png";
import "./App.css";

function Carrossel() {
    const carrossel = useRef(null); 
       
    useEffect(() => {
        const leftButton = document.getElementById("left");
        if (leftButton) {
          leftButton.style.display = "none";
        }
      }, []);
    const handleLeftScroll = (event) => {
        event.preventDefault();
        const containerWidth = carrossel.current.offsetWidth;
        let scrollAmount = 0;
      
        const slideTimer = setInterval(() => {
          carrossel.current.scrollLeft -= 5;
          scrollAmount += 10;
          const a = document.getElementById("right");
        
            a.style.display = "inline";
          const isFirstElement = carrossel.current.scrollLeft === 0;
          if (isFirstElement) {
            clearInterval(slideTimer);
            const leftButton = document.getElementById("left");
            if (leftButton) {
              leftButton.style.display = "none";
            }
          }
      
          if (scrollAmount >= containerWidth) {
            clearInterval(slideTimer);
          }
        }, 5);
      };
  
      const handleRightScroll = (event) => {
        event.preventDefault();
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
          carrossel.current.scrollLeft += 5;
          scrollAmount += 10;
          const a = document.getElementById("left");
        
            a.style.display = "inline";
       
          const isLastElement = carrossel.current.scrollLeft === carrossel.current.scrollWidth - carrossel.current.offsetWidth;
          
          if (isLastElement) {
            clearInterval(slideTimer);
         
                const leftButton = document.getElementById("right");
                if (leftButton) {
                  leftButton.style.display = "none";
                }
          
          }
          
          
          if (scrollAmount >= carrossel.current.offsetWidth) {
            clearInterval(slideTimer);
          }
        }, 5);
      };
  
    const renderShoes = (shoesList) => {
        return shoesList.map((shoe, index) => {
            const { name, icon } = shoe;
            return (
                <div className="item" key={index}>
                    <div className="divImage">
                    {icon}
                    </div>
                    <div className="information">
                        <span className="nameOfProduct"> {name} </span>
                  
                      
                    </div>
                </div>
            );
        });
    };
    return (
        <div className="compenetCarosel">
            <div className="container">
                <button onClick={handleLeftScroll}  className="Scrool Left">
                    <img src={scroolImage} id="left" alt="Scrool Left" />
                </button>
                <div className="carosel" ref={carrossel}>
                    {renderShoes(shoesList)}
                </div>
                <button onClick={handleRightScroll}    className="Scrool Right">
                    <img src={scroolImage} id="right" alt="Scrool Right" />
                </button>
            </div>
        </div>
    );
}

export default Carrossel;