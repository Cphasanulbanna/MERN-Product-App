import React, { useEffect, useState } from "react";

//packages
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export const Products = () => {
    //products state
    const [products, setProducts] = useState([]);

    //fetch all products api
    const fetchAllProducts = async () => {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data.products);
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);
    return (
        <MainContainer>
            <Wrapper className="wrapper">
                <Heading>All Products</Heading>
                <ProductsBox>
                    {products?.map((product) => (
                        <ProductCard
                            key={product?.id}
                            to={`/${product?.id}`}
                        >
                            <ProductImage>
                                <img
                                    src={product?.image}
                                    alt="product"
                                />
                            </ProductImage>
                            <Title>{product?.name}</Title>
                            <Price>$ {product?.price}</Price>
                        </ProductCard>
                    ))}
                </ProductsBox>
            </Wrapper>
        </MainContainer>
    );
};

const MainContainer = styled.section`
    padding: 80px 0;
`;
const Wrapper = styled.section``;
const Heading = styled.h1`
    font-size: 35px;
    font-weight: bold;
    color: #111;
    text-align: center;
`;
const ProductsBox = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 22px;
    margin-top: 25px;
`;
const ProductCard = styled(Link)`
    width: 22%;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 260px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;

const Title = styled.h2`
    font-size: 18px;
    text-align: center;
`;
const ProductImage = styled.div``;
const Price = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
`;
