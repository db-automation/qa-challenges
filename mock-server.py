#!/usr/bin/env python3
"""
Mock API Server for QA Challenges
Simulates backend responses with intentional bugs for testing
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import time
from urllib.parse import urlparse, parse_qs

class MockAPIHandler(BaseHTTPRequestHandler):
    
    def _set_headers(self, status_code=200, content_type='application/json'):
        self.send_response(status_code)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_OPTIONS(self):
        self._set_headers()
    
    def do_POST(self):
        # Challenge 1: Place Order - Returns 422 Error
        if '/api/v1/order' in self.path:
            time.sleep(0.5)  # Simulate processing
            
            self._set_headers(422)
            response = {
                'error_code': 'insufficient_stock',
                'message': 'Wireless Headphones are out of stock. Only 3 items available.'
            }
            self.wfile.write(json.dumps(response).encode())
            return
        
        # Default 404
        self._set_headers(404)
        self.wfile.write(json.dumps({'error': 'Not found'}).encode())
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Challenge 2: Get Products - Wrong category ID returns empty
        if '/api/products' in self.path:
            time.sleep(0.8)  # Simulate query
            
            query_params = parse_qs(parsed_path.query)
            category_id = query_params.get('category', [None])[0]
            
            # Mock database with REAL category IDs
            mock_db = {
                '456': [  # Electronics (real ID)
                    {'id': 1, 'name': 'Laptop Pro', 'price': 1299, 'category_id': 456, 'icon': '💻'},
                    {'id': 2, 'name': 'Smartphone X', 'price': 899, 'category_id': 456, 'icon': '📱'},
                    {'id': 3, 'name': 'Wireless Mouse', 'price': 49, 'category_id': 456, 'icon': '🖱️'},
                    {'id': 4, 'name': 'Headphones', 'price': 199, 'category_id': 456, 'icon': '🎧'}
                ],
                '457': [  # Clothing
                    {'id': 5, 'name': 'T-Shirt', 'price': 29, 'category_id': 457, 'icon': '👕'},
                    {'id': 6, 'name': 'Jeans', 'price': 79, 'category_id': 457, 'icon': '👖'}
                ],
                '458': [  # Books
                    {'id': 7, 'name': 'JavaScript Book', 'price': 45, 'category_id': 458, 'icon': '📚'},
                    {'id': 8, 'name': 'Python Guide', 'price': 39, 'category_id': 458, 'icon': '📖'}
                ]
            }
            
            all_products = []
            for products in mock_db.values():
                all_products.extend(products)
            
            if category_id:
                # Filter by category - if wrong ID, returns empty array
                products = mock_db.get(category_id, [])
            else:
                # No filter - return all
                products = all_products
            
            self._set_headers(200)
            self.wfile.write(json.dumps(products).encode())
            return
        
        # Challenge 3: User Profile - Hangs for 60 seconds then times out
        if '/api/user/profile' in self.path:
            print("⏳ Profile request received - simulating timeout (60s)...")
            time.sleep(60)  # Hang for 60 seconds
            
            # After timeout, return 504
            self._set_headers(504)
            response = {
                'error': 'Gateway Timeout',
                'message': 'The server did not respond in time'
            }
            self.wfile.write(json.dumps(response).encode())
            return
        
        # Default 404
        self._set_headers(404)
        self.wfile.write(json.dumps({'error': 'Not found'}).encode())
    
    def log_message(self, format, *args):
        # Custom logging to show in console
        print(f"📡 {self.command} {args[0]} - Status: {args[1]}")

def run_server(port=3001):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MockAPIHandler)
    print(f'🚀 Mock API Server running on http://localhost:{port}')
    print(f'📝 Endpoints:')
    print(f'   POST /api/v1/order - Returns 422 Error')
    print(f'   GET  /api/products?category=X - Returns products (456=Electronics)')
    print(f'   GET  /api/user/profile - Hangs for 60s then 504')
    print(f'\n✅ Ready for QA testing!\n')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
