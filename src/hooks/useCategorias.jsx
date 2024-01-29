import {useContext} from 'react'
import CategoriasContex from '../context/CategoriasProvider'

const useCategorias = () =>{
    return useContext(CategoriasContex)
}

export default useCategorias