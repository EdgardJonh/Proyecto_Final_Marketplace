import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const PizzaContext = createContext()

// Creación del componente
const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [carrito, setCarrito] = useState([]);

    // Llamar al API usando Axios
    const getDatos = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/pizzas');
            setPizzas(data);
        } catch (error) {
            console.error("Error al obtener los datos de las pizzas:", error);
        }
    };

    // Función para actualizar el carrito de compras
    const addCarrito = ({ id, precio, nombre, imagen }) => {
        const pEncontradoIndex = carrito.findIndex((p) => p.id === id);
        const producto = { id, precio, nombre, imagen, count: 1 };

        if (pEncontradoIndex >= 0) {
            carrito[pEncontradoIndex].count++;
            setCarrito([...carrito]);
        } else {
            setCarrito([...carrito, producto]);
        }
        console.log(carrito);
    };

    const sumaTotal = carrito.reduce((acumulador, valorActual) => acumulador + (valorActual.precio * valorActual.count), 0);

    const incrementador = (index) => {
        carrito[index].count++;
        setCarrito([...carrito]);
    };

    const decrementador = (index, id, nombre) => {
        if (carrito[index].count === 1) {
            Swal.fire({
                title: `¿Estás seguro de eliminar tu pizza ${nombre}?`,
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
                    setCarrito(carrito.filter(a => a.id !== id));
                }
            });
        } else {
            carrito[index].count--;
            setCarrito([...carrito]);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    return (
        <PizzaContext.Provider value={{ pizzas, setPizzas, carrito, addCarrito, sumaTotal, incrementador, decrementador }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;
