import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { TagIcon, XIcon, ImageIcon } from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useDropzone } from 'react-dropzone'

import ButtonComp from '../../../utils/ButtonComp'
import FormLoader from '../../../utils/FormLoader'
import ModalComp from '../../../utils/ModalComp'
import ImageModal from '../ProductCard/ImageModal'
import { storage } from '../../../../utils/firebase'
import { useForm } from '../../../../hooks/useForm'
import { handleImageCompress } from '../../../../utils/imageCompressor'
import { productUpload } from '../../../../store/actions/product'
import { alertAdd } from '../../../../store/actions/ui'
import { validateProductInputs } from '../../../../validators/product'
import { DESCRIPTION_LEN_MAX } from '../../../../constants/validators'
import './ProductUploadForm.scss'

const initialInputVals = {
    name: '',
    image: { fileName: '', url: '' },
    description: '',
    price: '',
}

const ProductUploadForm = ({ isUploadFormOpen, setIsUploadFormOpen }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { loading, success } = useSelector((state) => state.productUpload)

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [file, setFile] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [isThrottled, setIsThrottled] = useState(false)

    const { inputVals, handleOnChange, customSetInputVals, handleReset } =
        useForm(initialInputVals)

    // function to handle file selection and then validate and send for compression
    const handleFileSelect = (acceptedFile) => {
        if (acceptedFile.length === 1) {
            // validating the file extension
            const allowedExt = ['jpeg', 'jpg', 'png']
            const fileExt = acceptedFile[0].name.split('.').pop().toLowerCase()
            if (!allowedExt.includes(fileExt)) {
                dispatch(
                    alertAdd(
                        'Invalid Image Chosen! Only JPEG, JPG & PNG allowed.',
                        'error'
                    )
                )
                return
            }

            handleImageCompress(acceptedFile[0], setFile, setImagePreview)
        } else {
            dispatch(
                alertAdd('Only one image can be uploaded! Click a good one.', 'error')
            )
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        onDrop: handleFileSelect,
    })

    // function to upload the image file to firebase storage
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
                dispatch(alertAdd(error.message, 'error'))
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

    // function to trigger when upload form is submitted which initiates the image upload process
    const handleUploadFormSubmit = async (e) => {
        e.preventDefault()

        setIsThrottled(true)

        // validating all the inputs except image
        const { isValid, message } = validateProductInputs({
            ...inputVals,
            price: Number(inputVals.price),
        })
        if (!isValid) {
            dispatch(alertAdd(message, 'error'))
            setIsThrottled(false)
            return
        }

        if (file) {
            handleImageUpload()
        } else {
            dispatch(alertAdd('A product image would be better!', 'error'))
        }
    }

    // to dispatch the actual product upload action after image is uploaded successfully
    useEffect(() => {
        const { isValid } = validateProductInputs({
            ...inputVals,
            price: Number(inputVals.price),
        })

        if (isValid && inputVals.image.fileName && inputVals.image.url) {
            dispatch(productUpload({ ...inputVals, price: Number(inputVals.price) }))
        }
    }, [inputVals, inputVals.image.fileName, inputVals.image.url, dispatch])

    // function to handle all the cleanup when the upload form closes
    const handleOnClose = useCallback(() => {
        handleReset()
        setIsThrottled(false)
        setUploadProgress(0)
        setFile('')
        setImagePreview('')
        setIsUploadFormOpen(false)
    }, [handleReset, setIsUploadFormOpen])

    // to close the product form modal after the product is uploaded successfully
    useEffect(() => {
        if (success) {
            handleOnClose()
        }
    }, [success, handleOnClose])

    return (
        <>
            <div className="productUploadForm">
                <Avatar
                    src={
                        user && user.userInfo
                            ? `avatars/avatar${user.userInfo.avatar}.png`
                            : 'avatars/avatar0.png'
                    }
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
                handleOnClose={handleOnClose}
                maxWidth={'xs'}
                isLoading={loading || uploadProgress > 0}
            >
                <form
                    className={
                        loading || uploadProgress > 0
                            ? 'productUploadForm__modal cover'
                            : 'productUploadForm__modal'
                    }
                    onSubmit={handleUploadFormSubmit}
                >
                    {/* Header */}
                    <div className="productUploadForm__modalHeader">
                        <Avatar
                            src={
                                user && user.userInfo
                                    ? `avatars/avatar${user.userInfo.avatar}.png`
                                    : 'avatars/avatar0.png'
                            }
                            className="productUploadForm__modalAvatar"
                        />
                        <input
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
                            </>
                        ) : (
                            <div {...getRootProps()} className="imageInputWrapper">
                                <input {...getInputProps()} accept="image/*" />
                                {isDragActive ? (
                                    <p>Drop your image file here.</p>
                                ) : (
                                    <label htmlFor="productImageInput">
                                        <ImageIcon size={20} />
                                        <span>Select/Drop Image</span>
                                    </label>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="productUploadForm__modalDescription">
                        <textarea
                            placeholder="Tell something about your product!"
                            name="description"
                            value={inputVals.description}
                            onChange={handleOnChange}
                        ></textarea>
                        <span className="descriptionCount">
                            {inputVals.description.length}/{DESCRIPTION_LEN_MAX}
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="productUploadForm__modalFooter">
                        <TagIcon size={20} />
                        <input
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
                                loading || uploadProgress > 0 || isThrottled
                                    ? 'disabled insideInputButton'
                                    : 'insideInputButton'
                            }
                            type={'submit'}
                            text={'Post'}
                        />
                    </div>
                </form>

                <FormLoader
                    loading={loading || uploadProgress > 0}
                    modifyClass={'innerLoader'}
                    loaderSizeClass={'medium'}
                />
            </ModalComp>

            {/* Image Modal */}
            <ImageModal
                isOpen={isImageOpen}
                setIsOpen={setIsImageOpen}
                productImage={imagePreview}
                productName={inputVals.name}
            />
        </>
    )
}

export default ProductUploadForm
