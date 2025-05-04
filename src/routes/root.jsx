import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Root = () => {
    const [products, setProducts] = useState([]);
    return (
        <>
            <header>
                {" "}
                <Navbar products={products} />
            </header>
            <Outlet context={[products, setProducts]} />
            <Footer />
        </>
    );
};

export default Root;
