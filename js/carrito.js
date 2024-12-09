const CarritoApp = Vue.createApp({
    data() {
        return {
            carrito: [],
        };
    },
    computed: {
        totalArticulos() {
            return this.carrito.reduce((total, prod) => total + prod.cantidad, 0);
        },
        subtotal() {
            return this.carrito.reduce((total, prod) => total + prod.price * prod.cantidad, 0);
        },
        iva() {
            return this.subtotal * 0.16;
        },
        total() {
            return this.subtotal + this.iva;
        },
    },
    methods: {
        cargarCarrito() {
            const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carrito = carritoGuardado;
        },
        actualizarCarrito(producto) {
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
        },
        guardarCarrito() {
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
        },
        eliminarProducto(id) {
            this.carrito = this.carrito.filter(producto => producto.id !== id);
            this.guardarCarrito();
        },
    },
    created() {
        this.cargarCarrito();
    },
});

CarritoApp.mount("#carrito-contenedor");
