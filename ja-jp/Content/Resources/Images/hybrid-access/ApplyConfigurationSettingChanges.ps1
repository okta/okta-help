[System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")

$BinDir = "C:\Program Files\Okta\Okta MFA Provider\bin"
$ConfigDir = "C:\Program Files\Okta\Okta MFA Provider\config"

Start-Service adfssrv

# Remove Okta MFA Provider
$providers = (Get-AdfsGlobalAuthenticationPolicy).AdditionalAuthenticationProvider
$providers.Remove("OktaMfaAdfs") 
Set-AdfsGlobalAuthenticationPolicy -AdditionalAuthenticationProvider $providers

# Unregister 
Unregister-AdfsAuthenticationProvider -Name "OktaMfaAdfs" -Confirm:$false -ErrorAction Stop

# restart the ADFS service
Restart-Service adfssrv -Force

# register MFA adapter again
$OktaMfaAssamply = [Reflection.Assembly]::Loadfile($BinDir + "\OktaMfaAdfs.dll")
$typeName = "OktaMfaAdfs.AuthenticationAdapter, OktaMfaAdfs, Version=" + $OktaMfaAssamply.GetName().Version + ", Culture=neutral, PublicKeyToken=3c924b535afa849b"
Register-AdfsAuthenticationProvider -TypeName $typeName -Name "OktaMfaAdfs" -Verbose -ConfigurationFilePath "$ConfigDir\okta_adfs_adapter.json"

# restart the service
Restart-Service adfssrv -Force

# Enable Okta MFA adapter
$providers = (Get-AdfsGlobalAuthenticationPolicy).AdditionalAuthenticationProvider
$providers.Add("OktaMfaAdfs") 
Set-AdfsGlobalAuthenticationPolicy -AdditionalAuthenticationProvider $providers