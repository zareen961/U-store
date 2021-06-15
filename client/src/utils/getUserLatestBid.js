export const getUserLatestBid = (bids, userID) => {
    // getting all the user bids only
    const userBids = bids.filter((bid) => bid.bidOwner._id === userID)

    // if no bids found for the user than return
    if (userBids.length === 0) {
        return { canPlaceBid: true }
    }

    // sorting all the user bids according to time to get the latest one
    const timeSortedBidsArray = userBids.sort((a, b) => {
        var dateA = new Date(a.createdAt)
        var dateB = new Date(b.createdAt)
        return dateB - dateA
    })

    // returning the latest bid of the user
    return {
        canPlaceBid: timeSortedBidsArray[0].status === 'PENDING' ? false : true,
        ...timeSortedBidsArray[0],
    }
}
