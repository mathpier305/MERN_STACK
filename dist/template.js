"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;
function template(body) {
  return `<!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <style>
        .aColor{
          color:red;
        }

        .header {border-bottom: 1px solid silver; margin-bottom:  20px;}
        .footer { border-top: 1px solid silver; padding-top: 5px;
          margin-top: 10px; font-family: helvetica; font-size: 10px;
        color: grey
        }
        .panel-title a {display:block; width: 100%; cursor: pointer;}
        </style>
        <body>
          <div id="contents">${body} </div>
          <!--- this is where our component will appear -->
          <script src="/vendor.bundle.js"></script>
          <script src="/app.bundle.js"></script>
        </body>
      </html>
  `;
}
//# sourceMappingURL=template.js.map