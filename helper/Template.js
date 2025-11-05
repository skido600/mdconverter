export function Template(blogLinks) {
  const indexHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>All Blogs</title>
   <link rel="stylesheet" href="./dist/style.css" />
  </head>
  <body>
   <nav>
      <p>mterczynski's blog</p>
      <p>About us</p>
    </nav>
 <section>
      <h1>Posts</h1>
      <ul>
        ${blogLinks}
      </ul>
    </section>
  </body>
</html>
`;

  return indexHTML;
}
