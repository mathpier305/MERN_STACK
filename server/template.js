export default function template(body, initialState){
  return `<!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
        <meta name="google-signin-client_id" content="vama50j9hj8rcg5omt0a6ra3h7fut7on.apps.googleusercontent.com">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/react-select/dist/react-select.css" />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <style>
          .aColor{
            color:red;
          }
        .panel-title a {display:block; width: 100%; cursor: pointer;}
        </style>
        <body>
          <div id="contents">${body}</div>

          <!--- this is where our component will appear -->
          <script>
            window.__INITIAL_STATE__ =${JSON.stringify(initialState)};
          </script>
          <script src="/vendor.bundle.js"></script>
          <script src="/app.bundle.js"></script>
          <script src="/config.js"></script>
        </body>
      </html>`;
}
