import {useState,useEffect,createContext} from 'react'
import axios from 'axios';

const BebidasContex = createContext();

const BebidasProvider = ({children}) =>{

    const [bebidas,setBebidas] = useState([])
    const [modal,setModal] = useState(false);
    const [bebidaId,setBebidaId] = useState(null);
    const [receta,setReceta] = useState({});
    const [cargando,setCargando] = useState(false)

    useEffect(() =>{
        setCargando(true);
        const obtenerReceta = async () =>{
            if(!bebidaId) return;

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;

                const {data} = await axios(url);

                setReceta(data.drinks[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setCargando(false)
            }
        }
        obtenerReceta();
    },[bebidaId])

    const consultarBebida = async datos =>{

        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;

            const {data} = await axios(url);

            setBebidas(data.drinks);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBebidaIdClick = id =>{
        setBebidaId(id);
    }

    const handleModalClick = () =>{

        setModal(!modal)
    }

    return (
        <BebidasContex.Provider
        value={{
            bebidas,
            modal,
            receta,
            cargando,
            consultarBebida,
            handleModalClick,
            handleBebidaIdClick
        }}
        >

            {children}
        </BebidasContex.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContex;