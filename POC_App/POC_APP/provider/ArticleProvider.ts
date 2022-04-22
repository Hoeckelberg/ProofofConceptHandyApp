import axios from 'axios';
import IArticle from '../Interfaces/IArticle';

const articleProvider = async ():Promise<IArticle[]> => {
    let articles:IArticle[] = [];
    try {
        articles = await axios.get('https://localhost:7013/api/article', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log(error);
        articles = [{
            id: 1,
            name: "Test1",
            price: 2,
            description: "string",
            available: true,
            manufacturer: "string",
        },{
            id: 1,
            name: "Test2",
            price: 2,
            description: "string",
            available: true,
            manufacturer: "string",
        }];
    }
    return articles;
}
export default articleProvider;

