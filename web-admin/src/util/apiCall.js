import axios from 'axios'

export const apiCall = async ({
  endPoint,
  method,
  payload,
  headers,
  params,
}) => {
  try {
    const result = await axios({
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    })
    return {
      response: result,
      error: null,
    }
  } catch (e) {
    return {
      response: null,
      error: e.request,
    }
  }
}
