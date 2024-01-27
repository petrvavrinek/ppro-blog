import { useUserContext } from "@/hooks/use-user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Key } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarUserItem() {
  const navigate = useNavigate();
  const { user, clear } = useUserContext();

  if (!user) return <></>;

  const onAction = (key: Key) => {
    const options: Record<string, () => void> = {
      "my-profile": () => navigate(`/user/${user.id}`),
      settings: () => navigate(`/user/settings`),
    };
    const k = key as string;

    if (!(k in options)) return;
    options[k]();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          className="transition-transform cursor-pointer"
          name={user.username}
          avatarProps={{ src: user.photo }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Menu actions" onAction={onAction}>
        <DropdownItem key="my-profile">My profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onPress={() => clear()}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
