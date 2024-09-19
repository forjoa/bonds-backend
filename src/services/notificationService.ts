import { sql } from '@/config/database'

export const newNotificationService = async ({
  userid,
  type,
  referenceid,
  seen = false,
}: {
  userid: number
  type: string
  referenceid: number
  seen?: boolean
}) => {
  await sql`INSERT INTO notifications (
                                    userid, 
                                    type, 
                                    referenceid, 
                                    seen
                                    ) 
                            VALUES (
                                    ${userid}, 
                                    ${type}, 
                                    ${referenceid}, 
                                    ${seen}
                        )`
}

export const getNotificationsService = async ({ id }: { id: number }) => {
  const notifications = await sql`
    SELECT n.type, n.referenceid, u.username, u.profilephoto, n.seen, n.notificationid,
           CASE 
             WHEN n.type = 'like' THEN l.postid
             WHEN n.type = 'comment' THEN c.postid
             -- Agrega más casos según sea necesario para otros tipos
           END AS postid
    FROM notifications n
    JOIN users u ON u.userid = 
      CASE 
        WHEN n.type = 'like' THEN (SELECT userid FROM likes WHERE likeid = n.referenceid)
        WHEN n.type = 'comment' THEN (SELECT userid FROM comments WHERE commentid = n.referenceid)
        -- Agrega más casos según sea necesario para otros tipos
      END
    LEFT JOIN likes l ON n.type = 'like' AND l.likeid = n.referenceid
    LEFT JOIN comments c ON n.type = 'comment' AND c.commentid = n.referenceid
    -- Agrega más LEFT JOINs según sea necesario para otros tipos
    WHERE n.userid = ${id} AND u.userid != ${id}
  `

  return notifications
}

export const markAsReadService = async ({ id }: { id: number }) => {
  try {
    const result =
      await sql`update notifications set seen = true where notificationid = ${id}`
    return result
  } catch (error) {
    throw error
  }
}

export const markAsReadAllService = async ({ id }: { id: number }) => {
  try {
    const result =
      await sql`update notifications set seen = true where userid = ${id}`
    return result
  } catch (error) {
    throw error
  }
}
