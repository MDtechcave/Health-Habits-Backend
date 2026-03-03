# Healthy Habits App

## Features
- Purchase weekly meal plans
- Track your order and status
- See hiking and running routes around Cape Town

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MDtechcave/Frontend.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
- Run the app:
   ```bash
   npm run serve
   ```
- Open your browser and go to `http://localhost:5173` to view the application.

## Development
- To start development, use:
   ```bash
   npm run dev
   ```
- This will enable hot-reloading for a smoother development experience.

## Project Structure
```
Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── pool.js/   
└── server.js/
|__ .env/
```
##Add this .env file to your root
PORT=2534
STRIPE_SECRET_KEY=sk_test_51T29Y7DMo7XbVmJRj5GqMXgORBBxriU7dn7kzWTJDj5EoUO2S1sUKfDXmDyJVjLo1U6yAWU3bwhdTtrwDHrqafY800tIHxDYHD
STRIPE_WEBHOOK_SECRET=whsec_d17583f7a1e727f38949a11324f45f038d3f2093081fca02db1a68e29e8ea7fc
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Aviwe
DB_NAME=healthy_habits_db

## Technologies Used
- node.js
- Stripe
- mysql workbench

## Contributing
If you would like to contribute to this project, please fork the repository and create a pull request. Keep your changes clean and well-documented.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
