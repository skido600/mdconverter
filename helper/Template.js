export function Template(blogLinks) {
  const indexHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>All Blogs</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>All Blogs</h1>
    <ul>${blogLinks}</ul>
  </body>
</html>
`;

  return indexHTML;
}
