import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWhoAmIContext } from "@/context/WhoAmIContext";
import profileImage from "../../assets/default_pfp.png"; // Importing the default profile image
import { RiUpload2Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAvatar } from "@/services/UserService";

const UserAvatar = () => {
  const [avatarURL, setAvatarURL] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { whoAmI, saveWhoAmI } = useWhoAmIContext();

  useEffect(() => {
    console.log(typeof whoAmI?.avatarURL)
    setAvatarURL(whoAmI?.avatarURL);
  }, [whoAmI?.avatarURL]);

  const handleSubmit = () => {
    setAvatarURL(inputValue);
    saveWhoAmI({ ...whoAmI, avatarURL : inputValue })
    updateAvatar(inputValue);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer relative">
          <Avatar className="w-fit h-fit">
            <AvatarImage src={avatarURL} alt="@shadcn" />
            <AvatarFallback>
              <img src={profileImage} alt="Profile" className="w-fit h-fit" />
            </AvatarFallback>
          </Avatar>
          <RiUpload2Line className="w-8 h-8 absolute bottom-0 -right-2" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avatar URL</DialogTitle>
          <DialogDescription>
            Anyone who has this link may be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={avatarURL}
              placeholder="Enter Avatar URL"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
