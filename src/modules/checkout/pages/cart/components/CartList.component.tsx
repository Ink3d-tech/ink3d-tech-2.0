import { Product } from '../context/Cart.context'
import CartItem from './CartItem.component'

const CartList = ({products}: {products:Product[]}) => {

    return (

        <div className='flex flex-col gap-4'>
            {products.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default CartList

