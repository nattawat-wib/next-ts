import mongoose from 'mongoose';

export default mongoose
    .connect("mongodb://localhost:27017/next-ts")
    .then(() => {
        console.log('DB connect successfully');
    })
    .catch(err => {
        console.log(`DB connect fail: ${err}`);
    })