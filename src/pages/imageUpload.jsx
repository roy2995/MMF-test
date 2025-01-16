import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Page2 = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false); 
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadMessage("Please upload a valid image file.");
      setImageUploaded(false);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadMessage("Please upload a valid image file.");
      setImageUploaded(false);
      return;
    }

    setUploading(true);
    setUploadMessage("Uploading image..."); 
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dum3zgned/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        localStorage.setItem("userImage", data.secure_url); 
        setUploadMessage("Image uploaded successfully!"); 
        setImageUploaded(true); 
      } else {
        setUploadMessage("Failed to upload image.");
        setImageUploaded(false);
      }
    } catch (error) {
      console.error(error);
      setUploadMessage("An error occurred while uploading the image.");
      setImageUploaded(false);
    } finally {
      setUploading(false);
    }
  };

  const handleNext = () => {
    if (!imageUploaded) {
      setUploadMessage("You must upload an image before proceeding.");
      return;
    }
    navigate("/welcome");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <motion.div
        className="w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Please upload your profile picture:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input type="file" onChange={handleImageUpload} disabled={uploading} />
              {uploadMessage && (
                <div className="text-center text-sm mt-2">
                  <p className={`text-${uploadMessage.includes("successfully") ? "green" : "red"}-500`}>
                    {uploadMessage}
                  </p>
                </div>
              )}
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto"
                disabled={uploading || !imageUploaded} 
              >
                {uploading ? "Uploading..." : "Next"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            {/* Footer content */}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page2;
