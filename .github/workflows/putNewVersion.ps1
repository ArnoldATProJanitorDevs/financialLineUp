$relativePath = Get-ChildItem ..\..\src\environments\version.json 
$versionJson = Get-Content $relativePath -raw | ConvertFrom-Json

Write-Output $relativePath
Write-Output $versionJson

$versionJson.minor = $versionJson.minor + 1

$versionJson | ConvertTo-Json | set-content $relativePath

Write-Output $versionJson
