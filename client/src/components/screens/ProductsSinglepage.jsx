import React, { useEffect, useState } from "react";

//packages
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

export const ProductsSinglepage = () => {
    //states
    const [product, setProduct] = useState({});
    const { id } = useParams();

    //fetch single product
    const fetchProductDetails = async () => {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        setProduct(response.data.product);
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);
    return (
        <MainContainer>
            <Wrapper>
                <Heading>{product?.name}</Heading>
                <ProductCard>
                    <LeftBox>
                        <ProductImage>
                            <img
                                src={product?.image}
                                alt="product"
                            />
                        </ProductImage>
                        <Title>{product?.name}</Title>
                        <Price>$ {product?.price}</Price>
                        <Description>{product?.description}</Description>
                    </LeftBox>
                    <RightBox>
                        {product?.imageGallery?.map((image) => (
                            <GallerImage>
                                <img
                                    src={image}
                                    alt="gallery-image"
                                />
                            </GallerImage>
                        ))}
                    </RightBox>
                </ProductCard>
            </Wrapper>
        </MainContainer>
    );
};

const MainContainer = styled.section`
    padding: 80px 0;
    max-height: 100vh;
    overflow-y: hidden;
`;
const Wrapper = styled.section`
    width: 65%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    justify-content: center;
`;

const Heading = styled.h1`
    font-size: 35px;
    font-weight: bold;
    color: #111;
    text-align: center;
`;

const ProductCard = styled.div`
    max-width: 900px;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    min-height: 260px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    cursor: pointer;
    background-color: #f3f3f3;
`;

const LeftBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    width: 50%;
`;
const RightBox = styled.div`
    width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-content: center;
    gap: 15px;
`;

const GallerImage = styled.div`
    width: 150px;
    height: 150px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 5px;
    overflow: hidden;
`;

const Title = styled.h2`
    font-size: 18px;
    text-align: center;
`;
const ProductImage = styled.div`
    width: 250px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 5px;
    overflow: hidden;
`;
const Price = styled.span`
    display: inline-block;
    width: 100%;
    text-align: center;
`;

const Description = styled.p``;
