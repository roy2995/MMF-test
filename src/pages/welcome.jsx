import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/Avatar";

const Welcome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);

    const imageUrl = localStorage.getItem("userImage");
    setImage(imageUrl);
  }, []);

  const handleRestart = () => {
    localStorage.clear();
    navigate("/"); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Thank you for providing your details. Here is your summary:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            {image ? (
              <Avatar className="h-24 w-24">
                <AvatarImage src={image} alt="Uploaded Avatar" />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-24 w-24">
                <AvatarFallback>No Image</AvatarFallback>
              </Avatar>
            )}
          </div>


          <div className="space-y-2 text-center">
            <p><strong>Username:</strong> {userData?.stringInput || "N/A"}</p>
            <p><strong>Sex:</strong> {userData?.sex || "N/A"}</p>
            <p><strong>Age:</strong> {userData?.numberInput || "N/A"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestart} className="w-full">
            Restart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
