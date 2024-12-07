import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) =>{
                if(err) reject(err)
                resolve(token)
            }
        );
    });
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user; // Puedes añadir los datos del usuario al request
        next(); // Continuar al siguiente middleware o ruta
    });
};