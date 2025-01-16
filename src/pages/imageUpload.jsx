import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Para la animación

const Page2 = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(""); // Estado para el mensaje de carga
  const [imageUploaded, setImageUploaded] = useState(false); // Estado para verificar si la imagen fue cargada

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
    setUploadMessage("Uploading image..."); // Mensaje de inicio de carga
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
        localStorage.setItem("userImage", data.secure_url); // Guardar URL de imagen
        setUploadMessage("Image uploaded successfully!"); // Mensaje de éxito
        setImageUploaded(true); // Cambiar el estado de imagen cargada
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
      return; // No permite continuar si la imagen no fue cargada
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
                disabled={uploading || !imageUploaded} // Deshabilitar si no se ha cargado una imagen
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
