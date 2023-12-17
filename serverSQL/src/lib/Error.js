function getErrorMessage(error) {
    if (error instanceof Error) return error.message
    return String(error)
}

const reportError = ({ message }) => {
    // send the error to our logging service...
}

module.exports = { getErrorMessage, reportError }