// require("dotenv").config();

import axios from "axios"
import FormData from "form-data"
const { Readable } = require("stream")
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MDBjZDBlMi00NzA2LTQwYzMtYThkNy0wNDYyYTUwMjhiNTAiLCJlbWFpbCI6ImF0aGVuYW9pa29zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4NGIyYmFiMTk4M2Y4NjVjNjQ0ZSIsInNjb3BlZEtleVNlY3JldCI6IjM4MjBmN2E1NWJkMTgxOGM4M2EzMDVmNzJiZDZhMjQ4ZjM3NTZhYWQyZTI5MDJiMGMxM2RhZDNhOGNkOTRjODYiLCJpYXQiOjE2NzA4MzE5MDB9._MVXniScfQJV_fvxweO2cLoq3nGHHlc9FFc8ZTa-BFo`

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET_KEY,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })

    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}

export const uploadFileToIPFS = async (file /* nft_name, description */) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

  console.log(file)
  let data = new FormData()
  // convert blob to file
  /* const fileUpload =  */ new File([file], {
    type: "image/png",
    lastModified: Date.now(),
  })
  data.append("file", file)

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  })

  data.append("pinataMetadata", metadata)
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  })
  data.append("pinataOptions", pinataOptions)

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "84b2bab1983f865c644e",
        pinata_secret_api_key:
          "3820f7a55bd1818c83a305f72bd6a248f3756aad2e2902b0c13dad3a8cd94c86",
        Authorization: JWT,
      },
    })
    .then(function (response) {
      console.log(
        "image uploaded",
        "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      )
      console.log("image uploaded", "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash);
      
      console.log("Response after upload", response)
      
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}

export const uploadFromBuffer = async (buffer) => {
  try {
    //
    const stream = Readable.from(buffer)
    const data = new FormData()
    data.append("file", stream, {
      filepath: "FILENAME.png",
    })

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            Authorization: JWT,
            
        }
      });
  
   
       console.log("this was the response " ,res.data);
      return res.data
    } catch (error) {
      console.log(error);
    }
  return null
  } 

  export const getNFTMetadata = async (uri) => {
    try {
    // 
    
      const res = await axios.get(uri, {
       
        headers: {
            Authorization: JWT,
            pinata_api_key: "98b227205a75e86ced70",
            pinata_secret_api_key:"4dbbf292047abcb8584c913873d8fbabed457b5d5d753144541f2b0c71687fae",
        }
      });
  
      console.log("response from IPFS" +  res);
      return res
    } catch (error) {
      console.log(error);
    }
  } 
