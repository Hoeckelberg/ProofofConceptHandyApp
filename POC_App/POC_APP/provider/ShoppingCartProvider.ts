import IShoppingCart from '../Interfaces/IShoppingCart';
import axios from 'axios';

const shoppingCartProvider = async ():Promise<IShoppingCart[]> => {
    let articles:IShoppingCart[] = [];
    try {
        // articles = await axios.get('http://10.0.2.2:5013/api/shoppingcart', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        const response = await fetch('http://10.0.2.2:5013/api/shoppingcart', {mode: 'cors'});
        const data = await response.json();
        console.log("Articles: ",{data});
        articles = data;
    } catch (error) {
        console.log(error);
        articles = [{
            id: 1,
            articleId: 1,
            customerId: 1,
            quantity: 5,
        },{
            id: 2,
            articleId: 1,
            customerId: 2,
            quantity: 3,
        }];
    }
    return articles;
}
export default shoppingCartProvider;

