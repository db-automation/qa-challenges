// Service Worker for Mock API
// This intercepts real HTTP requests and returns mock responses
// Requests will be visible in Network tab!

const MOCK_DELAY = {
    order: 500,
    products: 800,
    profile: 60000
};

// Mock database
const mockDatabase = {
    456: [ // Electronics (real ID)
        { id: 1, name: 'Laptop Pro', price: 1299, category_id: 456, icon: '💻' },
        { id: 2, name: 'Smartphone X', price: 899, category_id: 456, icon: '📱' },
        { id: 3, name: 'Wireless Mouse', price: 49, category_id: 456, icon: '🖱️' },
        { id: 4, name: 'Headphones', price: 199, category_id: 456, icon: '🎧' }
    ],
    457: [ // Clothing
        { id: 5, name: 'T-Shirt', price: 29, category_id: 457, icon: '👕' },
        { id: 6, name: 'Jeans', price: 79, category_id: 457, icon: '👖' }
    ],
    458: [ // Books
        { id: 7, name: 'JavaScript Book', price: 45, category_id: 458, icon: '📚' },
        { id: 8, name: 'Python Guide', price: 39, category_id: 458, icon: '📖' }
    ]
};

self.addEventListener('install', (event) => {
    console.log('✅ Mock API Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('✅ Mock API Service Worker activated');
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Challenge 1: Place Order - Returns 422 Error
    if (url.pathname.includes('/api/v1/order')) {
        event.respondWith(handlePlaceOrder(event.request));
        return;
    }
    
    // Challenge 2: Get Products
    if (url.pathname.includes('/api/products')) {
        event.respondWith(handleGetProducts(event.request));
        return;
    }
    
    // Challenge 3: User Profile - Timeout
    if (url.pathname.includes('/api/user/profile')) {
        event.respondWith(handleGetProfile(event.request));
        return;
    }
    
    // Not a mock API, pass through
    event.respondWith(fetch(event.request));
});

// Challenge 1: Returns 422 error after delay
async function handlePlaceOrder(request) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY.order));
    
    const errorData = {
        error_code: 'insufficient_stock',
        message: 'Wireless Headphones are out of stock. Only 3 items available.'
    };
    
    return new Response(JSON.stringify(errorData), {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {
            'Content-Type': 'application/json',
            'X-Mock-API': 'true'
        }
    });
}

// Challenge 2: Returns products based on category
async function handleGetProducts(request) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY.products));
    
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category');
    
    const allProducts = Object.values(mockDatabase).flat();
    
    let products;
    if (!categoryId || categoryId === '') {
        products = allProducts;
    } else {
        // Filter by category - if wrong ID, returns empty
        products = mockDatabase[categoryId] || [];
    }
    
    return new Response(JSON.stringify(products), {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json',
            'X-Mock-API': 'true'
        }
    });
}

// Challenge 3: Hangs for 60 seconds then fails
async function handleGetProfile(request) {
    // Wait 60 seconds
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY.profile));
    
    // Return timeout error
    const errorData = {
        error: 'Gateway Timeout',
        message: 'The server did not respond in time'
    };
    
    return new Response(JSON.stringify(errorData), {
        status: 504,
        statusText: 'Gateway Timeout',
        headers: {
            'Content-Type': 'application/json',
            'X-Mock-API': 'true'
        }
    });
}
