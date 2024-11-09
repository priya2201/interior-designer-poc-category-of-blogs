import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
import { useEffect } from "react";
import { useState } from "react";

const LatestTrends = ({id}) => {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/trends");
        console.log(response, "resp");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log(data, "data from trends");
        setTrends(data);
      } catch (error) {
        console.log(error.message, "Error");
        setError(error.message);
      }
    };
    fetchTrends();
  }, []);

  return (
    <section id={id} className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Latest Trends</span>
          <span className="primaryText">BEST INTERIORS OF OURS</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {trends.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.image} alt="home" />

                <span className="secondaryText r-price">
                  {/* <span style={{ color: "orange" }}>$</span> */}
                  {/* <span>{card.price}</span> */}
                </span>

                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.description}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestTrends;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
