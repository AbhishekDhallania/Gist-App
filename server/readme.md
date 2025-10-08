# Instant Gist Sharing

## /auth endpoints
-- /register `post` {username,email,password}
-- /login    `post` {email,password}
-- /me       `get` 

## /gist endpoint
-- /create  `post` {title,language,code}
-- /mygists `get` --> fetch all gists of user
-- /delete/:id  `delete` --> delete a gist
-- /:id       `get` --> fetch gist data
