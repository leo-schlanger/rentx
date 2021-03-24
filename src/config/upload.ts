import crypto from "crypto";
import multer, { Options } from "multer";
import { resolve } from "path";

export default {
  upload(folder: string): Options {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(6).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          callback(null, fileName);
        },
      }),
    };
  },
};
