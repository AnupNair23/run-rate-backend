import bcrypt from "bcrypt"

const encryptPassword = async (password) => {
    console.log('viide -- ', password)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
    // return bcrypt.hash(password, 20, (err, hash) => {
    //     console.log('here -- ', hash)
    //     return hash
    // });
}

const checkPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const result = bcrypt.compare(password, hash)
    return result
}

export { encryptPassword, checkPassword }