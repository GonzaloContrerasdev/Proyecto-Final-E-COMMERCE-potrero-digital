import { v2 as cloudinary } from 'cloudinary';

(async function() {


    cloudinary.config({ 
        cloud_name: 'dfk2xy4wm', 
        api_key: '652456149338924', 
        api_secret: 'TT3NOdmZMznZc8iJYp0fKashHmU' 
    });

    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    

    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();