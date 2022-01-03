import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { checkPassword, encryptPassword } from '../../helper/bcrypt'
import { sendErrorResponse, sendSuccessResponse } from "../../helper/common"
import { sendConfirmationEmail } from '../../helper/nodemailer'
import { AuthToken } from '../../models/auth-token'
import { User } from "../../models/user"

const registerUser = async (req, res) => {
    try {
        const is_user = await User.findOne({ 'email': req.body.email })
        if (is_user)
            sendErrorResponse(res, "User already registered")
        else {
            const encrypt_pass = await encryptPassword(req.body.password)
            console.log('encrypt -- ', encrypt_pass)
            const userData = new User({
                name: req.body.name,
                password: encrypt_pass,
                email: req.body.email
            })
            userData.save((err, data) => {
                if (err)
                    sendErrorResponse(res, err)
                else {
                    sendConfirmationEmail(req.body.name, req.body.email, data._id)
                    sendSuccessResponse(res, {user: req.body.name, email: req.body.email, confirmationCode: data._id})
                }
            })
        }
    } catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

const userLogin = async (req, res) => {
    try {
        const is_user = await User.findOne({ 'email': req.body.email, email_verified: true })
        if (!is_user)
            sendErrorResponse(res, "User not found. Please check if email is verified")
        else {
            const is_passsword = await checkPassword(req.body.password)
            if (is_passsword === false)
                sendErrorResponse(res, "Passwords don't match")
            else {
                const token = jwt.sign({ user: is_user._id }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE,
                });
                const refresh_token = jwt.sign(
                    { user: is_user._id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: process.env.REFRESH_TOKEN_LIFE }
                );
                let token_data = await AuthToken.findOne({ user_email: is_user._id });
                if (token_data) {
                    token_data.token = refresh_token;
                    token_data.expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                    token_data.save();
                } else
                    await AuthToken.create({
                        token: refresh_token,
                        user: is_user._id,
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    });
                sendSuccessResponse(res, {
                    name: is_user.first_name,
                    email: is_user.email,
                    created_at: is_user.created_at,
                    token,
                    refresh_token,
                });
            }
        }
    } catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }

}

const confirmEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.params.confirmationCode) })
        console.log('uer -- ', user)
        if (!user)
            sendErrorResponse(res, "User not found")

        user.email_verified = true
        user.save((err, data) => {
            if (err)
                sendErrorResponse(res, err)
            else
                sendSuccessResponse(res, "Email confirmed. Redirecting to login page")
        })

    }
    catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

const getNewUserToken = async (req, res) => {
    try {
        let token_data = await AuthToken.findOne({
            token: req.headers.request_token,
        });
        let user_data = await UserModel.findById({ _id: token_data.user });
        const token = jwt.sign({ user: user_data._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });
        if (token) sendSuccessResponse(res, { token: token });
    } catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

export { registerUser, userLogin, getNewUserToken, confirmEmail }