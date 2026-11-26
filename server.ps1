$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:5500/')
$listener.Start()
Write-Output 'SERVIDOR_ATIVO: http://localhost:5500'

$mimes = @{
    '.html' = 'text/html; charset=utf-8'
    '.js' = 'application/javascript'
    '.css' = 'text/css'
    '.jpg' = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.png' = 'image/png'
    '.webp' = 'image/webp'
    '.mp4' = 'video/mp4'
    '.mpeg' = 'audio/mpeg'
    '.mp3' = 'audio/mpeg'
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
        if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
        $path = Join-Path $root $relative

        if (Test-Path $path -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $extension = [System.IO.Path]::GetExtension($path).ToLower()
            $contentType = $mimes[$extension]
            if ($contentType) { $context.Response.ContentType = $contentType }
            $context.Response.Headers.Add('Accept-Ranges', 'bytes')

            $start = 0
            $end = $bytes.Length - 1
            $isRange = $context.Request.Headers['Range']
            if ($isRange -and $isRange -match 'bytes=(\d*)-(\d*)') {
                $rangeStart = $Matches[1]
                $rangeEnd = $Matches[2]
                if ($rangeStart) { $start = [int64]$rangeStart }
                if ($rangeEnd) { $end = [int64]$rangeEnd } else { $end = $bytes.Length - 1 }
                if ($end -ge $bytes.Length) { $end = $bytes.Length - 1 }
                $context.Response.StatusCode = 206
                $context.Response.Headers.Add('Content-Range', "bytes $start-$end/$($bytes.Length)")
                $length = $end - $start + 1
            } else {
                $context.Response.StatusCode = 200
                $length = $bytes.Length
            }

            $context.Response.ContentLength64 = $length
            $context.Response.OutputStream.Write($bytes, [int]$start, [int]$length)
        } else {
            $context.Response.StatusCode = 404
        }

        $context.Response.OutputStream.Close()
        $context.Response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
