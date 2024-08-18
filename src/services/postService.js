import { sql } from "../config/database.js"

export const uploadPostService = async ({ userid, content }) => {
    const result = await sql`INSERT INTO posts (userid, content) VALUES (${userid}, ${content})`

    return result.length === 0 ? { success: true, message: 'Post uploaded correctly.' } : { success: false, message: 'Something went wrong.' }
}

export const getHomeService = async ({ userid }) => {
    const result = await sql`
                            SELECT
                                posts.postid,
                                posts.content,
                                posts.createdat,
                                users.username,
                                users.userid,
                                COALESCE(
                                    json_agg(photos.url) FILTER (WHERE photos.url IS NOT NULL), '[]'
                                ) AS photos
                            FROM
                                posts
                                JOIN users on posts.userid = users.userid
                                LEFT JOIN friendships on (
                                    (friendships.userid = users.userid AND friendships.otheruserid = ${userid})
                                    OR (friendships.otheruserid = users.userid AND friendships.userid = ${userid})
                                )
                                LEFT JOIN photos on posts.postid = photos.postid
                            WHERE
                                posts.userid = ${userid}
                                OR friendships.userid = ${userid}
                                OR friendships.otheruserid = ${userid}
                            GROUP BY
                                posts.postid, posts.content, posts.createdat, users.username, users.userid
                            ORDER BY
                                posts.createdat DESC;
                        `;

    return result
}