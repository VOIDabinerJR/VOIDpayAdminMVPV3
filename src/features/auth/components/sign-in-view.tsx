'use client';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: React.ReactNode[] = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 100; // percent
        const y = Math.random() * 100; // percent
        newStars.push(
          <div
            key={i}
            className='star'
            style={{
              top: `${y}%`,
              left: `${x}%`
            }}
          />
        );
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className='relative flex h-screen w-screen items-center justify-center bg-black'>
      {/* Fundo escuro com opacidade */}
      {/* Estrelas animadas */}
      {stars}
      <div className='absolute inset-0 bg-black opacity-80' />

      {/* Conteúdo principal centralizado */}
      <div className='relative z-20 flex w-full max-w-md flex-col items-center justify-center space-y-6 p-6'>
        {/* Logo acima do formulário */}
        <div className='mb-4 flex items-center space-x-3'>
          <div className='mb-8 flex flex-col items-center space-y-4'>
            <div className='rounded-xl bg-black bg-gradient-to-br shadow-lg'>
              <Image
                src='/img/Logo.svg'
                alt='Admin Portal Logo'
                width={60}
                height={60}
                className='rounded-lg'
                priority
              />
            </div>
            <div className='text-center'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                Admin Portal
              </h1>
              <p className='mt-1 text-sm text-white/70'>
                Acesso seguro à área administrativa
              </p>
            </div>
          </div>
          {/* <span className="text-white text-xl font-semibold">
            VoidPay{' '}
           
          </span> */}
        </div>

        {/* Formulário de login */}
        <ClerkSignInForm
          initialValues={{
            emailAddress: 'john@example.com'
          }}
        />

        {/* Termos */}
        <p className='px-8 text-center text-sm text-gray-400'>
          Ao clicar em continuar, você concorda com nossos{' '}
          <Link
            href='https://www.voidpay.online/terms'
            className='underline underline-offset-4 hover:text-yellow-400'
          >
            Termos de Serviço
          </Link>{' '}
          e nossa{' '}
          <Link
            href='https://www.voidpay.online/privacy'
            className='underline underline-offset-4 hover:text-yellow-400'
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
