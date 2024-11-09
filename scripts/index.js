import { v2 as cloudinary } from 'cloudinary';

// First, import cloudinary at the top of your file

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Cloudinary configuration
  cloudinary.config({ 
    cloud_name: 'dfk2xy4wm', 
    api_key: '652456149338924', 
    api_secret: 'TT3NOdmZMznZc8iJYp0fKashHmU' // Make sure to use your actual API secret
  });

  // Your existing code remains the same...
  const themeDropdownItems = document.querySelectorAll(".dropdown-item[data-theme]");
  // ... (rest of your existing code)

  // Add a function to handle image uploads
  async function handleImageUpload(imageFile) {
    try {
      const uploadResult = await cloudinary.uploader.upload(imageFile, {
        // You can specify options here
        fetch_format: 'auto',
        quality: 'auto'
      });
      console.log('Upload successful:', uploadResult);
      return uploadResult.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  // Example usage with a file input
  const fileInput = document.querySelector('input[type="file"]'); // Add this input to your HTML
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
          // Use the uploaded image URL as needed
          console.log('Uploaded image URL:', imageUrl);
        }
      }
    });
  }
});
