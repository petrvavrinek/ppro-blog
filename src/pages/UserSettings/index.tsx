import { UserContext } from "@/contexts/user.context";
import { useApiFetch } from "@/hooks/use-api";
import { Button, Image, Input } from "@nextui-org/react";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSettingsPage = () => {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return <></>;
  }
  const [photoUrl, setPhotoUrl] = useState<string>(user.photo);
  const [photo, setPhoto] = useState<File>();
  const [userData, setUserData] = useState<Partial<User>>(user);

  const useApi = useApiFetch();

  const onPhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    const [file] = files;

    setPhoto(file);
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const onSubmit = async () => {
    const dataResult = await useApi<User>("/user/me", {
      method: "PATCH",
      body: userData,
    });

    if (photo) {
      const data = new FormData();
      data.set("photo", photo);

      await useApi(`/user/me/photo`, {
        body: data,
        method: "PUT",
      });
      
      dataResult.photo = photoUrl;
    }

    if (dataResult) setUser(dataResult);
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-fit mb-2">
        <label htmlFor="photo">
          <Image
            src={photoUrl}
            radius="full"
            fallbackSrc="https://via.placeholder.com/250x250"
            width={250}
            height={250}
            className="cursor-pointer"
          />
        </label>
        <Input
          type="file"
          id="photo"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={(e) => onPhotoSelect(e)}
        />
      </div>
      <Input
        label="Username"
        defaultValue={user.username}
        value={userData.username}
        onValueChange={(e) => setUserData({ ...userData, username: e })}
        className="mb-2"
      />

      <Button color="primary" onPress={onSubmit}>
        Save
      </Button>
    </div>
  );
};
export default UserSettingsPage;
