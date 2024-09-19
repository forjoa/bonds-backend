import { SignJWT, jwtVerify } from 'jose'
import { hash, compare } from 'bcrypt'
import { JWTPayload } from 'ts-jose'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export const encrypt = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 week')
    .sign(key)
}

export const decrypt = async (input: string) => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export const hashPasswords = async (password: string) => {
  return await hash(password, 10)
}

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}
