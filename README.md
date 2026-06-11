this is a dummy e-commerce app mainly fro devops agent testing . it only has a backend , you can work directly using postman using these available endpoints -
NO auth needed-
POST   /api/auth/register
POST   /api/auth/login
GET    /api/products
GET    /api/products/:id
GET    /health

NEEDS LOGIN TOKEN-
GET    /api/auth/profile
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

Admins tokens only-
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
PUT    /api/orders/:id
DELETE /api/orders/:id

POST   /api/admin/simulate-error
POST   /api/admin/simulate-delay
POST   /api/admin/simulate-cpu
POST   /api/admin/simulate-memory
