import { Button } from "@nextui-org/react"
import { PiSmileyFill, PiSmileyMeltingFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { BsIncognito } from "react-icons/bs";

import { useUser } from "../context/UserContext.jsx";

const Login = () => {
    const { anonymousLogin, loginWithEmail, registerWithEmail, googlePopupLogin } = useUser();




    const handleEmailLogin = async (values) => {
        const success = await loginWithEmail(values.email, values.password);
        if (success) {
            console.log("Logged in as", values.email);
        }
    };


    const handleEmailRegister = async (values) => {
        const success = await registerWithEmail(values.email, values.password);
        if (success) {
            console.log("Registered as", values.email);
        }
    };

    const handleGoogleLogin = async () => {
        const success = await googlePopupLogin();
        if (success) {
            console.log("Logged in with google");
        }
    };

    const handleAnonymousLogin = async () => {
        const success = await anonymousLogin();
        if (success) {
            console.log("Logged in anoymously");
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