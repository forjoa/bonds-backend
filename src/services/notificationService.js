import { sql } from '../config/database.js'

export const newNotificationService = async ({
  userid,
  type,
  referenceid,
  seen = false,
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
