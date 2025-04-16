import React, { useEffect, useState } from "react";


import '../App.css';
import '../index.css';
import '../mainApp.css';
import '../MAININDEX.CSS';
import '../Hpagemg.css';
import '../CSS/About_Us.css';
import '../CSS/Enquiry.css';
import '../CSS/Product.css';
import '../CSS/RESP-CSS/RESP-MAIN.css';
import '../CSS/RESP-CSS/RESP-Home-pg.css';
import "../CSS/RESP-CSS/RESP-Enquriy.css"
import "../CSS/RESP-CSS/RESP-About_us.css"
import "../CSS/RESP-CSS/RESP-Product.css"
import "../CSS/RESP-CSS/RESP-Success.css"
import Animate from '../Components/Animate';
import Spinner from '../Components/Spinner';
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import DoubtManager from "../Components/DoubtManager";
import Footer from "../Components/Footer";
import HomeContent from "../Components/HomeContent";





const GulliHome = () => {
  const [loading, setloading] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const [NeedToWithdraw, setNeedToWithdraw] = useState(0);

  useEffect(() => {

    // setTimeout(() => {
    //   setLoadingTwo(false);
    // }, 2000);
    // eslint-disable-next-line
  }, []);

  
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Animate>
          <div class="Main-Container">

            <Header />

            <section class="First-Section">
              <Slider />
              <HomeContent />

              <DoubtManager />
            </section>

            <Footer />

          </div>


        </Animate>

      )}
    </>
  );

};

export default GulliHome;
