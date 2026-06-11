this is a dummy accounting/ledger app mainly fro devops agent testing . it only has a backend , you can work directly using postman using these available endpoints -
GET    /api/accounts       → list accounts
POST   /api/accounts       → create account
GET    /api/accounts/:id   → get single account
PUT    /api/accounts/:id   → update account
DELETE /api/accounts/:id   → delete account

GET    /api/transactions       → list transactions
POST   /api/transactions       → create transaction
GET    /api/transactions/:id   → get single transaction

POST   /api/admin/simulate-error
POST   /api/admin/simulate-delay
POST   /api/admin/simulate-cpu
POST   /api/admin/simulate-memory
