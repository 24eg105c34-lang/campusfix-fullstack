# CampusFix

CampusFix is a campus complaint and maintenance app. The frontend and backend are kept together in this repository:

- `campusfix-frontend` — responsive HTML, CSS, and JavaScript UI
- `campusfix-backend` — Java 17 Spring Boot REST API with JPA and H2

The Docker Compose deployment files are in the separate [`campusfix-deployment`](https://github.com/24eg105c34-lang/campusfix-deployment) repository.

## Run locally

From the deployment repository's checkout, run:

```bash
docker compose up --build
```

The compose file builds the frontend and backend from their public GitHub repository subdirectories. The frontend is available at <http://localhost:8081>; the API is at <http://localhost:8080/api/complaints>.

## Demo limitations

This is an educational MVP. Before real campus use, add login and role-based authorization, restrict admin status changes, validate uploads if added, configure production CORS, use HTTPS, and move to a managed production database.
