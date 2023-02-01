import {QueryCache, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
    Image,
    Box
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface IImagesModel {
    id: number,
    path: string
}

interface IProductModel {
    title: string,
    id: number,
    price: number,
    cover: string,
    images: IImagesModel[],
    sizes: string[],
    allSizes: string[],
    colors: string[]
    description: string,
    thumbnails: IImagesModel[]
}

const Home = () => {
    const getProducts = async () => {
        const res = await axios.get(`${process.env.REACT_APP_FAKE_API_URL}`);
        return res;
    }
    const navigate = useNavigate();
    const {data, error} = useQuery('products', getProducts, {staleTime: 5000,cacheTime: 150});
    const goToProductPage = (product:IProductModel):void => {
        navigate(`/product/${product.title.toLowerCase()}`, {state: {product}});
    };
    return (
        <Box display="flex" justifyContent="center" gap="20px" flexWrap="wrap" maxW="1200px" m="0 auto">
            {!error && data?.data.map((product: IProductModel) => (
                <Card marginTop="50px" cursor="pointer" onClick={() => goToProductPage(product)} maxW='sm' key={product.id}>
                    <CardBody>
                        <Image
                            src={product.cover}
                            width="270px"
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{product.title}</Heading>
                            <Text>
                                Buy by credit card or cryptocurrency
                            </Text>
                            <Text color='green.400' fontSize='2xl'>
                                ${product.price}
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button onClick={() => goToProductPage(product)} variant='solid' colorScheme='blue'>
                                Buy now
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            ))}
            {error && (
                <span>{error.toString()}</span>
            )}
        </Box>
    )
}

export default Home;
