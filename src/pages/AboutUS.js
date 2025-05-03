import Footer from "../Components/Footer"
import Header from "../Components/Header"
import HomeContent from "../Components/HomeContent"
import OurTeam from "../Components/OurTeam"
import AboutUsComp from "../Components/AboutUsComp"



const AboutUs = () => {
   
    
    

    return (

       <>
      <div className="Main-Container">
            <Header />
            <section className="First-Section">
               <AboutUsComp/>
               <OurTeam/>
            </section>
           <Footer/>
        </div>
       
       </>
    )

}

export default AboutUs