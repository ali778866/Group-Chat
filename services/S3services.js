require('dotenv').config();
const AWS = require('aws-sdk');

exports.uploadToS3 = (file) => {
    const BUCKET_NAME = 'grpchatapp';
    const AWS_REGION = 'us-east-1'

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRATE_ACCESS_KEY,
        region: AWS_REGION
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: `${file.originalname}/${new Date()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err)
            } else {
                resolve(response.Location)
            }
        })
    })
}
