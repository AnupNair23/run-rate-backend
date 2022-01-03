import jwt from 'jsonwebtoken';

function validateUser(req, res, next) {
    const token = req.headers['authorization'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                console.log('verify -- ', err);
                return res.status(401).json({ error: true, message: err.message });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(401).send('Unauthorized');
    }
}

export { validateUser };
