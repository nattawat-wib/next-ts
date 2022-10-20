import { useState, ChangeEvent } from 'react';
import { Button, Stack, Box, TextField, Typography, Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';

interface ModalProp {
    isSignUpModelOpen?: boolean,
    setIsSignUpModelOpen?: any
    isRegisterModelOpen?: boolean,
    setIsRegisterModelOpen?: any
}

export default function Login<NextPage>() {
    const [isSignUpModelOpen, setIsSignUpModelOpen] = useState<boolean>(false);
    const [isRegisterModelOpen, setIsRegisterModelOpen] = useState<boolean>(false);

    return (
        <>
            <LoginModal isSignUpModelOpen={isSignUpModelOpen} setIsSignUpModelOpen={setIsSignUpModelOpen} setIsRegisterModelOpen={setIsRegisterModelOpen} />
            <RegisterModal isRegisterModelOpen={isRegisterModelOpen} setIsRegisterModelOpen={setIsRegisterModelOpen} />

            <Box className='flex justify-start items-center'>
                <Box className='w-1/2 hidden md:flex h-[calc(100vh-65px)] justify-center items-center' style={{ background: 'url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png) center no-repeat' }}>
                    <img src='./image/twitter-logo.png' className='max-w-full' />
                </Box>
                <Box className='px-4 h-[calc(100vh-65px)] flex justify-center items-center'>
                    <form>
                        <Typography variant='h2' className='font-bold mb-3'> Happening Now </Typography>
                        <Typography variant='h4' className='font-medium mb-3'> Join Twitter Today </Typography>
                        <Button onClick={() => setIsSignUpModelOpen(true)} variant='outlined' className='my-2 rounded-full' fullWidth> Sign Up </Button>
                        <Button onClick={() => setIsRegisterModelOpen(true)} variant='contained' className='my-2 rounded-full' fullWidth> Sign In </Button>
                    </form>
                </Box>
            </Box>
            <Stack className='py-3' direction='row' justifyContent='center' flexWrap='wrap'>
                {
                    ['เกี่ยวกับ', 'ศูนย์ความช่วยเหลือ', 'ข้อตกลงการให้บริการ', 'นโยบายความเป็นส่วนตัว', 'นโยบายคุกกี้', 'การเข้าถึง', 'ข้อมูลโฆษณา', 'บล็อก', 'สถานะ', 'อาชีพ', 'ทรัพยากรด้านแบรนด์', 'โฆษณา', 'การตลาด', 'ทวิตเตอร์สำหรับธุรกิจ', 'นักพัฒนา', 'ไดเรกทอรี', 'การตั้งค่า', '© 2022 Twitter, Inc.']
                        .map(menu => (
                            <Typography key={menu} className='text-sm mx-1'> {menu} </Typography>
                        ))
                }
            </Stack>
        </>
    )
}

function LoginModal({ isSignUpModelOpen, setIsSignUpModelOpen, setIsRegisterModelOpen }: ModalProp) {
    return (
        <Dialog
            open={!!isSignUpModelOpen}
            onClose={() => setIsSignUpModelOpen(false)}
            maxWidth='xs'
            fullWidth
        >
            <Box className='flex flex-row items-center justify-between p-3'>
                <Typography variant='h6'> Login to twitter </Typography>
                <IconButton onClick={() => setIsSignUpModelOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <TextField variant='outlined' name='email' label='email' className='mb-6' size='small' fullWidth />
                <br />
                <TextField variant='outlined' type='password' name='password' label='password' size='small' fullWidth />
            </DialogContent>
            <Box className='p-4'>
                <Button className='rounded-full mb-2' variant='contained' fullWidth> Login </Button>
                <Box className='flex justify-between items-center'>
                    <Button
                        onClick={() => {
                            setIsSignUpModelOpen(false)
                            setIsRegisterModelOpen(true)
                        }}
                        size='small'
                    > register </Button>
                    <Button size='small'> forget password ? </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

interface RegisterProp {
    firstName?: string,
    lastName?: string,
    email?: string,
    birthDate?: string,
    password?: string,
    passwordConfirm?: string,
}

function RegisterModal({ isRegisterModelOpen, setIsRegisterModelOpen }: ModalProp) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterProp>({});
    const [birthDateValue, setBirthDateValue] = useState<Date | null>(null);

    const onSubmit: SubmitHandler<RegisterProp> = data => {
        const form = {
            ...data,
            birthDate: birthDateValue ? new Date(birthDateValue as any).toLocaleDateString('en-GB') : '',
        }

        console.log(form);

        // axios.post('test', form)
        //     .then(resp => {
        //         console.log(resp);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    const handleBirthDateChange = (newValue: Dayjs | null) => {
        setBirthDateValue(new Date(newValue as any));
    }

    return (
        <Dialog
            open={!!isRegisterModelOpen}
            onClose={() => setIsRegisterModelOpen(false)}
            maxWidth='xs'
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className='flex flex-row items-center justify-between p-3'>
                    <Typography variant='h6'> Register to twitter </Typography>
                    <IconButton onClick={() => setIsRegisterModelOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent>

                    <TextField
                        {...register('firstName', { required: true })}
                        error={!!errors.firstName}
                        helperText={!!errors.firstName && 'first name is required !'}
                        variant='outlined'
                        label='first name'
                        className='mb-4'
                        size='small'
                        fullWidth
                    />
                    <br />
                    <TextField
                        {...register('lastName', { required: true })}
                        error={!!errors.lastName}
                        helperText={!!errors.lastName && 'last name is required !'}
                        variant='outlined'
                        label='last name'
                        className='mb-4'
                        size='small'
                        fullWidth
                    />
                    <br />
                    <TextField
                        {...register('email', { required: true })}
                        error={!!errors.email}
                        helperText={!!errors.email && 'email is required !'}
                        variant='outlined'
                        label='email'
                        className='mb-4'
                        size='small'
                        fullWidth
                    />
                    <br />
                    <DatePicker
                        // onChange={handleBirthDateChange}
                        onChange={(e, f) => { console.log(e, f) }}              
                        // {...register('birthDate')}
                        value={birthDateValue}
                        label='birth date'
                        className='mb-4'
                        inputFormat='DD/MM/YYYY'
                        renderInput={params => (
                            <TextField
                                size='small'
                                fullWidth
                                {...params}
                            />
                        )}
                    />
                    <br />
                    <TextField
                        {...register('password', {
                            required: { value: true, message: 'password is required!' },
                            minLength: { value: 6, message: 'password is required at least 6 character' },
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        type='password'
                        variant='outlined'
                        label='password'
                        className='mb-4'
                        size='small'
                        fullWidth
                    />
                    <br />
                    <TextField
                        {...register('passwordConfirm', {
                            required: { value: true, message: 'password confirm is required!' },
                            minLength: { value: 6, message: 'password confirm is required at least 6 character' },
                            validate: form => form !== watch('password') ? 'password and password confirm should be match' : true
                        })}
                        error={!!errors.passwordConfirm}
                        helperText={errors?.passwordConfirm?.message}
                        type='password'
                        variant='outlined'
                        label='password confirm'
                        className='mb-4'
                        size='small'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className='p-4'>
                    <Button type='submit' className='rounded-full' variant='contained' fullWidth> Login </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}