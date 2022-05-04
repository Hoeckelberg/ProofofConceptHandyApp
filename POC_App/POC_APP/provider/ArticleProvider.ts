import axios from 'axios';
import IArticle from '../Interfaces/IArticle';

const articleProvider = async ():Promise<IArticle[]> => {
    let articles:IArticle[] = [];
    try {
        // articles = await axios.get('10.0.2.2:7013/api/article', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        const response = await fetch('https://10.0.2.2:7013/api/article', {mode: 'cors'});
        const data = await response.json();
        console.log("AAAA",{data});
        articles = data;
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

