export const createSuccessPage = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Authentication Successful</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: #1a1a1a;
                    color: white;
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                p { font-size: 1.2em; }
            </style>
        </head>
        <body>
            <h1>Authentication Successful!</h1>
            <p>You have successfully connected your Spotify account.</p>
            <p>You can close this window and return to the terminal.</p>
        </body>
        </html>
    `;
};
