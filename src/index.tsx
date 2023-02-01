import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "react-query";
import Home from "./pages/Home";
import ProductInfo from "./pages/ProductInfo";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
    <Router>
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <Routes>
                        <Route path="/" element={<App page={<Home/>}/>} />
                        <Route path="/product/:title" element={<App page={<ProductInfo/>}/>} />
                    </Routes>
                </React.StrictMode>
            </QueryClientProvider>
        </ChakraProvider>
    </Router>

);
