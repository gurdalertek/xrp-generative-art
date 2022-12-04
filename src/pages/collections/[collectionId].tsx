import { useRouter } from "next/router"
import { Row, Col } from "antd"
import Link from "next/link"

import CollectionCard from "components/CollectionCard"

import styles from "../../styles/path-styles/Collections.module.scss"

const nftInfos = [
  {
    name: "Random nft",
    description: " Lorem ipsum dolor sit",
    price: 5,
    id: 23561,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },

  {
    name: "Another random nft",
    description: " Lorem ipsum dolor sit",
    price: 3,
    id: 53251,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },

  {
    name: "Another random nft",
    description: " Lorem ipsum dolor sit",
    price: 10,
    id: 64312,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },

  {
    name: "Random nft",
    description: " Lorem ipsum dolor sit",
    price: 150,
    id: 64314,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },

  {
    name: "Random nft",
    description: " Lorem ipsum dolor sit",
    price: 67,
    id: 35643,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },

  {
    name: "Random nft",
    description: " Lorem ipsum dolor sit",
    price: 1,
    id: 75424,
    imageUrl:
      "https://images.wallpaperscraft.com/image/single/air_balloon_aerostat_art_128614_1920x1080.jpg",
  },
]

const Collection = () => {
  const router = useRouter()
  return (
    <div>
      <h2 className={styles.collectionTitle}>
        Collection: {router.query.collectionId}
      </h2>
      <section className={styles.collectionGrid}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {nftInfos.map((nft) => (
            <Col span={6} key={nft.id}>
              <Link href={`/nft/${nft.id}`} className={styles.collectionLink}>
                <CollectionCard nft={nft} />
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}

export default Collection