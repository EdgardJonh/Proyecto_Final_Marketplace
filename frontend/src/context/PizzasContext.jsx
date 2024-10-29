import { createContext, useEffect, useState } from "react";

export const PizzaContext = createContext()

// creacion del componente
const PizzaProvider = ({children})=>{
    const [pizzas, setPizzas]=useState([])
    const [carrito, setCarrito]=useState([])
     
    // llamar al api
    const getDatos = async()=>{
        const datos =await fetch('http://localhost:5000/pizzas')
        const losDatos = await datos.json()
        setPizzas(losDatos)
        // console.log(losDatos)
    }
    // funcion que se va encargar deactualizar el carrito de compras SetCarrito usamos destructuring para desglozar los datos
    // usamos un findIndex
    const addCarrito = ({id,precio,nombre,imagen})=>{
        const pEncontradoIndex = carrito.findIndex((p)=>p.id == id)
        // si es -1 debo agregar un nuevo producto a mi carrito si no yo debo sumar un nuevo producto a mi carrito
        // crear un producto
        // ademas agragamos una propiedad contador:1
        const producto = {id,precio,nombre,imagen,count:1}
        // creamos un if si el articulo no ha sido encontrado 
        // debo sumar al producto que ya existe
        // de lo contrario debo agregarese producto ...copiolo que ya tengo y le agrego las propiedade
        if(pEncontradoIndex>=0){
            carrito[pEncontradoIndex].count++
            setCarrito([...carrito])
        }else{
            setCarrito([...carrito,producto])
        }
        console.log(carrito)

    }
    const sumaTotal = carrito.reduce((acumulador,valorActual)=>acumulador + (valorActual.precio * valorActual.count),0)
    const incrementador=(index)=>{
        carrito[index].count++
        setCarrito([...carrito])
        
    }
    const decrementador=(index,id,nombre)=>{
        if (carrito[index].count ==1) {
        //    alert
        
        Swal.fire({
            title: `Estas seguro de eliminar tu pizza ${nombre}?`,
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Eliminado!",
                text: `Su pizza ${nombre} ha sido eliminada.`,
                icon: "success"
              });
              setCarrito( carrito.filter(a =>
                a.id !== id
            ))
            }
          });
        // 
      

        } else {
            carrito[index].count--
        
            setCarrito([...carrito])
        }
       
        
    
       
        
        
    }
    useEffect(()=>{
        getDatos()
    },[])
    return(
        <PizzaContext.Provider value={{pizzas, setPizzas, carrito, addCarrito, sumaTotal, incrementador, decrementador}}>
            {children}
        </PizzaContext.Provider>
    )
}
export default PizzaProvider