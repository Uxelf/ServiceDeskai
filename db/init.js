db = db.getSiblingDB("mydb");

db.users.insertOne({
    username: process.env.ADMIN_USERNAME,
    password: process.env.HASHED_ADMIN_PASSWORD,
    role: "admin"
})