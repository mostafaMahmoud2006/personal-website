const { createApp } = Vue;

createApp({
    data() {
        return {
            apiUrl: 'https://raw.githubusercontent.com/mostafaMahmoud2006/jsonFiles/refs/heads/main/nikeProducts.json',

            // filters
            selectedFilter: 'all',

            // data
            products: [],
            cartItems: [],
            orders: [],

            // ui state
            currentProductId: null,
            isCartOpen: false,
            isOrdersOpen: false,
            showMessage: false,

            isDarkMode: false
        };
    },

    methods: {
        // ---------------- UI ----------------
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('night', this.isDarkMode);

            const modeBtn = document.getElementById('mode');

            if (modeBtn) {
                modeBtn.innerHTML = this.isDarkMode
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';
            }
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        },

        toggleOrders() {
            this.isOrdersOpen = !this.isOrdersOpen;
        },

        setFilter(type) {
            this.selectedFilter = type;
        },

        // ---------------- Helpers ----------------
        findProduct(products, id) {
            return products.find(p => p.id === id);
        },

        findCartItem(id) {
            return this.cartItems.find(item => item.id === id);
        },

        // ---------------- Cart Logic ----------------
        addToCart(id) {
            this.currentProductId = id;

            const product = this.findProduct(this.products, id);
            const cartItem = this.findCartItem(id);

            if (!product) return;

            if (product.quantity <= 0) {
                alert('No quantity available');
                return;
            }

            if (cartItem) {
                cartItem.quantity++;
                product.quantity--;
            } else {
                this.cartItems.push({ ...product, quantity: 1 });
                product.quantity--;
            }
        },

        increaseQuantity(id) {
            const cartItem = this.findCartItem(id);
            const product = this.findProduct(this.products, id);

            if (!cartItem || !product) return;

            if (product.quantity > 0) {
                cartItem.quantity++;
                product.quantity--;
            }
        },

        decreaseQuantity(id) {
            const cartItem = this.findCartItem(id);
            const product = this.findProduct(this.products, id);

            if (!cartItem || !product) return;

            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                product.quantity++;
            } else {
                this.cartItems = this.cartItems.filter(item => item.id !== id);
                product.quantity++;
            }
        },

        removeFromCart(id) {
            const cartItem = this.findCartItem(id);
            if (!cartItem) return;

            this.cartItems = this.cartItems.filter(item => item.id !== id);
        },

        // ---------------- Order ----------------
        checkout() {
            if (this.cartItems.length === 0) {
                alert('Cart is empty');
                return;
            }

            this.showMessage = true;
            this.orders = [...this.cartItems];
            this.cartItems = [];

            this.isCartOpen = false;
        }
    },

    computed: {
        filteredProducts() {
            if (this.selectedFilter === 'all') return this.products;
            return this.products.filter(p => p.gender === this.selectedFilter);
        }
    },

    created() {
        $.get(this.apiUrl, (response) => {
            this.products = JSON.parse(response);
        });
    }

}).mount('#app');



// ---------------- jQuery UI helpers ----------------
$('.sidebar-nav nav button').click(function () {
    $('.sidebar-nav nav button').removeClass('active');
    $(this).addClass('active');
});
