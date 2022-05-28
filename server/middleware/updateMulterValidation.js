const fs = require('fs');

module.exports = (req, res, next) => {
    try {

        if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                errors: "Image not supported"
            })
        }

        if (req.file.size > 60 * 1024) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                errors: "Image is Too large. "
            })
        }
    } catch (error) {
        console.error(error.message)
    }

    next()
}