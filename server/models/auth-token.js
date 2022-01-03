import mongoose from 'mongoose';

const newSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        token: {
            type: String,
        },
        expires: {
            type: Date,
        },
        revoked: {
            type: Date,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);
const AuthToken = mongoose.model('AuthToken', newSchema);
export { AuthToken };
