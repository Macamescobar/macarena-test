
export const getEnvVariables = () => {
   
    import.meta.env; //Vite expone variables de entorno en el objeto especial import.meta.env.

    return {
        ...import.meta.env
    }
}