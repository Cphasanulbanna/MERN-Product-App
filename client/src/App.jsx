import React from "react";

import { createTheme, ThemeProvider } from "@mui/material";

export const App = () => {
    const theme = createTheme({
        breakpoints: {
            values: {
                sm: 320,
                sm2: 360,
                sm3: 420,
                sm4: 480,
                sm5: 540,
                sm6: 640,
                sm7: 680,
                md: 768,
                md1: 900,
                md2: 980,
                lg: 1080,
                lg2: 1280,
                xl: 1400,
                xl2: 1536,
            },
        },
        components: {
            MuiTypography: {
                variants: [
                    {
                        props: {
                            variant: "body2",
                        },
                        style: {
                            fontSize: 14,
                        },
                    },
                    {
                        props: {
                            variant: "body3",
                        },
                        style: {
                            fontSize: 12,
                        },
                    },
                ],
            },
        },
    });
    return <ThemeProvider theme={theme}>App</ThemeProvider>;
};
