const Productoapp = Vue.createApp({
    data() {
        return {
            producto: null, 
            carrito: [] 
        };
    },

    computed: {
        totalArticulos() {
            return this.carrito.reduce((total, prod) => total + prod.cantidad, 0);
        },
    },

    methods: {
        cargarProducto() {
            const productoGuardado = localStorage.getItem("productoSeleccionado");
            if (productoGuardado) {
                this.producto = JSON.parse(productoGuardado);
                this.producto.cantidad = this.producto.cantidad || 1; // Aseguramos que tenga una cantidad inicial
            } else {
                alert("No hay producto seleccionado.");
                window.location.href = "index.html"; 
            }
        },
        aumentarCantidad() {
            if (this.producto.cantidad < 6) {
                this.producto.cantidad++;
            }
        },
        disminuirCantidad() {
            if (this.producto.cantidad > 1) {
                this.producto.cantidad--;
            }
        },
        regresar() {
            const posicionScroll = localStorage.getItem("scrollPosicion");
            window.location.href = "index.html";
            if (posicionScroll) {
                setTimeout(() => window.scrollTo(0, posicionScroll), 100);
            }
        },
        agregarAlCarrito() {
            const index = this.carrito.findIndex(item => item.id === this.producto.id);

            if (index > -1) {
                // Si ya existe en el carrito, agrega la cantidad seleccionada
                this.carrito[index].cantidad += this.producto.cantidad;
            } else {
                // Si no existe, agrégalo con la cantidad seleccionada
                this.carrito.push({ ...this.producto });
            }

            this.guardarCarrito();
            alert(`${this.producto.cantidad} unidades agregadas al carrito.`);
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
        this.cargarProducto(); 
        this.cargarCarrito();
    },
});

Productoapp.mount("#producto-contenedor");
