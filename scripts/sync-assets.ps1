# Sync source assets from "yodi new" into public/
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$root\yodi new")) {
  $root = "e:\projects\yogi"
}
$src = Join-Path $root "yodi new"
$pub = Join-Path $root "public"

New-Item -ItemType Directory -Force -Path "$pub\fonts", "$pub\audio", "$pub\images\clients" | Out-Null

Copy-Item "$src\CormorantGaramond-VariableFont_wght.woff2" "$pub\fonts\CormorantGaramond.woff2" -Force
Copy-Item "$src\santoshi font\Satoshi-Variable.woff2" "$pub\fonts\Satoshi-Variable.woff2" -Force
Copy-Item "$src\yogi_potrait.jpeg" "$pub\images\yogii-portrait.jpg" -Force
Copy-Item "$src\og-image.jpeg" "$pub\images\og-image.jpg" -Force
Copy-Item "$src\ambient-loop.mp3" "$pub\audio\ambient-loop.mp3" -Force

Write-Host "Assets synced to $pub"
