# Project Backend – Clean Monolithic Architecture (Updated)

This README explains the updated backend structure along with completed stories for the project.
Initially, the backend was planned as a **Modular Monolith**, but after implementing the database and analyzing the domain relationships, the architecture has been changed into a **Clean Monolithic Architecture** to ensure proper maintainability and avoid violating module boundaries.

---

## Updated Architecture Decision

### Why we shifted from Modular Monolith to Clean Monolith?

During implementation, some of the core entities were tightly connected through **foreign key relationships**, which was causing:
- Strong coupling between modules  
- Difficulty in isolating domain boundaries  
- Risk of breaking encapsulation

Instead of forcing module separation, we adopted a **Clean Monolithic Architecture**, which offers:
- Clear separation of layers  
- Easy maintainability  
- Smoother development flow  
- Future potential to refactor into modules if needed  

---

## Current Project Structure

### **Domain**
Entities, interfaces.

### **Application**
Use cases, business logic, service contracts.

### **Infrastructure**
EF Core implementation, repositories, DB context, JWT implementation, external services.

### **WebAPI**
Controllers, dependency injection, DTO mapping, HTTP endpoints, configuration.

---

## Sprint 1 – Completed Features

The following user stories from Sprint 1 are fully implemented:

### ✔ Secure Signup & Login
- Validates inputs (email and password)
- Verifies Credentionals securely
- Shows error message on Invalid Attemps to login
- Stores Hashed passwords

### ✔ Student Account Registration
- Restricts users to use unique email
- Prevents duplicate registration
- Validates that password meets security rule
- Redirects student to their dashboard
- Stores user's data with his/her role in the database   

### ✔ Secure Authentication
- Password hashed before stored
- Generates JWT token
- Stores the token in local storage
- Configurable expiry
- Secret keys stored in configuration
- Stateless authentication
- Locks after multiple attempts

Branch for Sprint-1 implementation:
`backend-login-signup-sec`

---

## Technologies & Tools Used

- **.NET 8 Web API**  
- **Entity Framework Core**  
- **SQL Server**  
- **Clean Architecture principles**  
- **JWT Authentication**  
- **Argon2 Password Hashing**  
