export interface BundleSettingsInterface{
  languages:Array<{code:string , name:string}>,
  inactivityWarningTimer: number,
  inactivityCloseTimer: number
  closeTimeLeft?:number
}
