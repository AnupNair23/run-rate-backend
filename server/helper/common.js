function sendSuccessResponse(res, data, message = 'Success') {
    res.status(200).json({
        data: data,
        status: true,
        message: message,
    });
}

function sendErrorResponse(res, errors, message = 'Something Went Wrong', status = 406) {
    res.status(status).json({
        data: errors,
        status: false,
        message: message,
    });
}

function sendEmptyResponse(res, data) {
    res.status(204).json({
        data: data,
        status: false,
        message: 'No Data',
    });
}


export { sendErrorResponse, sendSuccessResponse, sendEmptyResponse };
