# CampusFix Backend (Java + Spring Boot)
REST API for campus maintenance complaints. Java 17, Spring Boot, Spring Data JPA, H2 database.

## Run locally
```bash
mvn spring-boot:run
```
API: `GET /api/complaints`, `POST /api/complaints`, `PATCH /api/complaints/{id}/status`.
Example POST JSON:
```json
{"title":"Wi-Fi unavailable","category":"Wi-Fi","priority":"High","location":"Library, Floor 2","description":"No network connection"}
```
H2 is used for a simple demo. For production, use PostgreSQL/MySQL, authentication/authorization, restrict CORS, and protect the status-update endpoint for admins only.