import Footer from "../Components/Footer"
import Header from "../Components/Header"
import ProductPage from "../Components/UserProductTally"



const Product = () => {
   
    
    

    return (
<><div className="Main-Container">
            <Header />
            <section className="First-Section">
                <ProductPage/>
            </section>
           <Footer/>
        </div>
        
        </>
    )

}

export default Product