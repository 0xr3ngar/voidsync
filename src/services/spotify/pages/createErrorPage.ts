export const createErrorPage = (title: string, message: string): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    color: white;
                    background: #1a1a1a;
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                p { font-size: 1.2em; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p>${message}</p>
            <p>You can close this window and try again.</p>
        </body>
        </html>
    `;
};
