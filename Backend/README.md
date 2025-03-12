# User Routes Documentation

## 1. Register User

**Endpoint:** `/users/register`  
**Method:** `POST`  
**Description:** Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

## 2. Login User

**Endpoint:** `/users/login`  
**Method:** `POST`  
**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

## 3. Get User Profile

**Endpoint:** `/users/profile`  
**Method:** `GET`  
**Description:** Retrieves the profile of the authenticated user.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

## 4. Logout User

**Endpoint:** `/users/logout`  
**Method:** `POST`  
**Description:** Logs out the authenticated user.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

# Captain Routes Documentation

## 1. Register Captain

**Endpoint:** `/captains/register`  
**Method:** `POST`  
**Description:** Registers a new captain.

**Request Body:**
```json
{
  "email": "captain@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## 2. Login Captain

**Endpoint:** `/captains/login`  
**Method:** `POST`  
**Description:** Logs in an existing captain.

**Request Body:**
```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## 3. Get Captain Profile

**Endpoint:** `/captains/profile`  
**Method:** `GET`  
**Description:** Retrieves the profile of the authenticated captain.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## 4. Logout Captain

**Endpoint:** `/captains/logout`  
**Method:** `POST`  
**Description:** Logs out the authenticated captain.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

# Map Routes Documentation

## 1. Get Coordinates

**Endpoint:** `/maps/get-coordinates`  
**Method:** `GET`  
**Description:** Retrieves the coordinates for a given address.

**Query Parameters:**
```
address: string (required)
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "coordinates": {
    "ltd": 37.7749,
    "lng": -122.4194
  }
}
```

## 2. Get Distance and Time

**Endpoint:** `/maps/get-distance-time`  
**Method:** `GET`  
**Description:** Retrieves the distance and time between two locations.

**Query Parameters:**
```
origin: string (required)
destination: string (required)
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "distanceTime": {
    "distance": {
      "text": "5.4 km",
      "value": 5400
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    }
  }
}
```

## 3. Get Auto Suggestions

**Endpoint:** `/maps/get-suggestions`  
**Method:** `GET`  
**Description:** Retrieves auto-complete suggestions for a given input.

**Query Parameters:**
```
input: string (required)
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "suggestions": [
    {
      "description": "San Francisco, CA, USA",
      "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo"
    },
    {
      "description": "San Jose, CA, USA",
      "place_id": "ChIJ9T_5iuTKj4ARe3GfygqMnbk"
    }
  ]
}
```

# Ride Routes Documentation

## 1. Create Ride

**Endpoint:** `/rides/create-ride`  
**Method:** `POST`  
**Description:** Creates a new ride.

**Request Body:**
```json
{
  "pickup": "123 Main St, San Francisco, CA",
  "destination": "456 Market St, San Francisco, CA",
  "vehicleType": "car"
}
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "pending",
    "otp": "1234"
  }
}
```

## 2. Accept Ride

**Endpoint:** `/rides/accepted`  
**Method:** `POST`  
**Description:** Accepts a ride by a captain.

**Request Body:**
```json
{
  "rideId": "ride_id_here"
}
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "accepted",
    "otp": "1234"
  }
}
```

## 3. Verify OTP

**Endpoint:** `/rides/verify-otp`  
**Method:** `POST`  
**Description:** Verifies the OTP for starting the ride.

**Request Body:**
```json
{
  "rideId": "ride_id_here",
  "otp": "1234"
}
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "ongoing",
    "otp": "1234"
  }
}
```

## 4. End Ride

**Endpoint:** `/rides/end-ride`  
**Method:** `POST`  
**Description:** Ends the ride by the captain.

**Request Body:**
```json
{
  "rideId": "ride_id_here"
}
```

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "completed",
    "otp": "1234"
  }
}
```

# Socket Events Documentation

## 1. Join

**Event:** `join`  
**Description:** Joins a user or captain to the socket.

**Data:**
```json
{
  "userId": "user_id_here",
  "userType": "user" // or "captain"
}
```

## 2. Update Location Captain

**Event:** `update-location-captain`  
**Description:** Updates the location of the captain.

**Data:**
```json
{
  "userId": "captain_id_here",
  "location": {
    "ltd": 37.7749,
    "lng": -122.4194
  }
}
```

**Response:**
```json
{
  "message": "Location updated successfully"
}
```

## 3. New Ride

**Event:** `new-ride`  
**Description:** Notifies captains about a new ride.

**Data:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "pending",
    "otp": "1234"
  }
}
```

## 4. Ride Accepted

**Event:** `ride-accepted`  
**Description:** Notifies the user that the ride has been accepted by a captain.

**Data:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "accepted",
    "otp": "1234"
  }
}
```

## 5. Ride Started

**Event:** `ride-started`  
**Description:** Notifies the user that the ride has started.

**Data:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "ongoing",
    "otp": "1234"
  }
}
```

## 6. Ride Completed

**Event:** `ride-completed`  
**Description:** Notifies the user that the ride has been completed.

**Data:**
```json
{
  "ride": {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main St, San Francisco, CA",
    "destination": "456 Market St, San Francisco, CA",
    "fare": 50,
    "status": "completed",
    "otp": "1234"
  }
}
```


