import multer from 'multer'
import path from 'path'

import { v2 as cloudinary} from 'cloudinary'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd() , '/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



 export const uploadtocloudinary = async (file: Express.Multer.File) => {
    // console.log("file", file)
        // Configuration
    cloudinary.config({ 
        cloud_name: 'dn6gwdr10', 
        api_key: '678461912558353', 
        api_secret: 'vmPHw2oT5tfj4thD6xil_FxTDj8' // Click 'View API Keys' above to copy your API secret
    });

        // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           file.path, {
               public_id: file.filename,
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
     return uploadResult
}




export default upload