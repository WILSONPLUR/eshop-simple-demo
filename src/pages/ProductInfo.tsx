import {useParams, useLocation} from "react-router-dom";
import {useState} from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {Box, Button, Image, Heading, Text} from "@chakra-ui/react";

const ProductInfo = () => {
    const [activeSize, setActiveSize] = useState<string>("");
    const [activeColor, setActiveColor] = useState<string>("");
    const {state} = useLocation();
    const [imageIndex, setImageIndex] = useState<number>(1);
    const {product} = state;

    const getCurrentImage = (id: number) => {
        const image = product.images.filter((image: {id: number}) => image.id === id);
        return image[0].path;
    };
    const getSizes = (allSizes: string[], sizes: string[]):{disabledSizes: string[], availableSizes: string[]} => {
        const disabledSizes = allSizes.filter((size:string) => !sizes.includes(size));
        const availableSizes = allSizes.filter((size: string) => sizes.includes(size));
        return {
            disabledSizes,
            availableSizes
        }
    }
    const {availableSizes, disabledSizes} = getSizes(product.allSizes, product.sizes);
    return (
        <Box maxW="1200px" m="0 auto" display="flex">
            <Box display="flex" h="65vh" alignItems="center" marginTop="50px">
                <Box zIndex={99}>
                    {product.thumbnails.map((thumbnail: {id: number, path: string}) => (
                        <Image borderRadius="lg" marginBottom="10px" alt={thumbnail.path} cursor="crosshair" key={thumbnail.id} onMouseEnter={() => setImageIndex(thumbnail.id)} src={thumbnail.path} />
                    ))}
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box zIndex={10}>
                        <Zoom>
                            <Image src={getCurrentImage(imageIndex)} height="400px" width="400px" objectFit="contain" bgSize="contain" />
                        </Zoom>
                    </Box>
                    <Box>
                       <Box maxW="600px">
                           <Heading as="h1">{product.title}</Heading>
                           <Text marginY="20px">{product.description}</Text>
                       </Box>
                        <div>
                            {product.colors.map((color: {id: number, name: string}) => (
                                <>
                                    {activeColor === color.name ? (
                                        <Button key={color.id} marginRight="10px" borderRadius="50%" boxShadow="1px 1px 1px black" border="0.5px solid black" bgColor={`${color.name.toLowerCase()}`} onClick={() => setImageIndex(color.id)}></Button>
                                    ) : (
                                        <Button onClick={() => {
                                            setImageIndex(color.id)
                                            setActiveColor(color.name)
                                        }} key={color.id} marginRight="10px" borderRadius="50%" border="0.5px solid black" bgColor={`${color.name.toLowerCase()}`}></Button>
                                    )}
                                </>
                            ))}
                        </div>
                        <Box>
                            {availableSizes.map((size: string) => (
                                <>
                                    {activeSize === size && (
                                        <Button bgColor="black" textColor="white" marginRight="10px" marginTop="20px" key={size}>{size.toUpperCase()}</Button>
                                    )}
                                    {activeSize !== size && (
                                        <Button onClick={() => setActiveSize(size)} marginRight="10px" marginTop="20px" key={size}>{size.toUpperCase()}</Button>
                                    )}
                                </>
                            ))}
                            {disabledSizes.map((size: string) => (
                                <Button cursor="auto" _hover={{background: "#cccccc", color: "#fff"}} disabled bgColor="#cccccc" textColor="#fff" marginRight="10px" marginTop="20px" key={size}>{size.toUpperCase()}</Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductInfo;
