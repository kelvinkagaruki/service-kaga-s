param(
    [int]$Port = 8080
)

$root = Get-Location
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $root on $prefix (Press Ctrl+C to stop)"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $relativePath = $request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = 'index.html'
    }

    $filePath = Join-Path $root $relativePath
    if (Test-Path $filePath -PathType Leaf) {
        try {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = switch ([IO.Path]::GetExtension($filePath).ToLower()) {
                '.html' { 'text/html' }
                '.css' { 'text/css' }
                '.js' { 'application/javascript' }
                '.json' { 'application/json' }
                '.png' { 'image/png' }
                '.jpg' | '.jpeg' { 'image/jpeg' }
                '.svg' { 'image/svg+xml' }
                '.ico' { 'image/x-icon' }
                default { 'application/octet-stream' }
            }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $response.StatusCode = 500
            $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error`n$($_.Exception.Message)")
            $response.ContentLength64 = $errorBytes.Length
            $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
        }
    } else {
        $response.StatusCode = 404
        $notFound = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response.ContentLength64 = $notFound.Length
        $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }

    $response.OutputStream.Close()
}
