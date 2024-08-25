import { sql } from '../config/database.js'

export const uploadPostService = async ({ userid, content, files }) => {
  try {
    const [newPost] = await sql`
        INSERT INTO posts (userid, content)
        VALUES (${userid}, ${content})
        RETURNING postid;
      `

    const postid = newPost.postid

    if (files.length > 0) {
      const photoInsertions = files.map(
        (file) =>
          sql`INSERT INTO photos (postid, url) VALUES (${postid}, ${file})`,
      )

      await Promise.all(photoInsertions)
    }

    return { success: true, message: 'Post and files uploaded correctly.' }
  } catch (error) {
    console.error('Error uploading post:', error)
    return { success: false, message: 'Something went wrong during upload.' }
  }
}

export const getHomeService = async ({ userid, page, limit }) => {
  const offset = (page - 1) * limit

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
            posts.createdat DESC
        LIMIT ${limit} OFFSET ${offset};
    `

  return result
}

export const likeService = async ({ postid, userid }) => {
  const [{ count }] =
    await sql`SELECT COUNT(*)::int FROM likes WHERE postid = ${postid} AND userid = ${userid}`

  if (count === 0) {
    const [insertResult] = await sql`
        INSERT INTO likes (postid, userid) 
        VALUES (${postid}, ${userid})
        RETURNING likeid
      `
    return {
      success: true,
      message: 'Like given correctly.',
      referenceid: insertResult.likeid,
    }
  } else {
    await sql`DELETE FROM likes WHERE postid = ${postid} AND userid = ${userid}`
    return { success: true, message: 'Like deleted correctly.' }
  }
}

export const commentService = async ({ userid, postid, content }) => {
  const [insertResult] = await sql`
      INSERT INTO comments (postid, userid, content) 
      VALUES (${postid}, ${userid}, ${content}) 
      RETURNING commentid
    `

  return insertResult
    ? {
        success: true,
        message: 'Comment sent correctly.',
        referenceid: insertResult.commentid,
      }
    : {
        success: false,
        message: 'Something went wrong.',
      }
}

export const getMyPostsService = async ({ userid, page, limit }) => {
  const offset = (page - 1) * limit

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
            LEFT JOIN photos ON posts.postid = photos.postid
            LEFT JOIN likes ON posts.postid = likes.postid
            LEFT JOIN comments ON posts.postid = comments.postid
            LEFT JOIN users AS comment_users ON comments.userid = comment_users.userid
        WHERE
            posts.userid = ${userid}
        GROUP BY
            posts.postid, posts.content, posts.createdat, users.username, users.userid, users.fullname, users.profilephoto
        ORDER BY
            posts.createdat DESC
        LIMIT ${limit} OFFSET ${offset};
    `

  return result
}
