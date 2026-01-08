// Register Service Worker for Mock API
// This allows us to intercept real HTTP requests without a server
// Perfect for GitHub Pages!

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');
            console.log('✅ Service Worker registered:', registration);
            console.log('📍 Service Worker scope:', registration.scope);
            
            // Wait for SW to be active
            if (registration.active) {
                console.log('✅ Mock API ready - requests will show in Network tab');
            } else {
                await navigator.serviceWorker.ready;
                console.log('✅ Mock API ready - requests will show in Network tab');
            }
            
            // Log when service worker is controlling the page
            if (navigator.serviceWorker.controller) {
                console.log('✅ Page is controlled by Service Worker');
            } else {
                console.log('⚠️ Page not yet controlled - may need refresh');
            }
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    });
} else {
    console.warn('⚠️ Service Workers not supported in this browser');
}


