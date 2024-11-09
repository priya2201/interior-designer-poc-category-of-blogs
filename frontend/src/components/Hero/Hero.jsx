import React, { useEffect, useState } from "react";
import "./Hero.css";
import { motion } from "framer-motion";

const Hero = () => {
  const [home, setHome] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`http://localhost:7000/interior/home`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        if (data && data.length > 0) {
          setHome(data);
        } else {
          // setError("No data available");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return home ? (
    <section className="hero-wrapper">
      <div className="flexCenter paddings innerWidth hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title" style={{ color: "black" }}>
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              {home[0].title}
            </motion.h1>
          </div>

          <div className="flexColStart hero-descrip">
            <span className="secondaryText">{home[0].description}</span>
          </div>
        </div>

        {/* ----- Right Side ----- */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="image-container"
          >
            {home[0].images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Hero;
