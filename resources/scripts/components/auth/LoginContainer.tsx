import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import login from '@/api/auth/login';
import { useStoreState } from 'easy-peasy';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { Button } from '@/components/elements/button/index';
import Reaptcha from 'reaptcha';
import Turnstile from '@/components/elements/Turnstile';
import useFlash from '@/plugins/useFlash';
import { KeyIcon, UserIcon, EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import FlashMessageRender from '@/components/FlashMessageRender';
import { ApplicationStore } from '@/state';
import Footer from '@/reviactyl/ui/Footer';

interface Values {
    username: string;
    password: string;
}

const Container = styled.div`
    ${tw`min-h-screen flex items-center justify-center relative overflow-hidden`}
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        animation: pulse 15s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); }
    }
`;

const LoginCard = styled.div`
    ${tw`relative z-10 w-full max-w-md p-8 mx-4`}
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 80px rgba(99, 102, 241, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: slideUp 0.6s ease-out;
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const LogoSection = styled.div`
    ${tw`text-center mb-8`}
    
    img {
        ${tw`h-16 mx-auto mb-4`}
        filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;

const Title = styled.h1`
    ${tw`text-3xl font-bold text-center mb-2`}
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Subtitle = styled.p`
    ${tw`text-center text-gray-400 text-sm mb-8`}
`;

const InputGroup = styled.div`
    ${tw`mb-4 relative`}
`;

const Label = styled.label`
    ${tw`block text-sm font-medium text-gray-300 mb-2`}
`;

const InputWrapper = styled.div`
    ${tw`relative`}
    
    &:focus-within .input-icon {
        color: rgb(99, 102, 241);
    }
`;

const StyledInput = styled.input`
    ${tw`w-full px-4 py-3 pl-12 rounded-xl text-gray-100 transition-all duration-300`}
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(99, 102, 241, 0.2);
    
    &:focus {
        outline: none;
        border-color: rgb(99, 102, 241);
        background: rgba(30, 41, 59, 0.8);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    &::placeholder {
        color: rgba(156, 163, 175, 0.5);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const IconWrapper = styled.div`
    ${tw`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300`}
    
    svg {
        ${tw`w-5 h-5`}
    }
`;

const ToggleButton = styled.button`
    ${tw`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200`}
    
    svg {
        ${tw`w-5 h-5`}
    }
`;

const StyledButton = styled.button<{ isLoading?: boolean }>`
    ${tw`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden`}
    background: linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%);
    border: none;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
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
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    &:hover:not(:disabled)::before {
        left: 100%;
    }
`;

const ForgotLink = styled(Link)`
    ${tw`block text-center text-sm mt-4 transition-colors duration-200`}
    color: rgb(99, 102, 241);
    text-decoration: none;
    
    &:hover {
        color: rgb(139, 92, 246);
    }
`;

const ErrorText = styled.div`
    ${tw`text-red-400 text-sm mt-1`}
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
        <>
            <Container>
                <LoginCard>
                    <LogoSection>
                        <img src={logo} alt={name} />
                        <Title>Welcome Back</Title>
                        <Subtitle>Sign in to access your dashboard</Subtitle>
                    </LogoSection>

                    <FlashMessageRender css={tw`mb-4`} />

                    <Formik
                        onSubmit={onSubmit}
                        initialValues={{ username: '', password: '' }}
                        validationSchema={object().shape({
                            username: string().required(t('username-required')),
                            password: string().required(t('password-required')),
                        })}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, submitForm }) => (
                            <form onSubmit={handleSubmit}>
                                <InputGroup>
                                    <Label htmlFor="username">Username or Email</Label>
                                    <InputWrapper>
                                        <IconWrapper className="input-icon">
                                            <UserIcon />
                                        </IconWrapper>
                                        <StyledInput
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Enter your username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                    </InputWrapper>
                                    {errors.username && touched.username && (
                                        <ErrorText>{errors.username}</ErrorText>
                                    )}
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <InputWrapper>
                                        <IconWrapper className="input-icon">
                                            <LockClosedIcon />
                                        </IconWrapper>
                                        <StyledInput
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                        />
                                        <ToggleButton
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </ToggleButton>
                                    </InputWrapper>
                                    {errors.password && touched.password && (
                                        <ErrorText>{errors.password}</ErrorText>
                                    )}
                                </InputGroup>

                                {provider === 'turnstile' && (
                                    <div css={tw`mb-4 flex justify-center`}>
                                        <Turnstile
                                            siteKey={turnstile.siteKey}
                                            onVerify={(response) => setToken(response)}
                                            onExpire={() => setToken('')}
                                        />
                                    </div>
                                )}

                                <StyledButton type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                                </StyledButton>

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

                                <ForgotLink to="/auth/password">
                                    Forgot your password?
                                </ForgotLink>
                            </form>
                        )}
                    </Formik>
                </LoginCard>
            </Container>
            <Footer />
        </>
    );
};

export default LoginContainer;
