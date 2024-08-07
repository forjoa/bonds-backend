import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcrypt';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 week')
        .sign(key);
};

export const decrypt = async (input) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
};

export const hashPasswords = async (password) => {
    return await hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
};