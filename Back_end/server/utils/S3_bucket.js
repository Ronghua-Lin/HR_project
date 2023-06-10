require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const { getSignedUrl } = require( "@aws-sdk/s3-request-presigner");
const { S3,GetObjectCommand } = require('@aws-sdk/client-s3');
// const AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3');
const { sign } = require("jsonwebtoken");

const BUCKET = process.env.BUCKET


let s3 = new S3({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});
// let s3 = new AWS.S3({
//   region: process.env.REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_KEY,
//   }
 
// });



const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            // console.log('files in key',file);
            const filename= file.originalname+uuidv4()
            // req.body={...req.body, [file.fieldname]:filename}
            cb(null, filename)
        }
    }),
    limits:{
      fileSize:20000000
    }
})

// app.post('/upload', upload.single('file'), async function (req, res, next) {

//     res.send('Successfully uploaded ' + req.file.location + ' location!')

// })

// app.get("/list", async (req, res) => {

//     let r = await s3.listObjectsV2({ Bucket: BUCKET });
//     let x = r.Contents.map(item => item.Key);
//     res.send(x)
// })


// app.get("/download/:filename", async (req, res) => {
//     const filename = req.params.filename
//     let x = await s3.getObject({ Bucket: BUCKET, Key: filename });
//     res.send(x.Body)
// })

// app.delete("/delete/:filename", async (req, res) => {
//     const filename = req.params.filename
//     await s3.deleteObject({ Bucket: BUCKET, Key: filename });
//     res.send("File Deleted Successfully")

// })

exports.getSingleFile=async(filename)=>{
  // let x = await s3.getObject({ Bucket: BUCKET, Key: filename });
  // const signedUrl = await s3.getSignedUrlPromise('getObject', getSignedUrlParams);

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key:filename,
    ACL:'public-read',
    Expires:60*30
  });
  const signedUrl = await getSignedUrl(s3, command);
  // console.log('this is x',signedUrl)
  return signedUrl


}

// exports.uploadSingleFile=async(filename)=>{
//   // await upload.single('file')
//   await upload.fields({name:'profile_picture',maxCount:1})

// }
exports.fileupload=upload.fields([{name:'profile_picture_source',maxCount:1}, { name: 'license_copy_source', maxCount: 1 }, { name: 'OPT_receipt', maxCount:1 }])
// exports.fileupload=(req, res, next)=>{
//   console.log('req. in upload',req)
//   console.log('req. in upload',req.body)
//   console.log('data in upload',req.files)
//   // console.log('data in upload',res)

//   upload.single('profile_picture')
// }

exports.deleteSingleFile=async(filename)=>{
  await s3.deleteObject({ Bucket: BUCKET, Key: filename });

}
// exports.uploadSingleFile=async(fileName,data)=>{
//   const fileData=new Buffer(data, 'binary').toString('base64');
//   console.log('file data ',fileData)
//   // const fileData=JSON.stringify(data)
//   const params={
//     Bucket: BUCKET,
//     Key: fileName,
//     Body: fileData,
//     'ACL':'public-read'
//   }
//   s3.putObject(params,function(err,data){
//     if (err) {
//       reject(err);
//      } else {
//       console.log('here are upload data',data)
//       // resolve(data);
//      }
//   })

// }

