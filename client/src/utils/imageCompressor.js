import Resizer from 'react-image-file-resizer'

export const handleImageCompress = (imgFile, setFile, setImagePreview) => {
    if (imgFile) {
        // deciding the compression quality
        let QUALITY = 100
        // Greater than 2mb
        if (imgFile.size > 2097152) {
            QUALITY = 50
        }
        // Greater than 1mb
        else if (imgFile.size > 1048576) {
            QUALITY = 70
        }
        // Greater than 0.5mb
        else if (imgFile.size > 524288) {
            QUALITY = 90
        }
        // less than 0.5mb
        else {
            QUALITY = 100
        }

        try {
            Resizer.imageFileResizer(
                imgFile,
                800, // maxWidth
                800, // maxHeight
                'WEBP', // compressFormat
                QUALITY, // quality
                0, // rotation
                (file) => {
                    setImagePreview(URL.createObjectURL(file))
                    setFile(file)
                },
                'file', // outputType
                500, // minWidth
                500 // minHeight
            )
        } catch (err) {
            console.log(err)
        }
    }
}
