import multer from "multer";
import multerS3 from "multer-s3";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "@/config";
import QRCode from "qrcode";

const BucketName = "msquarefdc";

export const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

/* page router */
// export const assetUpload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: "msquarefdc",
//     acl: "public-read",
//     key: (req, file, cb) => {
//       cb(
//         null,
//         `foodie-pos/msquarefdc-batch3/nathaniel/${Date.now().toString()}_${
//           file.originalname
//         }`
//       );
//     },
//   }),
// }).single("file");

/* app router */
export const assetUpload = async (
  fileStream: Buffer,
  fileName: string
): Promise<string> => {
  const params = {
    Bucket: BucketName,
    Key: `foodie-pos/msquarefdc-batch3/nathaniel/${Date.now().toString()}_${fileName}`,
    ACL: ObjectCannedACL.public_read,
    Body: fileStream,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/${params.Key}`;

  // const url = await getSignedUrl(
  //   s3Client,
  //   new GetObjectCommand({ Bucket: BucketName, Key: params.Key }),
  //   { expiresIn: 3600 }
  // );
};

export const generateLinkForQRCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const qrCodeImageUpload = async (tableId: number) => {
  try {
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    const params = {
      Bucket: BucketName,
      Key: `foodie-pos/msquarefdc-batch3/nathaniel/qrcode/tableId-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/nathaniel/qrcode/tableId-${tableId}.png`;
  } catch (err) {
    console.log(err);
  }
};
