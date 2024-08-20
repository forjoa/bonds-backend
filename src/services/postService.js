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
            EXISTS (
                SELECT 1 FROM likes
                WHERE likes.postid = posts.postid
                AND likes.userid = ${userid}
            ) AS userliked,
            COALESCE(
                json_agg(
                    DISTINCT jsonb_build_object(
                        'commentid', comments.commentid,
                        'content', comments.content,
                        'createdat', comments.createdat,
                        'userid', comment_users.userid,
                        'fullname', comment_users.fullname,
                        'username', comment_users.username
                    )
                ) FILTER (WHERE comments.commentid IS NOT NULL), '[]'
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
            LEFT JOIN comments ON posts.postid = comments.postid
            LEFT JOIN users AS comment_users ON comments.userid = comment_users.userid
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

export const likeService = async ({ postid, userid }) => {
    const result = await sql`INSERT INTO likes (postid, userid) VALUES (${postid}, ${userid})`

    return result.length === 0 ? { success: true, message: 'Like given correctly.' } : { success: false, message: 'Something went wrong.' }
}

