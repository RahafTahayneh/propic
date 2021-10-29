import { UserProfile } from "@clerk/clerk-react";

const UserProfilePage = () => <UserProfile routing={"path"} path={"/user"} />;

export default UserProfilePage;
