# GoRide Frontend

This project is the frontend part of the GoRide application, built using React and Vite.

## Features

- User and Captain Authentication
- Real-time location tracking
- Ride booking and fare calculation
- OTP verification for ride start
- Ride status updates (pending, accepted, ongoing, completed)
- User and Captain profiles
- Google Maps integration for location and distance calculation

## Prerequisites

- Node.js
- Google Maps API Key

## Setup Instructions

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the frontend application.
2. Register as a user or captain and log in.
3. As a user, you can book rides, view ride status, and track the ride in real-time.
4. As a captain, you can accept rides, start rides using OTP verification, and complete rides.

## API Documentation

For detailed API documentation, refer to the [Backend README](../Backend/README.md).

## Socket Events

For detailed socket events documentation, refer to the [Backend README](../Backend/README.md).

## License

This project is licensed under the MIT License.
