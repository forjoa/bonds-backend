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
            users.fullname,
            users.profilephoto,
            COALESCE(
                json_agg(DISTINCT photos.url) FILTER (WHERE photos.url IS NOT NULL), '[]'
            ) AS photos,
            COUNT(DISTINCT likes.likeid) AS likecount,
            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'commentid', comments.commentid,
                            'content', comments.content,
                            'createdat', comments.createdat,
                            'userid', commenters.userid,
                            'fullname', commenters.fullname,
                            'username', commenters.username
                        )
                    )
                    FROM comments
                    JOIN users AS commenters ON comments.userid = commenters.userid
                    WHERE comments.postid = posts.postid
                ), '[]'
            ) AS comments
        FROM
            posts
            JOIN users ON posts.userid = users.userid
            LEFT JOIN friendships ON (
                (friendships.userid = users.userid AND friendships.otheruserid = ${userid})
                OR (friendships.otheruserid = users.userid AND friendships.userid = ${userid})
            )
            LEFT JOIN photos ON posts.postid = photos.postid
            LEFT JOIN likes ON posts.postid = likes.postid
        WHERE
            posts.userid = ${userid}
            OR friendships.userid = ${userid}
            OR friendships.otheruserid = ${userid}
        GROUP BY
            posts.postid, posts.content, posts.createdat, users.username, users.userid, users.fullname, users.profilephoto
        ORDER BY
            posts.createdat DESC;
    `;

    return result;
}
