$start = Get-Date
$process = Start-Process "cmd.exe" -ArgumentList "/c npm start > log.txt 2>&1" -NoNewWindow
Write-Host "Esperando a que el servidor arranque..."

# Esperamos a que el archivo de log contenga 'Compiled successfully'
do {
    Start-Sleep -Milliseconds 500
    $content = Get-Content .\log.txt -Raw
} while ($content -notmatch 'Compiled successfully')

$end = Get-Date
$duration = $end - $start
Write-Host "El servidor se inició en $($duration.TotalSeconds) segundos"
