import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Component {...pageProps} />
        </LocalizationProvider>
    )
}

export default MyApp
