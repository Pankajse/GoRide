## API Documentation

### POST /user/register

#### Description
This endpoint is used to register a new user.

#### Required Data
- `fullname.firstname` (string): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string): The last name of the user.
- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 6 characters long.

#### Status Codes
- `201 Created`: The user was successfully created.
- `400 Bad Request`: The email is already registered.
- `404 Not Found`: Validation errors occurred.

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
### POST /captain/register

#### Description
This endpoint is used to register a new captain.

#### Required Data
- `fullname.firstname` (string): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string): The last name of the captain.
- `email` (string): The email address of the captain. Must be a valid email format.
- `password` (string): The password for the captain account. Must be at least 6 characters long.
- `vehicle.color` (string): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number): The capacity of the vehicle. Must be a number.
- `vehicle.vehicleType` (string): The type of the vehicle. Must be one of 'scotter', 'motorcycle', 'car', 'auto'.
- `vehicle.model` (string): The model of the vehicle. Must be at least 3 characters long.

#### Status Codes
- `201 Created`: The captain was successfully created.
- `400 Bad Request`: The email is already registered or validation errors occurred.

#### Example Request
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car",
    "model": "Toyota"
  }
}
```

#### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car",
      "model": "Toyota"
    }
  }
}
```

### POST /captain/login

#### Description
This endpoint is used to login a captain.

#### Required Data
- `email` (string): The email address of the captain. Must be a valid email format.
- `password` (string): The password for the captain account. Must be at least 6 characters long.

#### Status Codes
- `200 OK`: The captain was successfully logged in.
- `400 Bad Request`: Validation errors occurred.
- `401 Unauthorized`: Wrong email or password.

#### Example Request
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

#### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car",
      "model": "Toyota"
    }
  }
}
```

### GET /captain/profile

#### Description
This endpoint is used to get the profile of the logged-in captain.

#### Status Codes
- `200 OK`: The captain profile was successfully retrieved.
- `401 Unauthorized`: The captain is not authorized.

#### Example Response
```json
{
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car",
      "model": "Toyota"
    }
  }
}
```

### GET /captain/logout

#### Description
This endpoint is used to logout the captain.

#### Status Codes
- `200 OK`: The captain was successfully logged out.

#### Example Response
```json
{
  "message": "Logged out"
}
```