import { sendErrorResponse, sendSuccessResponse } from "../../helper/common"
import { Contact } from "../../models/contact"

const showAllContacts = async (req, res) => {
    try {
        Contact.find({ user: req.decoded.user }, { email: 1, name: 1, phone: 1, created_at: 1 }, (err, data) => {
            if (err)
                sendErrorResponse(res, err)
            else
                sendSuccessResponse(res, data)
        })
    }
    catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

const showContact = async (req, res) => {
    try {
        Contact.findOne(req.body.contactId).populate('user').exec((err, data) => {
            if (err)
                sendErrorResponse(res, err)
            else
                sendSuccessResponse(res, data)
        })
    }
    catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

const addContact = async (req, res) => {
    try {
        const is_contact = await Contact.findOne({ user: req.decoded.user, phone: req.body.phone })
        if (is_contact) {
            sendErrorResponse(res, "Contact already stored")
        }
        else {
            const contact = new Contact({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                user: req.decoded.user
            })
            contact.save((err, data) => {
                if (err)
                    sendErrorResponse(res, "Contact not saved")
                else
                    sendSuccessResponse(res, "Contact added")
            })
        }
    }
    catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

const deleteContact = async (req, res) => {
    try {
        Contact.findByIdAndRemove(req.body.contactId, (err, data) => {
            if (err)
                sendErrorResponse(res, err)
            else
                sendSuccessResponse(res, "Contact deleted successfully")
        })
    }
    catch (error) {
        console.log('error -- ', error)
        sendErrorResponse(res, error)
    }
}

export { showAllContacts, showContact, addContact, deleteContact }