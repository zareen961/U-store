import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import { TagIcon, XIcon, ImageIcon } from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import ButtonComp from '../../../utils/ButtonComp'
import ModalComp from '../../../utils/ModalComp'
import { storage } from '../../../../utils/firebase'
import { useForm } from '../../../../utils/hooks/useForm'
import { handleImageCompress } from '../../../../utils/imageCompressor'
import { productUpload } from '../../../../store/actions/product'
import { alertAdd } from '../../../../store/actions/alert'
import { validateProductInputs } from '../../../../validators/product'
import './ProductUploadForm.css'

const initialInputVals = {
    name: '',
    image: { fileName: '', url: '' },
    description: '',
    price: '',
}

const ProductUploadForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, success } = useSelector((state) => state.productUpload)

    const [isUploadFormOpen, setIsUploadFormOpen] = useState(false)
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [file, setFile] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    const { inputVals, handleOnChange, customSetInputVals, handleReset } =
        useForm(initialInputVals)

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            // validating the file extension
            const allowedExt = ['jpeg', 'jpg', 'png']
            const fileExt = e.target.files[0].name.split('.').pop().toLowerCase()
            if (!allowedExt.includes(fileExt)) {
                dispatch(
                    alertAdd(
                        'Invalid Image Chosen! Only JPEG, JPG & PNG allowed.',
                        'error'
                    )
                )
                return
            }

            handleImageCompress(e.target.files[0], setFile, setImagePreview)
        }
    }

    const handleOnClose = useCallback(() => {
        handleReset()
        setUploadProgress(0)
        setFile('')
        setImagePreview('')
        setIsUploadFormOpen(false)
    }, [handleReset])

    const handleImageUpload = () => {
        let fileName = uuid() + '.' + file?.name.split('.').pop()

        const uploadTask = storage.ref(`images/${fileName}`).put(file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress bar function
                const progressBarVal = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setUploadProgress(progressBarVal)
            },
            (error) => {
                //error function
                console.log(error)
                alert(error.message)
            },
            () => {
                //uploading image to firebase storage
                storage
                    .ref('images')
                    .child(fileName)
                    .getDownloadURL()
                    .then((url) => {
                        customSetInputVals('image', { fileName, url })
                    })
            }
        )
    }

    const handleUploadFormSubmit = async (e) => {
        e.preventDefault()

        // validating all the inputs except image
        const { isValid, message } = validateProductInputs(inputVals)
        if (!isValid) {
            dispatch(alertAdd(message, 'error'))
            return
        }

        if (file) {
            handleImageUpload()
        } else {
            dispatch(alertAdd('A product image would be better!', 'error'))
        }
    }

    useEffect(() => {
        const { isValid } = validateProductInputs(inputVals)

        if (isValid && inputVals.image.fileName && inputVals.image.url) {
            dispatch(productUpload(inputVals))
        }
    }, [inputVals, dispatch])

    useEffect(() => {
        if (success) {
            handleOnClose()
        }
    }, [success, handleOnClose])

    return (
        <>
            <div className="productUploadForm">
                <Avatar
                    src="avatars/avatar10.png"
                    className="productUploadForm__avatar"
                    onClick={() => history.push('/account')}
                />
                <div
                    className="productUploadForm__inputWrapper"
                    onClick={() => setIsUploadFormOpen(true)}
                >
                    <TagIcon size={20} />
                    <input type="text" placeholder="Want to sell something?" disabled />
                    <ButtonComp
                        typeClass={'primary'}
                        handleOnClick={() => {}}
                        modifyClass={'insideInputButton'}
                        text={'Sell It!'}
                    />
                </div>
            </div>

            <ModalComp
                isOpen={isUploadFormOpen}
                setIsOpen={setIsUploadFormOpen}
                maxWidth={'xs'}
            >
                <form
                    className="productUploadForm__modal"
                    onSubmit={handleUploadFormSubmit}
                >
                    {/* Header */}
                    <div className="productUploadForm__modalHeader">
                        <Avatar
                            src="avatars/avatar14.png"
                            className="productUploadForm__modalAvatar"
                        />
                        <input
                            required
                            type="text"
                            placeholder="What do you want to sell?"
                            name="name"
                            value={inputVals.name}
                            onChange={handleOnChange}
                        />

                        <div className="close">
                            <ButtonComp
                                typeClass={'secondary'}
                                modifyClass={'iconButton'}
                                handleOnClick={handleOnClose}
                            >
                                <XIcon size={18} />
                            </ButtonComp>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="productUploadForm__modalImage">
                        {imagePreview ? (
                            <>
                                <IconButton
                                    className="removeImageButton"
                                    onClick={() => {
                                        setFile('')
                                        setImagePreview('')
                                    }}
                                >
                                    <XIcon size={18} />
                                </IconButton>

                                <img
                                    src={imagePreview}
                                    alt="uploaded-product"
                                    onClick={() => setIsImageOpen(true)}
                                />
                                <div className="progressIndicator">
                                    <CircularProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        size={60}
                                        thickness={5}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="imageInputWrapper">
                                <label htmlFor="productImageInput">
                                    <ImageIcon size={20} />
                                    <span>Choose Image</span>
                                    <input
                                        type="file"
                                        id="productImageInput"
                                        accept=".png, .jpeg, .jpg"
                                        value={file}
                                        onChange={handleFileSelect}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <textarea
                        required
                        className="productUploadForm__modalDescription"
                        placeholder="Tell something about your product!"
                        name="description"
                        value={inputVals.description}
                        onChange={handleOnChange}
                    ></textarea>

                    {/* Footer */}
                    <div className="productUploadForm__modalFooter">
                        <TagIcon size={20} />
                        <input
                            required
                            type="number"
                            placeholder="Set a price."
                            name="price"
                            value={inputVals.price}
                            onChange={handleOnChange}
                        />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => {}}
                            modifyClass={
                                loading || uploadProgress > 0
                                    ? 'disabled insideInputButton'
                                    : 'insideInputButton'
                            }
                            type={'submit'}
                            text={'Post'}
                        />
                    </div>
                </form>
            </ModalComp>

            {/* Image Modal */}
            <ModalComp isOpen={isImageOpen} setIsOpen={setIsImageOpen} maxWidth={'lg'}>
                <div className="productCard__imageModal">
                    <img src={imagePreview} alt="uploaded-product" />
                    <div className="closeButtonWrapper">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => setIsImageOpen(false)}
                        >
                            <XIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>
            </ModalComp>
        </>
    )
}

export default ProductUploadForm
