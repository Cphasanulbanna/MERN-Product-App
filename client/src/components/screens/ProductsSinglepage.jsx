import React from "react";
import { useParams } from "react-router-dom";

export const ProductsSinglepage = () => {
    const { id } = useParams();
    return <div>ProductsSinglepage {id}</div>;
};
