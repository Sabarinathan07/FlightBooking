const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        console.log(token);
        if (!token) {
            return res.status(401).send({
                message: "Auth failed",
                success: false,
            });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.params.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
};