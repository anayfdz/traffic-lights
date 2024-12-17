# Traffic Light Report Management API

This project is an API designed to manage traffic light reports. The app allows users to report, track, and visualize traffic light issues in their area. Users can include evidence (photos or videos) and comments. Administrators can manage reports, assign them to specific traffic lights, and mark their resolution.

The application is built using **NestJS**, and PostgreSQL is used as the database, which runs in a Docker container. Environment variables are configured in a `local.env` file, and API documentation is available via Swagger UI.

## Key Features of the API

### 1. User Management:
- **User Registration**: Allows users to create accounts through email validation via OTP.
- **Authentication**: Supports login via email and password, managing sessions with JWT.
- **Nickname Management**: Users must choose a unique nickname during registration.
- **External Data Retrieval**: Basic user data (first name, last name) is automatically fetched from an external service using their ID.

### 2. Traffic Light Reports:
- **Create Reports**: Users can report faulty traffic lights, providing location, type, status, comments, and evidence (photos or videos).
- **View Reports**: Users can view reports they’ve created.
- **Geolocation**: The app detects nearby traffic lights based on the user’s GPS location for easier reporting.

### 3. Evidence Handling:
- Users can upload photos and videos as evidence when reporting traffic light issues.

### 4. OTP Management:
- During registration, a one-time password (OTP) is sent to the user’s email to validate their account.
- Users can request a new OTP if they haven’t received it or if it has expired.

### 5. Administrator Traffic Light Management (Optional):
- **Create and Update Traffic Lights**: Admins can add or update traffic light details.
- **Delete Traffic Lights**: Admins can remove traffic lights from the database.
- **Assign Reports to Traffic Lights**: Admins can assign reports to specific traffic lights.
- **Report Management**: Admins can view all reports, mark reports as resolved, and delete reports.

## API Interaction Flow:

### 1. User Registration:
- The user registers with their email, password, and a unique nickname.
- The user’s first and last name is fetched from an external service.
- An OTP is sent to the user’s email for account validation.

### 2. User Login:
- The user can log in with their email and password.
- Upon successful authentication, a JWT token is issued and used for subsequent API interactions.

### 3. Reporting a Traffic Light:
- The user submits a report, providing location (auto-detected via GPS), type, status, comments, and evidence (photos or videos).
- Admins can view and manage these reports.

### 4. Administrator Traffic Light and Report Management:
- Admins can view all reports, assign them to traffic lights, and mark them as resolved.
- Admins can manage traffic lights (add, update, delete) and assign reports to specific traffic lights for follow-up.

## API Endpoints

### User Endpoints

| Endpoint               | Method | Description                                  | Required Data (Body/Query)                                      |
|------------------------|--------|----------------------------------------------|---------------------------------------------------------------|
| `/api/register`         | POST   | User registration and OTP generation        | `email` (string), `password` (string), `nickname` (string). Retrieves `name` and `last_name` from external service. |
| `/api/validate-email`   | POST   | Validate email via OTP                      | `email` (string), `otp_code` (string).                         |
| `/api/resend-otp`       | POST   | Resend OTP for email validation             | `email` (string).                                               |
| `/api/login`            | POST   | User login                                  | `email` (string), `password` (string).                         |
| `/api/logout`           | POST   | Logout the user                             | Auth token in headers.                                          |
| `/api/traffic-lights/report` | POST   | Report a traffic light                      | `traffic_light_id` (optional, int), `latitude` (float), `longitude` (float), `status` (string), `comments` (string), `evidences` (array). |
| `/api/user/reports`     | GET    | View user’s reports                         | Auth token in headers.                                          |
| `/api/traffic-lights/filter` | GET | Filter traffic lights by location          | Query: `department`, `province`, `district`.                    |
| `/api/traffic-lights/nearby` | GET  | Get nearby traffic lights by GPS location  | Query: `latitude`, `longitude`, `radius` (optional).           |

                                       |

## Database Model (ER Diagram)

### **users**
- `id` (BIGINT) - Primary Key
- `name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR) - Unique
- `password` (VARCHAR)
- `nickname` (VARCHAR) - Unique
- `status` (ENUM) - `pending_validation`, `validated`
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **traffic_lights**
- `id` (BIGINT) - Primary Key
- `latitude` (FLOAT)
- `longitude` (FLOAT)
- `type` (ENUM) - `vehicular`, `pedestrian`, `mixed`
- `department` (VARCHAR)
- `province` (VARCHAR)
- `district` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **reports**
- `id` (BIGINT) - Primary Key
- `user_id` (BIGINT) - Foreign Key (references `users`)
- `traffic_light_id` (BIGINT, optional) - Foreign Key (references `traffic_lights`)
- `description` (TEXT)
- `status` (ENUM) - `working`, `damaged`, `intermittent`
- `comments` (TEXT)
- `reported_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Technologies and Methods Used:
- **Authentication**: JWT (JSON Web Token)
- **Email Validation**: OTP (One-Time Password) for user account validation
- **Geolocation**: GPS coordinates to detect the location of traffic lights and reports
- **File Upload**: Uploading photos and videos as evidence via S3
- **UUID**: Consider using a UUID field to replace auto-incrementing IDs.

## Getting Started

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/your-user/your-repo.git
cd your-repo


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Postgres

Install docker and run the command:

```bash
docker run --name your_name -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

run migration

```bash
npm run typeorm:generate:win -n init
npm run typeorm:run:win
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Access the API Documentation
The API documentation is available via Swagger UI at:
http://localhost:3000/api

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ana Fernández]

## License

[MIT licensed](LICENSE).
