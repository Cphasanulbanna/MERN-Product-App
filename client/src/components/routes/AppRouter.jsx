import React from "react";

//packages
import { Routes, Route } from "react-router-dom";

//components
import { LandingPage } from "../screens/LandingPage";
import { Header } from "../includes/Header";
import { ProductsSinglepage } from "../screens/ProductsSinglepage";

export const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage />}
                />
                <Route
                    path="/:id"
                    element={<ProductsSinglepage />}
                />
            </Routes>
        </>
    );
};
