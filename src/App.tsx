import {useQuery} from "react-query";
// Components
import Item from './Item/Item';
import {Drawer, LinearProgress, Grid, Badge} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";
// styles
import {Wrapper, StyledButton} from "./App.styles";
import {useState} from "react";
import Cart from "./Cart/Cart";
//types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => {
    return await (await fetch('https://fakestoreapi.com/products')).json();
}


const App = () => {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
    console.log(data);

    const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prevState => {
            const isItemInCart = prevState.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prevState.map(item => (
                    item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
                ))
            }
            return [...prevState, {...clickedItem, amount: 1}]
        })
    }

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prevState => (
            prevState.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [...ack, item]
                }
            }, [] as CartItemType[])
        ))
    }

    if (isLoading) return <LinearProgress/>
    if (error) return <div>Somethiung went wrong...</div>

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCart/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid key={item.id} item xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default App;
