import { useState } from "react"
import { Input, Button } from "antd"
import styles from "components/GenerateNFT/GenerateNFT.module.scss"
import { uploadFileToIPFS } from "pinata"
import http from 'http';
const { TextArea } = Input

const appendIllustrationTypes = [
  {
    btn: "The Simpsons",
    append: ", in the style of The Simpsons",
  },
  {
    btn: "The Flintstones",
    append: ", in the syle of 1960s Flinstones",
  },

  {
    btn: "Disney",
    append: ", in the style of 1990s Disney cel shading",
  },

  {
    btn: "Minecraft",
    append: ", isometric 3D",
  },
  {
    btn: "Dr. Seuss",
    append: ", in the style of Dr. Seuss",
  },
  {
    btn: "DALL-E",
    append: ", digital art",
  },
  {
    btn: "Impressionist",
    append: ", in the style of Monet",
  },
  {
    btn: "Film Poster",
    append: ", screen printing",
  },
  {
    btn: "Pencil",
    append: ", pencil drawing",
  },
  {
    btn: "Medieval",
    append: ", etching drawing",
  },
]

const appendPhotographicTypes = [
  {
    btn: "Medium-shot",
    append: ", medium-shot, mid-shot",
  },
  {
    btn: "Overhead",
    append: ", overhead view, establishing shot, high angle",
  },
  {
    btn: "Cool",
    append: ", sigma 500mm f/5 shot",
  },
  {
    btn: "Warm Light",
    append: ", warm lighting, 2700k",
  },
  {
    btn: "Ambient Light",
    append: ", high-key lighting, ambient",
  },
]

const appendMovieTypes = [
  {
    btn: "Return of the Jedi",
    append: ", from Episode VI - Return of the Jedi (1983)",
  },
  {
    btn: "The Phantom Menace",
    append: ", from Star Wars Episode I - The Phantom Menace (1999)",
  },
  {
    btn: "Blade Runner",
    append: ", from Blade Runner 2049 (2017)",
  },
  {
    btn: "Breaking Bad",
    append: ", from Breaking Bad, Season 4 (2011)",
  },
]

type GenerateNFTType = {
  // eslint-disable-next-line no-unused-vars
  mintNft: (imageUrl: string, name: string, description: string) => void
  walletAddress?: string
}

const GenerateNFT: React.FC<GenerateNFTType> = ({ mintNft, walletAddress }) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageInput, setImageInput] = useState<string | undefined>("")
  const [isGenerateLoading, setIsGenerateLoading] = useState<boolean>()
  const [nameInput, setNameInput] = useState<string>()
  const [descriptionInput, setDescriptionInput] = useState<string>()

  const [appendIllustrationText, setAppendIllustrationText] = useState("")
  const [appendPhotographicText, setAppendPhotographicText] = useState("")
  const [appendMovieText, setAppendMovieText] = useState("")
  const [isUploading, setIsUploading] = useState<boolean>()
  /* const [isMintLoading, setIsMintLoading] = useState<boolean>(); */

  const handleGenerate = async (promptText?: string) => {
    // Stop the form from submitting and refreshing the page.

    // Get data from the form.

    setImageInput(promptText)

    const toBeGenerated =
      imageInput +
      appendIllustrationText +
      appendPhotographicText +
      appendMovieText

    console.log(toBeGenerated)

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(toBeGenerated)

    // API endpoint where we send form data.
    const endpoint = "/api/generate_art"

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    setImageUrl(result.imageURL)
    console.log("Image has been loaded ...waiting for one more step")
    console.log(`Generative Art prompt text: ${result.imageURL}`)
    setIsGenerateLoading(false)
  }

  const generateImage = async () => {
    if (imageInput?.trim() !== "" && imageInput) {
      setIsGenerateLoading(true)
      setImageUrl("")
      await handleGenerate(imageInput)
      setImageInput("")
    }
  }

  const mintGeneratedImage = async  (generatedImageURL: string) => {
    // const responseBlob = await fetch(imageUrl)
     // use fetch to avoid CORS issues with IPFS images 
     // no-cors-fetch is not working
     const responseBlob = await fetch(generatedImageURL)
     //const responseBlob = await fetch(imageUrl)
 
     //const blob = await responseBlob
     console.log(await responseBlob.json())
     //setImageBlob(blob)
 
     // await handleUpload(imageBlob);
     // console.log("cid", cid);
     // console.log("MINTING THIS NFT" + generatedImageURL, nameInput, descriptionInput)
   }
  const handleGetGeneratedImage = async (url: string) => { 
    console.log("Image has been loaded ...")
      const response = await http.get(url)
      // get object url from blob
      let data
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        data = +chunk
      });
      
      response.on( 'end', async (data) => { 
        console.log("end of the stream")
        console.log(data)
        const file = new File([data], "generated.png", { type: "image/png" })
        console.log(file)
        await uploadFileToIPFS(file, "generated.png", "this a cool description")
        setIsGenerateLoading(false)
      })

      //create a file from blob
    // const file = new File([objectUrl], "generated.png", { type: "image/png" })
      // convert chunk to File
 

  }
  return (
    <>
      <div className={styles.generateCard}>
        <TextArea
          rows={4}
          placeholder="Type something for the text-to-image AI"
          className={styles.generateTextArea}
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          className={styles.generateButton}
          onClick={generateImage}
          loading={isGenerateLoading}
        >
          Generate
        </Button>

        <div className={styles.generateDisplayImage}>
          {imageUrl && <img src={imageUrl} alt="generated nft image" />}
        </div>

        {imageUrl && (
          <>
            <div className={styles.generateInputContainer}>
              <Input
                placeholder="NFT Name"
                defaultValue={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <Input
                placeholder="NFT Description"
                defaultValue={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              size="large"
              className={`${styles.generateMintNftButton} ${
                !walletAddress && styles.generateMintNftButtonDisabled
              }`}
              onClick={ () => mintGeneratedImage(imageUrl)}
              disabled={!walletAddress}
              loading={isUploading}
            >
              Mint NFT
            </Button>
          </>
        )}
      </div>
      {!imageUrl && (
        <>
          <div className={styles.appendContainer}>
            <h3>Illustration Styles</h3>
            <div className={styles.appendButtonContainer}>
              {appendIllustrationTypes.map((type) => (
                <button
                  onClick={() => {
                    if (appendIllustrationText === type.append) {
                      setAppendIllustrationText("")
                    } else {
                      setAppendIllustrationText(type.append)
                    }
                  }}
                  key={type.append}
                  className={`${styles.appendButton} ${
                    appendIllustrationText === type.append &&
                    styles.appendButtonSelected
                  }`}
                >
                  {type.btn}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.appendContainer}>
            <h3>Photographic Styles</h3>
            <div className={styles.appendButtonContainer}>
              {appendPhotographicTypes.map((type) => (
                <button
                  onClick={() => {
                    if (appendPhotographicText === type.append) {
                      setAppendPhotographicText("")
                    } else {
                      setAppendPhotographicText(type.append)
                    }
                  }}
                  key={type.append}
                  className={`${styles.appendButton} ${
                    appendPhotographicText === type.append &&
                    styles.appendButtonSelected
                  }`}
                >
                  {type.btn}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.appendContainer}>
            <h3>Movie Styles</h3>
            <div className={styles.appendButtonContainer}>
              {appendMovieTypes.map((type) => (
                <button
                  onClick={() => {
                    if (appendMovieText === type.append) {
                      setAppendMovieText("")
                    } else {
                      setAppendMovieText(type.append)
                    }
                  }}
                  key={type.append}
                  className={`${styles.appendButton} ${
                    appendMovieText === type.append &&
                    styles.appendButtonSelected
                  }`}
                >
                  {type.btn}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default GenerateNFT
