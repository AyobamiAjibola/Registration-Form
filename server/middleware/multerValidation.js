const fs = require('fs');

module.exports = (req, res, next) => {
    try {
        if (typeof (req.file) === 'undefined') {
            return res.status(400).json({
                errors: 'Please upload an image'
            })
        }

        // let image = req.file.path

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