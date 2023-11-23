import React from "react";
import Showcase from "../../components/layouts/showcase/Showcase";
import ProductList from "../../components/layouts/product list/ProductList";
import Footer from "../../components/layouts/footer/Footer";

const HomePage = () => {
    return (
        <section>
            <Showcase />
            <ProductList />
            <Footer />
        </section>
    )
}

export default HomePage;