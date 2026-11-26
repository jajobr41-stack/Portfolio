Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$sourceFile = "carmensandiego.jpg"
$outputFile = "carmensandiego.webp"

$img = [System.Drawing.Image]::FromFile($sourceFile)
$bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
$bitmap.BeginInit()
$bitmap.UriSource = New-Object System.Uri($sourceFile)
$bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
$bitmap.EndInit()

$encoder = New-Object System.Windows.Media.Imaging.WebPBitmapEncoder
$encoder.Quality = 85

$frame = [System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap)
$encoder.Frames.Add($frame)

$file = [System.IO.File]::Create($outputFile)
$encoder.Save($file)
$file.Close()

Write-Host "Imagem convertida para WebP com sucesso!"
