import { userFetchContact } from '../store/actions/user'

// to get contact page of clicked user
export const handleGetContact = ({
    successUserLogin,
    dispatch,
    username,
    productID = '',
    history,
}) => {
    if (successUserLogin) {
        dispatch(
            userFetchContact({
                username,
                productID,
            })
        )
        history.push(`/contact/${username}`)
    }
}
