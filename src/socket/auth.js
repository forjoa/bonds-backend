import jwt from 'jsonwebtoken';

export function validateToken(token) {
    try {
        const decoded = jwt.verify(token, 'secret');
        return decoded;
    } catch (err) {
        return null;
    }
}
