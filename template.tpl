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
            <li>Client IP: {{7*'7'}}</li> 
            <li>Client IP: {{.ClientIP}}</li>
            <li>Client User Agent: {{.ClientUA}}</li>
            <li>IP Version: {{.ClientIpInfo.IpVersion}}</li>
            <li>IP Address: {{.ClientIpInfo.IpAddress}}</li>
            <li>Latitude: {{.ClientIpInfo.Latitude}}</li>
            <li>Longitude: {{.ClientIpInfo.Longitude}}</li>
            <li>Country Name: {{.ClientIpInfo.CountryName}}</li>
            <li>Country Code: {{.ClientIpInfo.CountryCode}}</li>
            <li>Time Zone: {{.ClientIpInfo.TimeZone}}</li>
            <li>Zip Code: {{.ClientIpInfo.ZipCode}}</li>
            <li>City Name: {{.ClientIpInfo.CityName}}</li>
            <li>Region Name: {{.ClientIpInfo.RegionName}}</li>
            <li>Continent: {{.ClientIpInfo.Continent}}</li>
            <li>Continent Code: {{.ClientIpInfo.ContinentCode}}</li>
            <li>Server Hostname: {{.ServerInfo.Hostname}}</li>
            <li>Server OS: {{.ServerInfo.OS}}</li>
            <li>Kernel Version: {{.ServerInfo.KernelVersion}}</li>
            <li>Memory: {{.ServerInfo.Memory}}</li>
        </ul>
    </main>
    <footer>
        <p>Enter the link to your template!</p>
        <!-- You can add an input field or a form here if needed -->
    </footer>
</body>
</html>
