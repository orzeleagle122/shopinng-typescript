import React, {FC} from 'react';
import {Button} from "@material-ui/core";
//types
import {CartItemType} from "../App";
//styles
import {Wrapper} from './Item.style';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickItem: CartItemType) => void;

}


const Item: FC<Props> = ({item, handleAddToCart}) => {
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>
                    {item.title}
                </h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Wrapper>
    );
};

export default Item;