import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import login from '@/api/auth/login';
import { useStoreState } from 'easy-peasy';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import Reaptcha from 'reaptcha';
import Turnstile from '@/components/elements/Turnstile';
import useFlash from '@/plugins/useFlash';
import { LockClosedIcon, UserIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import FlashMessageRender from '@/components/FlashMessageRender';
import { ApplicationStore } from '@/state';

interface Values {
    username: string;
    password: string;
}

// Animated Background
const PageContainer = styled.div`
    ${tw`min-h-screen w-full flex items-center justify-center relative overflow-hidden`}
    background: #000000;
    
    &::before {
        content: '';
        position: absolute;
        width: 150%;
        height: 150%;
        background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.2), transparent 50%);
        animation: gradientShift 20s ease infinite;
    }
    
    @keyframes gradientShift {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(-5%, 5%) rotate(120deg); }
        66% { transform: translate(5%, -5%) rotate(240deg); }
    }
`;

// Floating particles
const Particle = styled.div<{ delay: number; duration: number; left: string }>`
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(99, 102, 241, 0.6);
    border-radius: 50%;
    left: ${props => props.left};
    bottom: -10px;
    animation: float ${props => props.duration}s ease-in infinite;
    animation-delay: ${props => props.delay}s;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100}px);
            opacity: 0;
        }
    }
`;

// Main login card
const LoginBox = styled.div`
    ${tw`relative z-10 w-full max-w-md mx-4`}
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(40px) saturate(180%);
    border-radius: 32px;
    border: 1px solid rgba(99, 102, 241, 0.3);
    padding: 3rem 2.5rem;
    box-shadow: 
        0 0 80px rgba(99, 102, 241, 0.15),
        0 20px 60px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

// Logo container
const LogoContainer = styled.div`
    ${tw`flex flex-col items-center mb-10`}
    
    img {
        height: 64px;
        margin-bottom: 1.5rem;
        filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
        animation: logoFloat 3s ease-in-out infinite;
    }
    
    @keyframes logoFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
`;

// Title with gradient
const Title = styled.h1`
    ${tw`text-4xl font-bold text-center mb-2`}
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
    ${tw`text-center text-gray-400 text-sm mb-8`}
    font-weight: 300;
`;

// Form elements
const FormGroup = styled.div`
    ${tw`mb-5`}
`;

const Label = styled.label`
    ${tw`block text-sm font-medium text-gray-300 mb-2 ml-1`}
`;

const InputContainer = styled.div`
    ${tw`relative group`}
`;

const Input = styled.input`
    ${tw`w-full px-5 py-3.5 rounded-2xl text-white transition-all duration-300`}
    background: rgba(30, 41, 59, 0.4);
    border: 1.5px solid rgba(99, 102, 241, 0.2);
    padding-left: 3.5rem;
    font-size: 15px;
    
    &::placeholder {
        color: rgba(156, 163, 175, 0.4);
    }
    
    &:focus {
        outline: none;
        background: rgba(30, 41, 59, 0.6);
        border-color: rgb(99, 102, 241);
        box-shadow: 
            0 0 0 4px rgba(99, 102, 241, 0.1),
            0 10px 30px rgba(99, 102, 241, 0.2);
        transform: translateY(-1px);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const InputIcon = styled.div`
    ${tw`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none`}
    
    svg {
        width: 20px;
        height: 20px;
    }
    
    ${Input}:focus ~ & {
        color: rgb(99, 102, 241);
        transform: translateY(-50%) scale(1.1);
    }
`;

const PasswordToggle = styled.button`
    ${tw`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 p-2 rounded-lg`}
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
    }
    
    svg {
        width: 20px;
        height: 20px;
    }
`;

const SubmitButton = styled.button`
    ${tw`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 relative overflow-hidden group mt-8`}
    background: linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%);
    border: none;
    font-size: 16px;
    box-shadow: 
        0 10px 40px rgba(99, 102, 241, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 
            0 15px 50px rgba(99, 102, 241, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.6s;
    }
    
    &:hover:not(:disabled)::before {
        left: 100%;
    }
`;

const ButtonContent = styled.span`
    ${tw`flex items-center justify-center gap-2`}
`;

const ForgotPassword = styled(Link)`
    ${tw`block text-center text-sm mt-6 transition-all duration-200`}
    color: rgb(99, 102, 241);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
        color: rgb(139, 92, 246);
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.div`
    ${tw`text-red-400 text-sm mt-2 ml-1`}
    animation: shake 0.3s;
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

const LoadingSpinner = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

const Footer = styled.div`
    ${tw`absolute bottom-8 left-0 right-0 text-center text-gray-500 text-xs`}
`;

const LoginContainer = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('auth');
    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const { provider, recaptcha, turnstile } = useStoreState((state) => state.settings.data!.captcha);
    const logo = useStoreState((state: ApplicationStore) => state.settings.data!.logo);
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);

    useEffect(() => {
        clearFlashes();
    }, []);

    const onSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();

        if (provider === 'recaptcha' && !token) {
            ref.current!.execute().catch((error) => {
                console.error(error);
                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
            return;
        }

        if (provider === 'turnstile' && !token) {
            setSubmitting(false);
            return;
        }

        login({ ...values, captchaToken: token, captchaProvider: provider })
            .then((response) => {
                if (response.complete) {
                    // @ts-expect-error this is valid
                    window.location = response.intended || '/';
                    return;
                }

                history.replace('/auth/login/checkpoint', { token: response.confirmationToken });
            })
            .catch((error) => {
                console.error(error);
                setToken('');
                if (ref.current) ref.current.reset();
                setSubmitting(false);
                clearAndAddHttpError({ error });
            });
    };

    return (
        <PageContainer>
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <Particle
                    key={i}
                    delay={i * 0.8}
                    duration={8 + Math.random() * 4}
                    left={`${Math.random() * 100}%`}
                />
            ))}

            <LoginBox>
                <LogoContainer>
                    <img src={logo} alt={name} />
                    <Title>Welcome Back</Title>
                    <Subtitle>Sign in to access your dashboard</Subtitle>
                </LogoContainer>

                <FlashMessageRender css={tw`mb-6`} />

                <Formik
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    validationSchema={object().shape({
                        username: string().required('Username is required'),
                        password: string().required('Password is required'),
                    })}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, submitForm }) => (
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="username">Username or Email</Label>
                                <InputContainer>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        autoComplete="username"
                                    />
                                    <InputIcon>
                                        <UserIcon />
                                    </InputIcon>
                                </InputContainer>
                                {errors.username && touched.username && (
                                    <ErrorMessage>{errors.username}</ErrorMessage>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <InputContainer>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        autoComplete="current-password"
                                    />
                                    <InputIcon>
                                        <LockClosedIcon />
                                    </InputIcon>
                                    <PasswordToggle
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </PasswordToggle>
                                </InputContainer>
                                {errors.password && touched.password && (
                                    <ErrorMessage>{errors.password}</ErrorMessage>
                                )}
                            </FormGroup>

                            {provider === 'turnstile' && (
                                <div css={tw`mb-6 flex justify-center`}>
                                    <Turnstile
                                        siteKey={turnstile.siteKey}
                                        onVerify={(response) => setToken(response)}
                                        onExpire={() => setToken('')}
                                    />
                                </div>
                            )}

                            <SubmitButton type="submit" disabled={isSubmitting}>
                                <ButtonContent>
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSpinner />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRightIcon css={tw`w-5 h-5`} />
                                        </>
                                    )}
                                </ButtonContent>
                            </SubmitButton>

                            {provider === 'recaptcha' && (
                                <Reaptcha
                                    ref={ref}
                                    size={'invisible'}
                                    sitekey={recaptcha.siteKey || '_invalid_key'}
                                    onVerify={(response) => {
                                        setToken(response);
                                        submitForm();
                                    }}
                                    onExpire={() => {
                                        setSubmitting(false);
                                        setToken('');
                                    }}
                                />
                            )}

                            <ForgotPassword to="/auth/password">
                                Forgot your password?
                            </ForgotPassword>
                        </form>
                    )}
                </Formik>
            </LoginBox>

            <Footer>
                © {new Date().getFullYear()} {name}. All rights reserved.
            </Footer>
        </PageContainer>
    );
};

export default LoginContainer;
