export interface VisaProfiles{
  id:String,
  name:String,
  work_authorization:{
    title:String,
    start_date:String,
    end_date:String,
    days_remainding:Number,
    OPT_status:String
    },
  action:{
    OPT_status:String,
    file:String
  }
}

export interface VisaFiles{
  id:String,
  name:String,
  files:String[]
}


