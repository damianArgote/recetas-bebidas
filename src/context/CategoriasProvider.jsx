import {useState,useEffect,createContext} from 'react'
import axios from 'axios';
const CategoriasContex = createContext();

const CategoriasProvider = ({children}) =>{

    const [categorias,setCategorias] = useState([])

    const obtenerCategorias = async () =>{

        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const {data} = await axios(url);
            console.log(data.drinks);
            setCategorias(data.drinks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        obtenerCategorias();
    },[])

    return (
        <CategoriasContex.Provider
        value={{
            categorias
        }}
        >

            {children}
        </CategoriasContex.Provider>
    )
}

export {
    CategoriasProvider
}

export default CategoriasContex;