import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} imageBuffer - Image buffer from API
 * @param {String} publicId - Public ID for the image (optional)
 * @param {String} folder - Folder path in Cloudinary (optional)
 * @returns {Promise} Upload response with secure_url
 */
export const uploadImageToCloudinary = async (imageBuffer, publicId = null, folder = 'quicksol/images') => {
    return new Promise((resolve, reject) => {
        // Convert buffer to stream
        const stream = Readable.from(imageBuffer);
        
        // Upload stream to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                public_id: publicId,
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Pipe buffer to upload stream
        stream.pipe(uploadStream);
    });
};

/**
 * Delete image from Cloudinary by public ID
 * @param {String} publicId - Public ID of the image to delete
 * @returns {Promise} Delete response
 */
export const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

/**
 * Get image URL from Cloudinary
 * @param {String} publicId - Public ID of the image
 * @returns {String} Secure URL of the image
 */
export const getImageUrl = (publicId) => {
    return cloudinary.url(publicId, {
        secure: true,
        width: 500,
        height: 500,
        crop: 'fill'
    });
};

export default cloudinary;
