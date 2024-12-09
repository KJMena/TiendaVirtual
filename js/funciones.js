const app = Vue.createApp({
    data() {
        return {
            productos: [],
            categorias: [],
            categoriaSeleccionada: "",
            terminoBusqueda: "",
            categoriaSeleccionada: '', 
            carrito: [], 
            productos:[]
        };
    },
    computed: {
        productosFiltrados() {
            let filtrados = this.productos;

            if (this.terminoBusqueda) {
                const termino = this.terminoBusqueda.toLowerCase();
                filtrados = filtrados.filter(producto =>
                    producto.title.toLowerCase().includes(termino)
                );
            }

            if (this.categoriaSeleccionada) {
                filtrados = filtrados.filter(producto =>
                    producto.category === this.categoriaSeleccionada
                );
            }

            return filtrados;
        },
        porcentajeProgreso() {
            return Math.round((this.productosFiltrados.length / this.productos.length) * 100);
        },
        color() {
            return {
                'bg-danger': this.porcentajeProgreso <= 35,
                'bg-warning': this.porcentajeProgreso >= 35 && this.porcentajeProgreso <= 75,
                'bg-success': this.porcentajeProgreso > 75
            }
        },
        totalArticulos() {
            return this.carrito.reduce((total, prod) => total + prod.cantidad, 0);
        },
    },
    methods: {
        cargarProductos() {
            axios.get("https://dummyjson.com/products")
                .then(respuesta => {
                    this.productos = respuesta.data.products.map(producto => ({
                        ...producto,
                        cantidad: 1,
                    }));
                    this.categorias = [...new Set(this.productos.map(producto => producto.category))];
                })
                .catch(error => {
                    console.error("Error al cargar los productos:", error);
                });
        },
        verDetalle(producto) {
            localStorage.setItem('productoSeleccionado', JSON.stringify(producto)); // Guardar datos del producto
            localStorage.setItem('scrollPosicion', window.scrollY); // Guardar posición del scroll
            window.location.href = "producto.html"; // Redirigir a la página de detalle
        }   ,
        agregarAlCarrito(producto) {
            const index = this.carrito.findIndex(item => item.id === producto.id);

            if (index > -1) {
                // Si ya existe en el carrito, aumenta la cantidad
                this.carrito[index].cantidad++;
            } else {
                // Si no existe, agrégalo
                this.carrito.push({ ...producto });
            }

            this.guardarCarrito();
        },
        guardarCarrito() {
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
        },
        cargarCarrito() {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carrito = carritoGuardado;
        },
        irCarrito() {
            window.location.href = 'carrito.html'; // Cambia a la página del carrito
        },
    },
    created() {
        this.cargarProductos();
        this.cargarCarrito();
    },
});

app.mount("#contenedor");
