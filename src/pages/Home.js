import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import '../MAININDEX.CSS';

import { AnimatePresence } from "framer-motion";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


const Home = () => {
    const location = useLocation();

    const [restrictAccess, setRestrictAccess] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <>
            <AnimatePresence mode="wait">
                {restrictAccess ? (
                    <>
                        <div style={{ overflowY: "auto", height: "100vh" }}>
                            <Outlet />
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ overflowY: "auto", height: "100vh" }}>
                            <Outlet />
                        </div>
                    </>
                )}
            </AnimatePresence>



        </>
    );
};

export default Home;
