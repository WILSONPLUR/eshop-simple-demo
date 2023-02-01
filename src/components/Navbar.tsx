import {Box, Image} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate('/');
    }
    return (
        <Box position="sticky" top={0} zIndex={99} bgColor="#fff" boxShadow="base" py="20px" display="flex" maxW="100%" m="0 auto" justifyContent="center">
            <Image cursor="pointer" onClick={backToHomePage} width="50px" height="50px" bgSize="contain" objectFit="contain" src="https://www.freeiconspng.com/uploads/retail-shop-icon-3.png" alt="icon" />
        </Box>
    )
}

export default Navbar;
