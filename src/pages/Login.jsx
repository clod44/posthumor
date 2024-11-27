import { Center, Card, Button, Divider, Checkbox, Tabs, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PiSmileyFill, PiSmileyMeltingFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { BsIncognito } from "react-icons/bs";

import { useUser } from "../context/UserContext.jsx";

const Login = () => {
    const { anonymousLogin, loginWithEmail, registerWithEmail, googlePopupLogin } = useUser();

    const loginForm = useForm({
        onSubmitPreventDefault: 'always',
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'No Password Provided' : null),
        },
    });
    const registerForm = useForm({
        onSubmitPreventDefault: 'always',
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            passwordRepeat: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'No Password Provided' : null),
            passwordRepeat: (value, values) =>
                value !== values.password ? 'Passwords do not match' : null,
            termsOfService: (value) => (value ? null : 'You must agree to terms of service'),
        },
    });


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
        <Center>
            <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
                <Tabs defaultValue="login">
                    <Tabs.List grow mb={'md'}>
                        <Tabs.Tab value="login" leftSection={<PiSmileyMeltingFill size={20} />}>
                            Login
                        </Tabs.Tab>
                        <Tabs.Tab value="register" leftSection={<PiSmileyFill size={20} />}>
                            Register
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="login">
                        <form onSubmit={loginForm.onSubmit(handleEmailLogin)}>
                            <Stack
                                align="stretch"
                                justify="center"
                                gap="md"
                            >
                                <TextInput
                                    label="Email"
                                    placeholder="your@email.com"
                                    key={loginForm.key('email')}
                                    {...loginForm.getInputProps('email')}
                                />
                                <PasswordInput
                                    label="Password"
                                    placeholder="****"
                                    type='password'
                                    key={loginForm.key('password')}
                                    {...loginForm.getInputProps('password')}
                                />
                                <Button type="submit" >Login</Button>
                            </Stack>
                        </form>
                    </Tabs.Panel>

                    <Tabs.Panel value="register">
                        <form onSubmit={registerForm.onSubmit(handleEmailRegister)}>
                            <Stack
                                align="stretch"
                                justify="center"
                                gap="md"
                            >
                                <TextInput
                                    label="Email"
                                    placeholder="your@email.com"
                                    key={registerForm.key('email')}
                                    {...registerForm.getInputProps('email')}
                                />
                                <PasswordInput
                                    label="Password"
                                    placeholder="****"
                                    type='password'
                                    key={registerForm.key('password')}
                                    {...registerForm.getInputProps('password')}
                                />
                                <PasswordInput
                                    label="Password Repeat"
                                    placeholder="****"
                                    type='passwordRepeat'
                                    key={registerForm.key('passwordRepeat')}
                                    {...registerForm.getInputProps('passwordRepeat')}
                                />

                                <Checkbox
                                    label="I agree to sell my privacy"
                                    key={registerForm.key('termsOfService')}
                                    {...registerForm.getInputProps('termsOfService', { type: 'checkbox' })}
                                />

                                <Button type="submit" >Continue</Button>
                            </Stack>
                        </form>
                    </Tabs.Panel>

                </Tabs>

                <Divider my="md" />

                <Group justify='center'>
                    <Button variant="subtle" onClick={handleGoogleLogin} >
                        <FcGoogle size={20} />
                    </Button>
                    <Button variant="subtle" onClick={handleAnonymousLogin}>
                        <BsIncognito size={20} />
                    </Button>
                </Group>
            </Card>
        </Center>

    );
}

export default Login