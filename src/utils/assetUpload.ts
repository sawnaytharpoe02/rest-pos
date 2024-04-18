import multer from "multer";
import multerS3 from "multer-s3";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "@/config";

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
    Body: fileStream,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: BucketName, Key: params.Key }),
    { expiresIn: 3600 }
  );

  return url;
};
