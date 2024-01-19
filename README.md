# Library App with Node.js (Express) and ReactJS

Welcome to the Library App, a frontend repository for a simple yet secure application for book management developed using Node.js (Express) for the backend and ReactJS for the frontend. This application features a user-friendly web interface, secure APIs, and role-based access control, ensuring a seamless experience for users.

## Backend Repository
[Link to Backend Repository](https://github.com/vinit-churi/library_management_system-backend)

## Video Demonstration (loom video)
https://www.loom.com/share/378cb29e3f91406ab8a5ebfc8a949cb8?sid=f168b256-16c2-4e8c-83dd-83780383d553

## Table of Contents

- [Web Interface](#web-interface)
  - [Login Screen](#login-screen)
  - [Book Display](#book-display)
- [Book Management APIs](#book-management-apis)
  - [Roles and Permissions](#roles-and-permissions)
  - [API Endpoints](#api-endpoints)
- [Technical Expectations](#technical-expectations)
  - [MongoDB Integration](#mongodb-integration)
  - [Environment Properties](#environment-properties)
  - [UI Validations](#ui-validations)
  - [Error Handling](#error-handling)
- [Submission](#submission)

## Web Interface

### Login Screen

The application provides a secure login screen, utilizing JWT authentication for user authentication. Users with different roles will experience different functionalities based on their permissions.

### Book Display

The book management interface displays all books in a tabular format with filtering and sorting options for enhanced user experience. Users can view books created within the last 10 minutes or beyond that timeframe.

## Book Management APIs

### Roles and Permissions

- **CREATOR Role**: Users with this role can perform CRUD operations on books.
- **VIEW_ALL Role**: Users with this role can only view books.

### API Endpoints

- `/books`: Endpoint for creating, viewing, and deleting books. Accessible to users with the CREATOR role for CRUD operations and VIEW_ALL role for viewing.
- `/books/delete`: Endpoint for deleting a book. Accessible only to users with the CREATOR role.
- `/books?old=1`: Endpoint to display books created 10 minutes ago and earlier.
- `/books?new=1`: Endpoint to showcase books created within the last 10 minutes.

## Technical Expectations

### MongoDB Integration

The application utilizes a MongoDB collection for efficient data storage. Connection information is stored in environment properties, offering flexibility for integration with any MongoDB instance.

### Environment Properties

Connection information is stored in environment properties for flexibility. Make sure to provide the necessary environment variables for seamless integration.

### UI Validations

Basic UI validations are implemented to enhance the user experience, ensuring accurate and error-free data entry.

### Error Handling

Console warnings and errors are minimized or eliminated to provide a smooth user experience. A logger is incorporated for API call tracking, aiding in debugging and issue resolution.

## Submission

To view the backend code and explore the features, please visit the [backend repository](https://github.com/vinit-churi/library_management_system-backend). Feel free to provide feedback and suggestions.

Thank you for considering my submission!
