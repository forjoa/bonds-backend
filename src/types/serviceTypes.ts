import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

// AUTH SERVICE
export interface VerifyTokenParams {
  token: string
}

export interface TokenPayload {
  userid: string
  exp: number
}

// NOTIFICATION SERVICE
export interface NewNotificationParams {
  userid: number
  type: string
  referenceid: number
  seen?: boolean
}

export interface GetNotificationParams {
  id: number
}

export interface MarkAsReadParams {
  id: number
}

export interface MarkAsReadAllParams {
  id: number
}

// POST SERVICE
export interface UploadPostParams {
  userid: number
  content: string
  files: string[]
}

export interface GetHomeParams {
  userid: number
  page: number
  limit: number
}

export interface LikeParams {
  postid: number
  userid: number
}

export interface CommentParams {
  userid: number
  postid: number
  content: string
}

export interface MyProfileParams {
  userid: number
  page: number
  limit: number
}

export interface GetPostInfoParams {
  userid: number
  postid: number
}

// USER SERVICE
export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams {
  username: string
  fullname: string
  email: string
  password: string
  phone: string
  profilephoto: string
  bio: string
}

export interface EditProfileParams {
  userid: number
  username: string
  fullname: string
  email: string
  password: string
  phone: string
  profilephoto: string
  bio: string
}
