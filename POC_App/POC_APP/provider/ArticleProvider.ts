import IArticle from '../Interfaces/IArticle';
import axios from 'axios';


const articleProvider = async ():Promise<IArticle[]> => {
    let articles:IArticle[] = [];
    try {
        // articles = await axios.get('https://127.0.0.1:7013/api/article', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     }
        // });
        const response = await fetch('https://localhost:7013/api/article', {mode: 'cors'});
        const data = await response.json();
        console.log("Articles: ",{data});
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

