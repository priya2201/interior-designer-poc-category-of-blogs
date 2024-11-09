import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./Value.css";
import data from "../../utils/accordion";
import { HiShieldCheck } from "react-icons/hi";
import { MdCancel, MdAnalytics } from "react-icons/md";

function Value() {
  const [faq, setFaq] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(`http://localhost:7000/interior/faq`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data, "ressss");
        setFaq(data);
      } catch (error) {
        setError(error.message);
      } finally {
        console.log("final");
      }
    };
    fetchFaq();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/interior/aboutus");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log(data, "About data");
        if (data && data.length > 0) {
          setTitle(data[0].title);
          setSubtitle(data[0].subtitle);
          setDescription(data[0].description);
          setImage(data[0].image);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <section id="value" className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* --- Left Side ---*/}
        <div className="v-left">
          <div className="image-container">
            {image && <img src={image} alt={"image aboutus"} />}
          </div>
        </div>

        {/* --- Left Side ---*/}
        <div className="flexColStart v-right">
          <span className="orangeText">{title}</span>
          <span className="primaryText">{subtitle}</span>
          <span className="secondaryText">{description}</span>

          {faq && (
            <Accordion
              className="accordion"
              allowMultipleExpanded={false}
              preExpanded={[0]}
            >
              {faq.map((item, i) => (
                <AccordionItem className="accordionItem" key={i} uuid={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton">
                      <AccordionItemState>
                        {({ expanded }) => (
                          <div
                            className={`flexCenter icon ${
                              expanded ? "expanded" : "collapsed"
                            }`}
                          >
                            <HiShieldCheck />
                          </div>
                        )}
                      </AccordionItemState>
                      <span className="primaryText">{item.question}</span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {item.answer.map((ans, index) => (
                      <p key={index} className="secondaryText">
                        {ans}
                      </p>
                    ))}
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}

export default Value;
