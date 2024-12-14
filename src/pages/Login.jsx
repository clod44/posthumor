import { Button } from "@nextui-org/react"
import { FcGoogle } from "react-icons/fc";
import { BsIncognito } from "react-icons/bs";
import { useAuth } from "../hooks/useServices";

const Login = () => {
    const { anonymousLogin, googlePopupLogin } = useAuth();
    const handleGoogleLogin = async () => {
        try {
            await googlePopupLogin();
        } catch (error) {
            console.error("Error during Google login:", error.message);
        }
    };
    const handleAnonymousLogin = async () => {
        try {
            await anonymousLogin();
        } catch (error) {
            console.error("Error during anonymous login:", error.message);
        }
    };
    return (
        <div className="h-lvh flex flex-col justify-center items-center">
            <div className="flex gap-2">
                <Button
                    isIconOnly
                    size="lg"
                    className="p-2"
                    variant="light"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className="w-full h-full" />
                </Button>
                <Button
                    isIconOnly
                    size="lg"
                    className="p-2"
                    variant="light"
                    onClick={handleAnonymousLogin}
                >
                    <BsIncognito className="w-full h-full" />
                </Button>
            </div>
        </div>
    );
}

export default Login