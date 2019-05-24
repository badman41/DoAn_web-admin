export const formatAddress = addressObj => addressObj
    && `${addressObj.StreetNumber ? addressObj.StreetNumber : ''},
    ${addressObj.Street ? addressObj.Street : ''},
    ${addressObj.District ? addressObj.District : ''},
    ${addressObj.City ? addressObj.City : ''},
    ${addressObj.Country ? addressObj.Country : ''}`
