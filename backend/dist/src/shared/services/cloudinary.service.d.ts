import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadStream(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
