const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const sequelize = require("./config/database/sequelize");
const roleRoute = require("./routes/admins/root/role");
const adminRoute = require("./routes/admins/root/admin");
const adminLoginRoute = require("./routes/admins/admin/login");
const command = require("./routes/admins/commands/createRoot");
const permissionRoute = require("./routes/admins/root/permission");

const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const TagRoute = require("./routes/tag");
const sellerProductRoute = require("./routes/product/sellerRoute");
const userProductRoute = require("./routes/product/userRoute");
const customerRoute = require("./routes/customer/login_register");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const rolePermission = require("./models/role-permission");
const Admin = require("./models/Admin");
const TypePrice = require("./models/TypePrice");
const UserType = require("./models/UserType");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Brand = require("./models/Brand");
const Tag = require("./models/Tag");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, token");
    next();
});

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 3,
    // message: "Too many accounts created from this IP, please try again after 15 minutes",
});
const generalLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 10,
    // message: "Too many accounts created from this IP, please try again after 15 minutes",
});
app.use("/admin/login/", loginLimiter);
app.use(generalLimit);
app.use(command);
app.use(roleRoute);
app.use(adminRoute);
app.use(permissionRoute);
app.use(adminLoginRoute);
app.use(categoryRoute);
app.use(brandRoute);
app.use(sellerProductRoute);
app.use(userProductRoute);
app.use(TagRoute);
app.use(customerRoute);
Admin.belongsTo(Role); // Will add rold_id to user
Product.belongsTo(Category);
Product.belongsTo(Brand);
Product.belongsTo(Tag);

Permission.belongsToMany(Role, { through: rolePermission });
Product.belongsToMany(UserType, { through: TypePrice });
//Role.belongsToMany(Permission, { through: rolePermission });
sequelize.sync({});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0");

// USER HAS ONE TYPE
// TYPE HAS MANY USER

// todo :
// magic of
// array of obj
// upload photo
