# High-quality video compression for Vercel deploy (CRF 18-20, preserve resolution/fps)
$ErrorActionPreference = "Stop"

$localFfmpeg = Join-Path $PSScriptRoot "..\.tools\ffmpeg\ffmpeg-8.1.1-essentials_build\bin\ffmpeg.exe"
$ffmpegCmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
$ffmpeg = if ($ffmpegCmd) { $ffmpegCmd.Source } elseif (Test-Path $localFfmpeg) { (Resolve-Path $localFfmpeg).Path } else { $null }
if (-not $ffmpeg) { throw "ffmpeg not found" }

$root = (Resolve-Path (Join-Path $PSScriptRoot "..\public\videos")).Path
$tmp = Join-Path $env:TEMP "yogi-videos-compress-$(Get-Date -Format 'yyyyMMddHHmmss')"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
$beforeTotal = (Get-ChildItem $root -Recurse -File | Measure-Object Length -Sum).Sum
Write-Host "Before: $([math]::Round($beforeTotal/1MB,1)) MB"
Write-Host "Using ffmpeg: $ffmpeg"

function Invoke-Ffmpeg([string[]]$FfmpegArgs) {
  $log = Join-Path $env:TEMP "yogi-ffmpeg-last.log"
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & $ffmpeg @FfmpegArgs 2> $log | Out-Null
  $code = $LASTEXITCODE
  $ErrorActionPreference = $prev
  if ($code -ne 0) {
    $detail = Get-Content $log -Raw -ErrorAction SilentlyContinue
    throw "ffmpeg failed (exit $code): $detail"
  }
}

function Compress-Video([string]$inputPath, [string]$outputPath) {
  Invoke-Ffmpeg @(
    "-y", "-i", $inputPath,
    "-c:v", "libx264", "-crf", "19", "-preset", "slow",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "128k",
    $outputPath
  )
}

function Convert-GifToMp4([string]$inputPath, [string]$outputPath) {
  Invoke-Ffmpeg @(
    "-y", "-i", $inputPath,
    "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-an",
    $outputPath
  )
}

$pathMap = @{}
$files = @(Get-ChildItem $root -Recurse -File)

foreach ($file in $files) {
  $rel = $file.FullName.Substring($root.Length + 1)
  $ext = $file.Extension.ToLower()
  $relDir = Split-Path $rel -Parent
  $safeBase = ($file.BaseName -replace '\s+', '-')
  $outName = if ($ext -in ".gif", ".mov") {
    if ($relDir) { Join-Path $relDir "$safeBase.mp4" } else { "$safeBase.mp4" }
  } else { $rel }
  $outPath = Join-Path $tmp $outName
  $outDir = Split-Path $outPath -Parent
  if ($outDir -and -not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

  Write-Host "Compressing $rel -> $outName"
  if ($ext -eq ".gif") {
    Convert-GifToMp4 $file.FullName $outPath
    $pathMap["/videos/$($rel -replace '\\','/')"] = "/videos/$($outName -replace '\\','/')"
  } elseif ($ext -in ".mp4", ".mov") {
    Compress-Video $file.FullName $outPath
    if ($ext -eq ".mov") {
      $pathMap["/videos/$($rel -replace '\\','/')"] = "/videos/$($outName -replace '\\','/')"
    }
  } else {
    Copy-Item $file.FullName $outPath -Force
  }
}

foreach ($file in $files) { Remove-Item $file.FullName -Force }
Get-ChildItem $tmp -Recurse -File | ForEach-Object {
  $dest = Join-Path $root $_.FullName.Substring($tmp.Length + 1)
  $destDir = Split-Path $dest -Parent
  if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force -Path $destDir | Out-Null }
  Move-Item $_.FullName $dest -Force
}
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue

$pathMap | ConvertTo-Json | Set-Content (Join-Path $PSScriptRoot "video-path-map.json")
$after = (Get-ChildItem $root -Recurse -File | Measure-Object Length -Sum).Sum
Write-Host "After: $([math]::Round($after/1MB,1)) MB (saved $([math]::Round(($beforeTotal-$after)/1MB,1)) MB)"
Write-Host "Done."
